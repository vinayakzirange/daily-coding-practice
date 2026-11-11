-- Problem: The Most Frequently Ordered Products for Each Customer (LeetCode 1596)
-- Difficulty: Medium
-- Language: SQL (MySQL)

/*
Table: Customers
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| name          | varchar |
+---------------+---------+

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| order_date    | date    |
| customer_id   | int     |
| product_id    | int     |
+---------------+---------+

Table: Products
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| product_name  | varchar |
| price         | int     |
+---------------+---------+

Write a solution to find the most frequently ordered product(s) for each customer.
The result table should have the product_id and product_name for each customer_id who ordered at least one order.
Return the result table in any order.
*/

WITH ProductCounts AS (
    SELECT 
        customer_id,
        product_id,
        COUNT(order_id) AS order_count,
        RANK() OVER (
            PARTITION BY customer_id 
            ORDER BY COUNT(order_id) DESC
        ) AS rnk
    FROM Orders
    GROUP BY 
        customer_id, 
        product_id
)
SELECT 
    pc.customer_id,
    pc.product_id,
    p.product_name
FROM ProductCounts pc
INNER JOIN Products p 
    ON pc.product_id = p.product_id
WHERE pc.rnk = 1;
