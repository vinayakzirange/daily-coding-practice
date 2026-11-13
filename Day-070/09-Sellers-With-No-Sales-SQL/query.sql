-- Problem: Sellers With No Sales (LeetCode 1607)
-- Difficulty: Medium
-- Language: SQL (MySQL)

/*
Table: Customer
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| customer_name | varchar |
+---------------+---------+

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| order_id      | int     |
| sale_date     | date    |
| order_cost    | int     |
| customer_id   | int     |
| seller_id     | int     |
+---------------+---------+

Table: Seller
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| seller_id     | int     |
| seller_name   | varchar |
+---------------+---------+

Write a solution to report the names of all sellers who did not make any sales in the year 2020.
Return the result table ordered by seller_name ASC.
*/

SELECT 
    s.seller_name
FROM Seller s
WHERE s.seller_id NOT IN (
    SELECT DISTINCT seller_id
    FROM Orders
    WHERE sale_date BETWEEN '2020-01-01' AND '2020-12-31'
)
ORDER BY 
    s.seller_name ASC;
