-- ====================================================================
-- Problem: Classes More Than 5 Students (LeetCode 596)
-- Difficulty: Easy / Medium Practice
-- Topic: SQL / Aggregation / GROUP BY / COUNT / HAVING
-- ====================================================================

/*
Table: Courses
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| student     | varchar |
| class       | varchar |
+-------------+---------+
(student, class) is the primary key (combination of columns with unique values)
for this table.
Each row of this table indicates the name of a student and the class to which
they are enrolled.

Question:
Write a solution to find all the classes that have at least five students.

Return the result table in any order.

Example 1:
Input: 
Courses table:
+---------+----------+
| student | class    |
+---------+----------+
| A       | Math     |
| B       | English  |
| C       | Math     |
| D       | Biology  |
| E       | Math     |
| F       | Computer |
| G       | Math     |
| H       | Math     |
| I       | Math     |
+---------+----------+
Output: 
+---------+
| class   |
+---------+
| Math    |
+---------+
Explanation: 
- Math has 6 students, so we include it.
- English has 1 student, so we do not include it.
- Biology has 1 student, so we do not include it.
- Computer has 1 student, so we do not include it.
*/

-- ====================================================================
-- Solution: GROUP BY class HAVING COUNT(student) >= 5
-- Time Complexity: O(N) where N is number of rows in Courses
-- Space Complexity: O(C) where C is number of classes
-- ====================================================================

SELECT 
    class
FROM 
    Courses
GROUP BY 
    class
HAVING 
    COUNT(student) >= 5;
