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

const insertRecipeCookingSteps = `INSERT INTO recipe_cooking_steps (recipe_id, cooking_steps_id, step_order) VALUES
    (1, 1, 1),
    (1, 3, 2),
    (2, 1, 1),
    (2, 2, 2)`;



const insertRecipeCheesecake = `INSERT INTO recipe (NameRecipe, CookingTime_min) VALUES
    ('No-Bake Cheesecake', 60)
    ON DUPLICATE KEY UPDATE NameRecipe=NameRecipe`;

const insertCategoryCheesecake = `INSERT INTO category (Category) VALUES
    ('Cake'),
    ('No-Bake'),
    ('Vegetarian')
    ON DUPLICATE KEY UPDATE Category=Category`;  

const insertIngredientsCheesecake = `INSERT INTO ingredients (Ingredient) VALUES
    ('Condensed milk'), 
    ('Cream Cheese'),
    ('Lemon Juice'),
    ('Pie Crust'),
    ('Cherry Jam')
    ON DUPLICATE KEY UPDATE Ingredient=Ingredient`;  

const insertCookingStepsCheesecake = `INSERT INTO cooking_steps (NameStep) VALUES
    ('Beat Cream Cheese'),
    ('Add Condensed Milk and blend'),
    ('Add Lemon Juice and blend'),
    ('Add the mix to the pie crust'),
    ('Spread the Cherry Jam'),
    ('Place in refrigerator for 3h')
    ON DUPLICATE KEY UPDATE NameStep=NameStep`;

const insertRecipeIngredientsCheesecake = `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, NeededAmount) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM ingredients WHERE Ingredient = 'Condensed milk'), '200 ml'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM ingredients WHERE Ingredient = 'Cream Cheese'), '200 g'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM ingredients WHERE Ingredient = 'Lemon Juice'), '1 tbsp'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM ingredients WHERE Ingredient = 'Pie Crust'), '1'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM ingredients WHERE Ingredient = 'Cherry Jam'), '100 g')`;

const insertRecipeCategoryCheesecake = `INSERT INTO recipe_category (recipe_id, category_id) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM category WHERE Category = 'Cake')),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM category WHERE Category = 'No-Bake')),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM category WHERE Category = 'Vegetarian'))`;

const insertRecipeCookingStepsCheesecake = `SET @step_order := 0;
    INSERT INTO recipe_cooking_steps (recipe_id, cooking_steps_id, step_order) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Beat Cream Cheese'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add Condensed Milk and blend'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add Lemon Juice and blend'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add the mix to the pie crust'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Spread the Cherry Jam'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'No-Bake Cheesecake'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Place in refrigerator for 3h'), @step_order := @step_order + 1)`;

const insertRecipeRoastedBrusselsSprouts = `INSERT INTO recipe (NameRecipe, CookingTime_min) VALUES
    ('Roasted Brussels Sprouts', 45)
    ON DUPLICATE KEY UPDATE NameRecipe=NameRecipe`;

const insertCategoryRoastedBrusselsSprouts = `INSERT INTO category (Category) VALUES
    ('Vegan'),
    ('Gluten-Free')
    ON DUPLICATE KEY UPDATE Category=Category`;

const insertIngredientsRoastedBrusselsSprouts = `INSERT INTO ingredients (Ingredient) VALUES
    ('Brussels Sprouts'),
    ('Lemon juice'),
    ('Sesame seeds'),
    ('Pepper'),
    ('Salt'),
    ('Olive oil')
    ON DUPLICATE KEY UPDATE Ingredient=Ingredient`;

const insertCookingStepsRoastedBrusselsSprouts = `INSERT INTO cooking_steps (NameStep) VALUES
    ('Preheat the oven'),
    ('Mix the ingredients in a bowl'),
    ('Spread the mix on baking sheet'),
    ('Bake for 30 minutes')
    ON DUPLICATE KEY UPDATE NameStep=NameStep`;

const insertRecipeIngredientsRoastedBrusselsSprouts = `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, NeededAmount) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM ingredients WHERE Ingredient = 'Brussels Sprouts'), '500 g'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM ingredients WHERE Ingredient = 'Lemon juice'), '100 ml'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM ingredients WHERE Ingredient = 'Sesame seeds'), '1 tbsp'),   
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM ingredients WHERE Ingredient = 'Pepper'), '1 tsp'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM ingredients WHERE Ingredient = 'Salt'), '1 tsp'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM ingredients WHERE Ingredient = 'Olive oil'), '2 tbsp')`;

const insertRecipeCategoryRoastedBrusselsSprouts = `INSERT INTO recipe_category (recipe_id, category_id) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM category WHERE Category = 'Vegan')),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM category WHERE Category = 'Gluten-Free'))`;

const insertRecipeCookingStepsRoastedBrusselsSprouts = `SET @step_order := 0;
    INSERT INTO recipe_cooking_steps (recipe_id, cooking_steps_id, step_order) VALUES   
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Preheat the oven'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Mix the ingredients in a bowl'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Spread the mix on baking sheet'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Roasted Brussels Sprouts'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Bake for 30 minutes'), @step_order := @step_order + 1)`;

const insertRecipeMacCheese = `INSERT INTO recipe (NameRecipe, CookingTime_min) VALUES
    ('Mac and Cheese', 30)
    ON DUPLICATE KEY UPDATE NameRecipe=NameRecipe`;

const insertCategoryMacCheese = `INSERT INTO category (Category) VALUES
    ('Vegetarian')
    ON DUPLICATE KEY UPDATE Category=Category`;

const insertIngredientsMacCheese = `INSERT INTO ingredients (Ingredient) VALUES
    ('Macaroni'),
    ('Butter'),
    ('Flour'),
    ('Salt'),
    ('Pepper'),
    ('Milk'),
    ('Shredded Cheddar cheese')
    ON DUPLICATE KEY UPDATE Ingredient=Ingredient`;

const insertCookingStepsMacCheese = `INSERT INTO cooking_steps (NameStep) VALUES
    ('Cook Macaroni for 8 minutes'),
    ('Melt butter in a saucepan'),
    ('Add flour, salt, pepper and mix'), 
    ('Add Milk and mix'),
    ('Cook until mix is smooth'),
    ('Add cheddar cheese'),
    ('Add the macaroni')
    ON DUPLICATE KEY UPDATE NameStep=NameStep`;

const insertRecipeIngredientsMacCheese = `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, NeededAmount) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM ingredients WHERE Ingredient = 'Macaroni'), '200 g'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM ingredients WHERE Ingredient = 'Butter'), '50 g'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM ingredients WHERE Ingredient = 'Flour'), '50 g'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM ingredients WHERE Ingredient = 'Salt'), '1 tsp'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM ingredients WHERE Ingredient = 'Pepper'), '1 tsp'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM ingredients WHERE Ingredient = 'Milk'), '500 ml'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM ingredients WHERE Ingredient = 'Shredded Cheddar cheese'), '200 g')`;

const insertRecipeCategoryMacCheese = `INSERT INTO recipe_category (recipe_id, category_id) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM category WHERE Category = 'Vegetarian'))`;

const insertRecipeCookingStepsMacCheese = `SET @step_order := 0;
    INSERT INTO recipe_cooking_steps (recipe_id, cooking_steps_id, step_order) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Cook Macaroni for 8 minutes'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Melt butter in a saucepan'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add flour, salt, pepper and mix'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add Milk and mix'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Cook until mix is smooth'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add cheddar cheese'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Mac and Cheese'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add the macaroni'), @step_order := @step_order + 1)`;
    
const insertRecipeTamagoyakiJapaneseOmelette = `INSERT INTO recipe (NameRecipe, CookingTime_min) VALUES
    ('Tamagoyaki Japanese Omelette', 20)
    ON DUPLICATE KEY UPDATE NameRecipe=NameRecipe`;

const insertCategoryTamagoyakiJapaneseOmelette = `INSERT INTO category (Category) VALUES
    ('Vegetarian'),
    ('Japanese')
    ON DUPLICATE KEY UPDATE Category=Category`;

const insertIngredientsTamagoyakiJapaneseOmelette = `INSERT INTO ingredients (Ingredient) VALUES
    ('Eggs'),
    ('Soy sauce'),
    ('Sugar'),
    ('Salt'),
    ('Olive Oil')
    ON DUPLICATE KEY UPDATE Ingredient=Ingredient`;

const insertCookingStepsTamagoyakiJapaneseOmelette = `INSERT INTO cooking_steps (NameStep) VALUES  
    ('Beat the eggs'),
    ('Add soya sauce, sugar and salt'),
    ('Add oil to a sauce pan'), 
    ('Bring to medium heat'),
    ('Add some mix to the sauce pan'),
    ('Let is cook for 1'),
    ('Add oil to a sauce pan'),
    ('Add some mix to the sauce pan'),
    ('Let is cook for 1'),
    ('Remove pan from fire')
    ON DUPLICATE KEY UPDATE NameStep=NameStep`;

const insertRecipeIngredientsTamagoyakiJapaneseOmelette = `INSERT INTO recipe_ingredient (recipe_id, ingredient_id, NeededAmount) VALUES    
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM ingredients WHERE Ingredient = 'Eggs'), '4'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM ingredients WHERE Ingredient = 'Soy sauce'), '1 tbsp'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM ingredients WHERE Ingredient = 'Sugar'), '1 tsp'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM ingredients WHERE Ingredient = 'Salt'), '1 tsp'),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM ingredients WHERE Ingredient = 'Olive Oil'), '1 tbsp')`;

const insertRecipeCategoryTamagoyakiJapaneseOmelette = `INSERT INTO recipe_category (recipe_id, category_id) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM category WHERE Category = 'Vegetarian')),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM category WHERE Category = 'Japanese'))`;
    
const insertRecipeCookingStepsTamagoyakiJapaneseOmelette = `SET @step_order := 0;
    INSERT INTO recipe_cooking_steps (recipe_id, cooking_steps_id, step_order) VALUES
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Beat the eggs'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add soya sauce, sugar and salt'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add oil to a sauce pan'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Bring to medium heat'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add some mix to the sauce pan'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Let is cook for 1'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add oil to a sauce pan'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Add some mix to the sauce pan'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Let is cook for 1'), @step_order := @step_order + 1),
    ((SELECT ID FROM recipe WHERE NameRecipe = 'Tamagoyaki Japanese Omelette'), (SELECT ID FROM cooking_steps WHERE NameStep = 'Remove pan from fire'), @step_order := @step_order + 1)`;



    const findRecipeVegetarianWithMacaroni = `SELECT recipe.NameRecipe FROM recipe
JOIN recipe_category ON recipe.ID = recipe_category.recipe_id
JOIN category ON recipe_category.category_id = category.ID
WHERE category.Category = 'Vegetarian'
  AND recipe.ID IN (
      SELECT recipe.ID FROM recipe
      JOIN recipe_ingredient ON recipe.ID = recipe_ingredient.recipe_id
      JOIN ingredients ON recipe_ingredient.ingredient_id = ingredients.ID
      WHERE ingredients.Ingredient = 'Macaroni'
  )`;

const findRecipeCakeNoBake = `SELECT recipe.NameRecipe FROM recipe
JOIN recipe_category ON recipe.ID = recipe_category.recipe_id
JOIN category ON recipe_category.category_id = category.ID
WHERE category.Category = 'Cake'
  AND recipe.ID IN (      
    SELECT recipe.ID FROM recipe
    JOIN recipe_category ON recipe.ID = recipe_category.recipe_id
    JOIN category ON recipe_category.category_id = category.ID
    WHERE category.Category = 'No-Bake')`;

const findRecipeJapaneseAndVegetarian = `SELECT recipe.NameRecipe FROM recipe
JOIN recipe_category ON recipe.ID = recipe_category.recipe_id
JOIN category ON recipe_category.category_id = category.ID
WHERE category.Category IN ('Japanese', 'Vegetarian')
    GROUP BY recipe.NameRecipe
    HAVING COUNT(DISTINCT category.Category) = 2`;


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
    console.error('Connection error main recipes', err)
} 

try {
  await connection.query(insertRecipeCheesecake);
  await connection.query(insertCategoryCheesecake);
  await connection.query(insertIngredientsCheesecake);
  await connection.query(insertCookingStepsCheesecake);
  await connection.query(insertRecipeIngredientsCheesecake);
  await connection.query(insertRecipeCategoryCheesecake);
  await connection.query(insertRecipeCookingStepsCheesecake);
} catch (err) {
    console.error('Connection error Cheesecake', err)
}

try {
    await connection.query(insertRecipeRoastedBrusselsSprouts);
    await connection.query(insertCategoryRoastedBrusselsSprouts);
    await connection.query(insertIngredientsRoastedBrusselsSprouts);
    await connection.query(insertCookingStepsRoastedBrusselsSprouts);
    await connection.query(insertRecipeIngredientsRoastedBrusselsSprouts);
    await connection.query(insertRecipeCategoryRoastedBrusselsSprouts);
    await connection.query(insertRecipeCookingStepsRoastedBrusselsSprouts);
} catch (err) {
    console.error('Connection error Roasted Brussels Sprouts', err)
}

try {
    await connection.query(insertRecipeMacCheese);
    await connection.query(insertCategoryMacCheese);
    await connection.query(insertIngredientsMacCheese);
    await connection.query(insertCookingStepsMacCheese);
    await connection.query(insertRecipeIngredientsMacCheese);
    await connection.query(insertRecipeCategoryMacCheese);
    await connection.query(insertRecipeCookingStepsMacCheese);
}
catch (err) {
    console.error('Connection error Mac and Cheese', err)
}

try {
    await connection.query(insertRecipeTamagoyakiJapaneseOmelette);
    await connection.query(insertCategoryTamagoyakiJapaneseOmelette);
    await connection.query(insertIngredientsTamagoyakiJapaneseOmelette);
    await connection.query(insertCookingStepsTamagoyakiJapaneseOmelette);
    await connection.query(insertRecipeIngredientsTamagoyakiJapaneseOmelette);
    await connection.query(insertRecipeCategoryTamagoyakiJapaneseOmelette);
    await connection.query(insertRecipeCookingStepsTamagoyakiJapaneseOmelette);
}
catch (err) {
    console.error('Connection error Tamagoyaki Japanese Omelette', err)
}

try {
const [resultFindRecipeVegetarianWithMacaroni] = 
    await connection.query(findRecipeVegetarianWithMacaroni);
console.log('findRecipeVegetarianWithMacaroni', resultFindRecipeVegetarianWithMacaroni);
const [resultFindRecipeCakeNoBake] = 
    await connection.query(findRecipeCakeNoBake);
console.log('resultFindRecipeCakeNoBake', resultFindRecipeCakeNoBake);
const [resultFindRecipeJapaneseAndVegetarian] = 
    await connection.query(findRecipeJapaneseAndVegetarian);
console.log('resultFindRecipeJapaneseAndVegetarian', resultFindRecipeJapaneseAndVegetarian);
} catch (err) {
    console.error('Connection error Find Query', err)
}

finally {
    connection.end();
};

