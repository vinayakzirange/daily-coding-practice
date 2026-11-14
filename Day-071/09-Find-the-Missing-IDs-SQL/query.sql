-- Problem: Find the Missing IDs (LeetCode 1613)
-- Difficulty: Medium
-- Language: SQL (MySQL)

/*
Table: Customers
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| customer_name | varchar |
+---------------+---------+
customer_id is the column with unique values for this table.

Write a solution to find the missing customer IDs.
The missing IDs are ones that are not in the Customers table but are in the range
between 1 and the maximum customer_id present in the table.
Notice that the maximum customer_id will not exceed 100.

Return the result table ordered by ids in ascending order.
*/

WITH RECURSIVE NumberSeq AS (
    SELECT 1 AS ids
    UNION ALL
    SELECT ids + 1
    FROM NumberSeq
    WHERE ids < (SELECT MAX(customer_id) FROM Customers)
)
SELECT 
    ids
FROM NumberSeq
WHERE ids NOT IN (
    SELECT customer_id FROM Customers
)
ORDER BY 
    ids ASC;
