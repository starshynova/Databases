CREATE DATABASE IF NOT EXISTS lidiia_recipes;
USE lidiia_recipes;

DROP TABLE IF EXISTS cooking_steps;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe (
    ID INT(3) NOT NULL AUTO_INCREMENT,
    NameRecipe VARCHAR(255) NOT NULL,
    Country VARCHAR(100),
    CookingTime_min INT(4),
    PRIMARY KEY (ID),
    UNIQUE KEY (NameRecipe)
);


CREATE TABLE ingredients (
    ID INT(6) NOT NULL AUTO_INCREMENT,
    NameRecipe VARCHAR(255) NOT NULL,
    Ingredient VARCHAR(255) NOT NULL,
    NeededAmount VARCHAR(100),
    PRIMARY KEY (ID),
    FOREIGN KEY (NameRecipe) REFERENCES recipe(NameRecipe) ON DELETE CASCADE
);


CREATE TABLE cooking_steps (
    ID INT(6) NOT NULL AUTO_INCREMENT,
    NameRecipe VARCHAR(255) NOT NULL,
    NameStep VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (NameRecipe) REFERENCES recipe(NameRecipe) ON DELETE CASCADE
);



INSERT INTO recipe (NameRecipe, Country, CookingTime_min) VALUES ('Lemon tart', 'Italia', 40);
INSERT INTO recipe (NameRecipe, Country, CookingTime_min) VALUES ('Cowboy pie', 'USA', 90);


INSERT INTO ingredients (NameRecipe, Ingredient, NeededAmount) VALUES ('Lemon tart', 'eggs', '4');
INSERT INTO ingredients (NameRecipe, Ingredient, NeededAmount) VALUES ('Lemon tart', 'plain flour', '100 g');
INSERT INTO ingredients (NameRecipe, Ingredient, NeededAmount) VALUES ('Lemon tart', 'sugar', '75 g');

INSERT INTO ingredients (NameRecipe, Ingredient, NeededAmount) VALUES ('Cowboy pie', 'potato', '900 g');
INSERT INTO ingredients (NameRecipe, Ingredient, NeededAmount) VALUES ('Cowboy pie', 'plain flour', '150 g');
INSERT INTO ingredients (NameRecipe, Ingredient, NeededAmount) VALUES ('Cowboy pie', 'onion', '2');


INSERT INTO cooking_steps (NameRecipe, NameStep) VALUES ('Lemon tart', 'Prepare all the necessary groceries');
INSERT INTO cooking_steps (NameRecipe, NameStep) VALUES ('Lemon tart', 'Bake for 40 minutes');

INSERT INTO cooking_steps (NameRecipe, NameStep) VALUES ('Cowboy pie', 'Prepare all the necessary groceries');
INSERT INTO cooking_steps (NameRecipe, NameStep) VALUES ('Cowboy pie', 'Bake for 90 minutes');
