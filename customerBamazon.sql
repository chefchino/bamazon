DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    in_stock INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product, department, price, in_stock)
VALUES ("dinosaur puzzle", "GAMES", 36.00, 62), ("teddy that hugs you back", "DOLLS", 24.95, 87),
       ("scuba steve", "TOYS", 12.99, 102), ("lamp", "HOUSEWARE", 16.00, 56),
       ("bubble bobble", "GAMES", 45.00, 67), ("freshy soap", "HOUSEWARE", 9.99, 206),
       ("toobrush", "HOUSEWARE", 2.95, 658), ("rocking chair", "FURNITURE", 109.99, 45),
       ("budha", "LAWN AND GARDEN", 49.95, 23), ("blueberry plant", "LAWN AND GARDEN", 6.99,42);

       SELECT * FROM products;