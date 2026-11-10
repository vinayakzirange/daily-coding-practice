-- Problem: Rectangles Area (LeetCode 1459)
-- Difficulty: Medium
-- Language: SQL (MySQL)

/*
Table: Points
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| x_value       | int     |
| y_value       | int     |
+---------------+---------+
id is the column with unique values for this table.
Each point is situated on a 2D plane (x_value, y_value).

Write a solution to report all possible rectangles that can be formed by any two points
such that the sides are parallel to the x and y axes, and the area is strictly greater than 0.

Return the result table ordered by:
  1. area DESC
  2. p1 ASC
  3. p2 ASC
where p1 < p2.
*/

SELECT 
    p1.id AS p1,
    p2.id AS p2,
    ABS(p1.x_value - p2.x_value) * ABS(p1.y_value - p2.y_value) AS area
FROM Points p1
INNER JOIN Points p2 
    ON p1.id < p2.id
   AND p1.x_value != p2.x_value
   AND p1.y_value != p2.y_value
ORDER BY 
    area DESC,
    p1 ASC,
    p2 ASC;

