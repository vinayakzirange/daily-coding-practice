-- ====================================================================
-- Problem: List the Products Ordered in a Period (LeetCode 1327)
-- Difficulty: Easy / Medium Practice
-- Topic: Database, SQL, JOIN, GROUP BY, HAVING, Date Functions
-- ====================================================================

/*
Table: Products
+------------------+---------+
| Column Name      | Type    |
+------------------+---------+
| product_id       | int     |
| product_name     | varchar |
| product_category | varchar |
+------------------+---------+
product_id is the primary key (column with unique values) for this table.
This table contains data about the company's products.

Table: Orders
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| product_id    | int     |
| order_date    | date    |
| unit          | int     |
+---------------+---------+
This table may have duplicate rows.
product_id is a foreign key to the Products table.
unit is the number of products ordered in order_date.

Write a solution to get the names of products that have at least 100 units
ordered in February 2020 and their amount.

Return the result table in any order.

Example 1:
Input: 
Products table:
+------------+-----------------------+------------------+
| product_id | product_name          | product_category |
+------------+-----------------------+------------------+
| 1          | Leetcode Solutions    | Book             |
| 2          | Jewels of Stringology | Book             |
| 3          | HP                    | Laptop           |
| 4          | Lenovo                | Laptop           |
| 5          | Leetcode Kit          | T-shirt          |
+------------+-----------------------+------------------+
Orders table:
+------------+--------------+------+
| product_id | order_date   | unit |
+------------+--------------+------+
| 1          | 2020-02-05   | 60   |
| 1          | 2020-02-10   | 70   |
| 2          | 2020-01-18   | 30   |
| 2          | 2020-02-11   | 80   |
| 3          | 2020-02-17   | 2    |
| 3          | 2020-02-24   | 3    |
| 4          | 2020-03-01   | 20   |
| 4          | 2020-03-04   | 30   |
| 4          | 2020-03-04   | 60   |
| 5          | 2020-02-25   | 50   |
| 5          | 2020-02-27   | 50   |
+------------+--------------+------+
Output: 
+--------------------+---------+
| product_name       | unit    |
+--------------------+---------+
| Leetcode Solutions | 130     |
| Leetcode Kit       | 100     |
+--------------------+---------+
Explanation: 
Products with at least 100 units ordered in February 2020:
- Product 1: 60 + 70 = 130 units.
- Product 2: only 80 units in Feb.
- Product 3: 2 + 3 = 5 units in Feb.
- Product 4: no units in Feb (all in March).
- Product 5: 50 + 50 = 100 units in Feb.
*/

-- ====================================================================
-- Solution: JOIN Products and Orders, filter February 2020, GROUP BY product_name HAVING sum(unit) >= 100
-- Time Complexity: O(P + O)
-- Space Complexity: O(P)
-- ====================================================================

SELECT
    p.product_name,
    SUM(o.unit) AS unit
FROM
    Products p
JOIN
    Orders o ON p.product_id = o.product_id
WHERE
    o.order_date >= '2020-02-01' 
    AND o.order_date <= '2020-02-29'
GROUP BY
    p.product_id,
    p.product_name
HAVING
    SUM(o.unit) >= 100;
