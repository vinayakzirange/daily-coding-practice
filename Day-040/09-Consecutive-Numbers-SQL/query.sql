-- ====================================================================
-- Problem: Consecutive Numbers (LeetCode 180)
-- Difficulty: Medium
-- Topic: SQL / Window Functions / LEAD / Self JOIN / Filtering
-- ====================================================================

/*
Table: Logs
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| num         | varchar |
+-------------+---------+
In SQL, id is the primary key for this table.
id is an autoincrement column starting from 1.

Question:
Find all numbers that appear at least three times consecutively.
Return the result table in any order.

Example 1:
Input: 
Logs table:
+----+-----+
| id | num |
+----+-----+
| 1  | 1   |
| 2  | 1   |
| 3  | 1   |
| 4  | 2   |
| 5  | 1   |
| 6  | 2   |
| 7  | 2   |
+----+-----+
Output: 
+-----------------+
| ConsecutiveNums |
+-----------------+
| 1               |
+-----------------+
Explanation: 1 is the only number that appears consecutively for at least three times.
*/

-- Solution 1: Using Window Functions (LEAD)
SELECT DISTINCT 
    num AS ConsecutiveNums
FROM (
    SELECT 
        num,
        id,
        LEAD(num, 1) OVER (ORDER BY id) AS next_num,
        LEAD(num, 2) OVER (ORDER BY id) AS next_next_num,
        LEAD(id, 1) OVER (ORDER BY id) AS next_id,
        LEAD(id, 2) OVER (ORDER BY id) AS next_next_id
    FROM 
        Logs
) t
WHERE 
    num = next_num 
    AND num = next_next_num
    AND next_id = id + 1
    AND next_next_id = id + 2;

/*
-- Alternative Solution 2: Using Self JOIN
SELECT DISTINCT
    l1.num AS ConsecutiveNums
FROM
    Logs l1
JOIN
    Logs l2 ON l1.id = l2.id - 1
JOIN
    Logs l3 ON l1.id = l3.id - 2
WHERE
    l1.num = l2.num 
    AND l2.num = l3.num;
*/
