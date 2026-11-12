-- Problem: The Most Recent Orders for Each Product (LeetCode 1549)
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

Write a solution to find the most recent order(s) of each product.
If a product has been ordered multiple times on its most recent date, return all of them.

Return the result table ordered by:
  1. product_name ASC
  2. product_id ASC
  3. order_id ASC
*/

WITH RankedOrders AS (
    SELECT 
        p.product_name,
        p.product_id,
        o.order_id,
        o.order_date,
        RANK() OVER (
            PARTITION BY p.product_id 
            ORDER BY o.order_date DESC
        ) AS rnk
    FROM Products p
    INNER JOIN Orders o 
        ON p.product_id = o.product_id
)
SELECT 
    product_name,
    product_id,
    order_id,
    order_date
FROM RankedOrders
WHERE rnk = 1
ORDER BY 
    product_name ASC,
    product_id ASC,
    order_id ASC;
