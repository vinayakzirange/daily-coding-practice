-- Problem: The Most Recent Three Orders (LeetCode 1532)
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
customer_id is the column with unique values for this table.

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| order_date    | date    |
| customer_id   | int     |
| cost          | int     |
+---------------+---------+
order_id is the column with unique values for this table.

Write a solution to find the most recent three orders of each user.
If a user ordered less than three orders, return all of their orders.

Return the result table ordered by:
  1. customer_name ASC
  2. customer_id ASC
  3. order_date DESC
*/

WITH RankedOrders AS (
    SELECT 
        c.name AS customer_name,
        c.customer_id,
        o.order_id,
        o.order_date,
        ROW_NUMBER() OVER (
            PARTITION BY o.customer_id 
            ORDER BY o.order_date DESC
        ) AS rnk
    FROM Customers c
    INNER JOIN Orders o ON c.customer_id = o.customer_id
)
SELECT 
    customer_name,
    customer_id,
    order_id,
    order_date
FROM RankedOrders
WHERE rnk <= 3
ORDER BY 
    customer_name ASC,
    customer_id ASC,
    order_date DESC;
