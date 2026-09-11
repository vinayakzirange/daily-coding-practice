-- Problem Name: Customers Who Never Order
-- Problem Statement: Write an SQL query to report all customers who never order anything.
--
-- Schema:
-- Customers (id INT, name VARCHAR)
-- Orders (id INT, customerId INT)

SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.id IS NULL;

-- Alternative NOT IN approach:
-- SELECT name AS Customers
-- FROM Customers
-- WHERE id NOT IN (SELECT customerId FROM Orders);
