CREATE DATABASE IF NOT EXISTS recipes_week2;
USE recipes_week2;

DROP TABLE IF EXISTS recipe_cooking_steps;
DROP TABLE IF EXISTS recipe_category;
DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS cooking_steps;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe (
    ID INT(6) AUTO_INCREMENT PRIMARY KEY,
    NameRecipe VARCHAR(255) NOT NULL,
    CookingTime_min INT
);

CREATE TABLE ingredients (
    ID INT(6) AUTO_INCREMENT PRIMARY KEY,
    Ingredient VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE category (
    ID INT(6) AUTO_INCREMENT PRIMARY KEY,
    Category VARCHAR(255) NOT NULL
);

CREATE TABLE cooking_steps (
    ID INT(6) AUTO_INCREMENT PRIMARY KEY,
    NameStep VARCHAR(255) NOT NULL
);

CREATE TABLE recipe_ingredient (
    recipe_id INT(6) NOT NULL,
    ingredient_id INT(6) NOT NULL,
    NeededAmount VARCHAR(100),
    FOREIGN KEY (recipe_id) REFERENCES recipe(ID) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ID) ON DELETE CASCADE,
    UNIQUE KEY (recipe_id, ingredient_id)
);

CREATE TABLE recipe_category (
    recipe_id INT(6) NOT NULL,
    category_id INT(6) NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(ID) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(ID) ON DELETE CASCADE,
    UNIQUE KEY (recipe_id, category_id)
);

CREATE TABLE recipe_cooking_steps (
    recipe_id INT(6) NOT NULL,
    cooking_steps_id INT(6) NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(ID) ON DELETE CASCADE,
    FOREIGN KEY (cooking_steps_id) REFERENCES cooking_steps(ID) ON DELETE CASCADE,
    UNIQUE KEY (recipe_id, cooking_steps_id)
);
