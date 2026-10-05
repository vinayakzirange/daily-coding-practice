-- ====================================================================
-- Problem: Product Price at a Given Date (LeetCode 1164)
-- Difficulty: Medium
-- Topic: SQL / Window Functions / Subqueries / LEFT JOIN / COALESCE
-- ====================================================================

/*
Table: Products
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| new_price     | int     |
| change_date   | date    |
+---------------+---------+
(product_id, change_date) is the primary key of this table.
Each row of this table indicates that the price of some product was changed to a new_price on change_date.
Initially, the price of all products is 10.

Question:
Write a solution to find the prices of all products on 2019-08-16.
Assume the price of all products before any change is 10.

Return the result table in any order.

Example:
Input: 
Products table:
+------------+-----------+-------------+
| product_id | new_price | change_date |
+------------+-----------+-------------+
| 1          | 20        | 2019-08-14  |
| 2          | 50        | 2019-08-14  |
| 1          | 30        | 2019-08-15  |
| 1          | 35        | 2019-08-16  |
| 2          | 65        | 2019-08-17  |
| 3          | 20        | 2019-08-18  |
+------------+-----------+-------------+

Output: 
+------------+-------+
| product_id | price |
+------------+-------+
| 2          | 50    |
| 1          | 35    |
| 3          | 10    |
+------------+-------+
Explanation: 
Product 1: changed on 2019-08-14 to 20, 2019-08-15 to 30, and 2019-08-16 to 35. Price on 2019-08-16 is 35.
Product 2: changed on 2019-08-14 to 50, and 2019-08-17 to 65. Price on 2019-08-16 is 50.
Product 3: changed on 2019-08-18 to 20. Before 2019-08-18, the price was 10. Price on 2019-08-16 is 10.
*/

-- Solution:
WITH UniqueProducts AS (
    SELECT DISTINCT product_id 
    FROM Products
),
LatestPriceBeforeTarget AS (
    SELECT 
        product_id,
        new_price AS price,
        ROW_NUMBER() OVER(
            PARTITION BY product_id 
            ORDER BY change_date DESC
        ) AS rn
    FROM 
        Products
    WHERE 
        change_date <= '2019-08-16'
)
SELECT 
    u.product_id,
    COALESCE(l.price, 10) AS price
FROM 
    UniqueProducts u
LEFT JOIN 
    LatestPriceBeforeTarget l 
    ON u.product_id = l.product_id AND l.rn = 1;
