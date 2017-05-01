CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100),
price DECIMAL(10, 2),
stock_quantity INTEGER(11), 
PRIMARY KEY (item_id)
);

SELECT * FROM Bamazon.products;

-- Initial Products
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung 4K Ultra HD Smart LED TV", "Television & Video",1450.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose SoundTrue around-ear headphones", "Headphones",103.86, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple iPhone 6 64GB", "Cell Phones",329.99, 1200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Epiphone ES-339", "Musical Instruments",469.00, 48);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Korg Minilogue 4-Voice Polyphonic Analog Synth", "Musical Instruments",499.99, 234);





