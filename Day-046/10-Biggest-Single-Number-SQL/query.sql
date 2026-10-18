-- ====================================================================
-- Problem: Biggest Single Number (LeetCode 619)
-- Difficulty: Easy / Medium Practice
-- Topic: SQL / Subqueries / Aggregation / GROUP BY / HAVING / MAX
-- ====================================================================

/*
Table: MyNumbers
+-------------+------+
| Column Name | Type |
+-------------+------+
| num         | int  |
+-------------+------+
This table may contain duplicates (In other words, num is not the primary key for this table).
Each row of this table contains an integer.

Question:
A single number is a number that appeared only once in the MyNumbers table.

Find the largest single number. If there is no single number, report null.

Example 1:
Input: 
MyNumbers table:
+-----+
| num |
+-----+
| 8   |
| 8   |
| 3   |
| 3   |
| 1   |
| 4   |
| 5   |
| 6   |
+-----+
Output: 
+-----+
| num |
+-----+
| 6   |
+-----+
Explanation: The single numbers are 1, 4, 5, and 6.
Since 6 is the largest single number, we return it.

Example 2:
Input: 
MyNumbers table:
+-----+
| num |
+-----+
| 8   |
| 8   |
| 7   |
| 7   |
| 3   |
| 3   |
| 3   |
+-----+
Output: 
+------+
| num  |
+------+
| null |
+------+
Explanation: There are no single numbers in the input table, so we return null.
*/

-- ====================================================================
-- Solution:
-- Filter numbers having COUNT(*) = 1 using a subquery, then take MAX(num).
-- Using MAX() on an empty subquery naturally evaluates to NULL.
-- Time Complexity: O(N log N) or O(N) with hash aggregation
-- Space Complexity: O(U) where U is unique numbers in MyNumbers
-- ====================================================================

SELECT 
    MAX(num) AS num
FROM (
    SELECT 
        num
    FROM 
        MyNumbers
    GROUP BY 
        num
    HAVING 
        COUNT(*) = 1
) AS SingleNumbers;
