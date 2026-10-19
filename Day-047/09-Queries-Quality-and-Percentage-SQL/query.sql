-- ====================================================================
-- Problem: Queries Quality and Percentage (LeetCode 1211)
-- Difficulty: Easy / Medium Practice
-- Topic: SQL / Aggregation / ROUND / AVG / CASE WHEN
-- ====================================================================

/*
Table: Queries
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| query_name  | varchar |
| result      | varchar |
| position    | int     |
| rating      | int     |
+-------------+---------+
This table may have duplicate rows.
This table contains information collected from the database about some queries
that users made.
The position column has values from 1 to 500.
The rating column has values from 1 to 5.
Query with rating less than 3 is a poor query.

Question:
We define query quality as:
The average of the ratio between query rating and its position.

We also define poor query percentage as:
The percentage of all queries with rating less than 3.

Write a solution to find each query_name, the quality and poor_query_percentage.
Both quality and poor_query_percentage should be rounded to 2 decimal places.

Return the result table in any order.

Example 1:
Input: 
Queries table:
+------------+-------------------+----------+--------+
| query_name | result            | position | rating |
+------------+-------------------+----------+--------+
| Dog        | Golden Retriever  | 1        | 5      |
| Dog        | German Shepherd   | 2        | 5      |
| Dog        | Mule              | 200      | 1      |
| Cat        | Shirazi           | 5        | 2      |
| Cat        | Siamese           | 3        | 3      |
| Cat        | Sphynx            | 7        | 4      |
+------------+-------------------+----------+--------+
Output: 
+------------+---------+-----------------------+
| query_name | quality | poor_query_percentage |
+------------+---------+-----------------------+
| Dog        | 2.50    | 33.33                 |
| Cat        | 0.66    | 33.33                 |
+------------+---------+-----------------------+
Explanation: 
Dog queries quality is ((5 / 1) + (5 / 2) + (1 / 200)) / 3 = 2.50
Dog queries poor_query_percentage is (1 / 3) * 100 = 33.33

Cat queries quality is ((2 / 5) + (3 / 3) + (4 / 7)) / 3 = 0.66
Cat queries poor_query_percentage is (1 / 3) * 100 = 33.33
*/

-- ====================================================================
-- Solution:
-- Filter out NULL query_names if any, GROUP BY query_name.
-- Compute quality: ROUND(AVG(rating / position), 2)
-- Compute poor_query_percentage: ROUND(AVG(CASE WHEN rating < 3 THEN 1 ELSE 0 END) * 100, 2)
-- Time Complexity: O(N) where N is number of rows in Queries table
-- Space Complexity: O(U) where U is number of unique query_names
-- ====================================================================

SELECT 
    query_name,
    ROUND(AVG(rating * 1.0 / position), 2) AS quality,
    ROUND(AVG(CASE WHEN rating < 3 THEN 1.0 ELSE 0.0 END) * 100, 2) AS poor_query_percentage
FROM 
    Queries
WHERE 
    query_name IS NOT NULL
GROUP BY 
    query_name;
