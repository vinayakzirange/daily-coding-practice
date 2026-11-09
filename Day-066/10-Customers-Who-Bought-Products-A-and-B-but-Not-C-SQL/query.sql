-- Problem: Customers Who Bought Products A and B but Not C (LeetCode 1398)
-- Difficulty: Medium
-- Language: SQL (MySQL)

/*
Table: Customers
+---------------------+---------+
| Column Name         | Type    |
+---------------------+---------+
| customer_id         | int     |
| customer_name       | varchar |
+---------------------+---------+
customer_id is the column of unique values for this table.
customer_name is the name of the customer.

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| customer_id   | int     |
| product_name  | varchar |
+---------------+---------+
order_id is the column of unique values for this table.
customer_id is the id of the customer who bought the product "product_name".

Write a solution to report the customer_id and customer_name of customers who bought products "A", "B" but did not buy the product "C".
Return the result table ordered by customer_id.
*/

SELECT 
    c.customer_id,
    c.customer_name
FROM Customers c
INNER JOIN Orders o ON c.customer_id = o.customer_id
GROUP BY 
    c.customer_id, 
    c.customer_name
HAVING 
    SUM(o.product_name = 'A') > 0
    AND SUM(o.product_name = 'B') > 0
    AND SUM(o.product_name = 'C') = 0
ORDER BY 
    c.customer_id ASC;
