Database Schema

The database consists of five tables: Clients, Users, Orders, Products, and OrderItems. Below are the table definitions and sample data as provided in the DB Fiddle (https://www.db-fiddle.com/f/kbcYPcE8v8xmKyggH1mGg/1).

Table Definitions

Clients

Stores client information.

CREATE TABLE Clients (
  client_id INT PRIMARY KEY,
  client_name VARCHAR(100),
  address VARCHAR(255),
  phone VARCHAR(20)
);

Users

Stores user information, including a reference to a client.

CREATE TABLE Users (
  user_id INT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50),
  registration_date DATE,
  client_id INT,
  FOREIGN KEY (client_id) REFERENCES Clients(client_id)
);

Orders

Stores order details, linking to users and clients.

CREATE TABLE Orders (
  order_id INT PRIMARY KEY,
  user_id INT,
  client_id INT,
  order_date DATE,
  total_amount DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (client_id) REFERENCES Clients(client_id)
);

Products

Stores product information.

CREATE TABLE Products (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(100),
  price DECIMAL(10,2)
);

OrderItems

Stores items in each order, linking to orders and products.

CREATE TABLE OrderItems (
  order_id INT,
  product_id INT,
  quantity INT,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

Sample Data

Clients

INSERT INTO Clients (client_id, client_name, address, phone) VALUES
(1, 'ABC Corp', '123 Main St', '555-1234'),
(2, 'XYZ Inc', '456 Elm St', '555-5678'),
(3, 'ACME LLC', '789 Oak St', '555-9012');

Users

INSERT INTO Users (user_id, username, password, registration_date, client_id) VALUES
(1, 'john_doe', 'pass123', '2020-01-15', 1),
(2, 'jane_smith', 'pass456', '2020-02-20', 2),
(3, 'alice_jones', 'pass789', '2020-03-25', 1),
(4, 'bob_brown', 'pass101', '2020-04-30', 3),
(5, 'charlie_white', 'pass112', '2020-05-10', NULL);

Orders

INSERT INTO Orders (order_id, user_id, client_id, order_date, total_amount) VALUES
(1, 1, 1, '2020-02-01', 1000.00),
(2, 2, 2, '2020-03-05', 1500.00),
(3, 3, 1, '2020-03-20', 2000.00),
(4, 4, 3, '2020-04-15', 2500.00),
(5, 1, 1, '2020-05-01', 3000.00);

Products

INSERT INTO Products (product_id, product_name, price) VALUES
(1, 'Widget', 10.00),
(2, 'Gadget', 20.00),
(3, 'Thingamajig', 30.00);

OrderItems

INSERT INTO OrderItems (order_id, product_id, quantity) VALUES
(1, 1, 50),
(1, 2, 25),
(2, 2, 50),
(3, 1, 100),
(3, 3, 20),
(4, 2, 75),
(5, 3, 100);


Joins:





Users to Orders on user_id: Links users to their orders.



Orders to OrderItems on order_id: Links orders to their items.



OrderItems to Products on product_id: Identifies the "Widget" product (product_id=1).



WHERE Clause:





p.product_name = 'Widget': Filters for the product "Widget".



o.order_date >= '2020-05-01': Filters for orders on or after May 1, 2020.



GROUP BY:





Groups results by username to aggregate quantities per user. Usernames are unique in the sample data.



HAVING Clause:





SUM(oi.quantity) > 50: Filters for users with total Widget quantities exceeding 50.



SELECT Clause:





Returns the username and the sum of Widget quantities, aliased as total_widget_units_ordered.

Expected Output

The query returns no results because no orders for "Widget" (product_id=1) occur on or after May 1, 2020. The only order on or after this date (order_id=5, 2020-05-01) contains "Thingamajig" (product_id=3, quantity=100).