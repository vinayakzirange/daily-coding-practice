-- ====================================================================
-- Problem: Triangle Judgement (LeetCode 610)
-- Difficulty: Easy / Medium Practice
-- Topic: Database, SQL, Conditional Logic, CASE WHEN
-- ====================================================================

/*
Table: Triangle
+-------------+------+
| Column Name | Type |
+-------------+------+
| x           | int  |
| y           | int  |
| z           | int  |
+-------------+------+
(x, y, z) is the primary key column for this table.
Each row of this table contains the lengths of three line segments.

Report for every three line segments whether they can form a triangle.
Three line segments can form a triangle if the sum of any two sides is
strictly greater than the third side:
1. x + y > z
2. x + z > y
3. y + z > x

Return the result table in any order.

Example 1:
Input: 
Triangle table:
+----+----+----+
| x  | y  | z  |
+----+----+----+
| 13 | 15 | 30 |
| 10 | 20 | 15 |
+----+----+----+
Output: 
+----+----+----+----------+
| x  | y  | z  | triangle |
+----+----+----+----------+
| 13 | 15 | 30 | No       |
| 10 | 20 | 15 | Yes      |
+----+----+----+----------+
Explanation: 
13 + 15 = 28 <= 30 -> cannot form a triangle ('No').
10 + 15 = 25 > 20, 10 + 20 = 30 > 15, 15 + 20 = 35 > 10 -> forms a triangle ('Yes').
*/

-- ====================================================================
-- Solution: Evaluate Triangle Inequality using CASE WHEN
-- Time Complexity: O(N) where N is number of rows in Triangle table
-- Space Complexity: O(N) for output stream
-- ====================================================================

SELECT
    x,
    y,
    z,
    CASE
        WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
        ELSE 'No'
    END AS triangle
FROM
    Triangle;
