import { createConnection } from 'mysql2/promise';
import { readFile } from 'fs/promises';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
});

const sqlDatabase = await readFile('recipes.sql', 'utf-8');

const insertRecipe = `INSERT INTO recipe (NameRecipe, CookingTime_min) VALUES 
    ('Lemon tart', 40),
    ('Cowboy pie', 90)`;

const insertIngredients = `INSERT INTO ingredients (Ingredient) VALUES
    ('eggs'),
    ('plain flour'),
    ('sugar'),
    ('potato'),
    ('onion')`;

const insertCategory = `INSERT INTO category (Category) VALUES
    ('Vegan'),
    ('Meat'),
    ('Dessert')`;

const insertCookingSteps = `INSERT INTO cooking_steps (NameStep) VALUES
    ('Prepare all the necessary groceries'),
    ('Bake for 40 minutes'),
    ('Bake for 90 minutes')`;

const insertRecipeIngredients = `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, NeededAmount) VALUES
    (1, 1, '3'),
    (1, 2, '120 g'),
    (1, 3, '200 g'),
    (2, 1, '4'),
    (2, 4, '4'),
    (2, 5, '1')`;

const insertRecipeCategory = `INSERT INTO recipe_category (recipe_id, category_id) VALUES
    (1, 1),
    (1, 3),
    (2, 2)`;

const insertRecipeCookingSteps = `INSERT INTO recipe_cooking_steps (recipe_id, cooking_steps_id) VALUES
    (1, 1),
    (1, 3),
    (2, 1),
    (2, 2)`;

try {
  await connection.query(sqlDatabase);
  await connection.query(insertRecipe);
  await connection.query(insertIngredients);
  await connection.query(insertCategory);
  await connection.query(insertCookingSteps);
  await connection.query(insertRecipeIngredients);
  await connection.query(insertRecipeCategory);
  await connection.query(insertRecipeCookingSteps);
} catch (err) {
    console.error('Connection error', err)
} finally {
    connection.end();
};

