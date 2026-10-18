-- ====================================================================
-- Problem: Number of Unique Subjects Taught by Each Teacher (LeetCode 2356)
-- Difficulty: Easy / Medium Practice
-- Topic: SQL / Aggregation / COUNT DISTINCT / GROUP BY
-- ====================================================================

/*
Table: Teacher
+-------------+------+
| Column Name | Type |
+-------------+------+
| teacher_id  | int  |
| subject_id  | int  |
| dept_id     | int  |
+-------------+------+
(subject_id, dept_id) is the primary key (combinations of columns with unique values)
of this table.
Each row in this table contains information about the teacher and the subject they teach
at a department.

Question:
Write a solution to calculate the number of unique subjects each teacher teaches
in the university.

Return the result table in any order.

Example 1:
Input: 
Teacher table:
+------------+------------+---------+
| teacher_id | subject_id | dept_id |
+------------+------------+---------+
| 1          | 2          | 3       |
| 1          | 2          | 4       |
| 1          | 3          | 3       |
| 2          | 1          | 1       |
| 2          | 2          | 1       |
| 2          | 3          | 1       |
| 2          | 4          | 1       |
+------------+------------+---------+
Output:  
+------------+-----+
| teacher_id | cnt |
+------------+-----+
| 1          | 2   |
| 2          | 4   |
+------------+-----+
Explanation: 
Teacher 1:
  - They teach subject 2 in departments 3 and 4 (counted once).
  - They teach subject 3 in department 3.
  Total unique subjects = 2.
Teacher 2:
  - They teach subject 1 in department 1.
  - They teach subject 2 in department 1.
  - They teach subject 3 in department 1.
  - They teach subject 4 in department 1.
  Total unique subjects = 4.
*/

-- ====================================================================
-- Solution: GROUP BY teacher_id with COUNT(DISTINCT subject_id)
-- Time Complexity: O(N) where N is number of rows in Teacher table
-- Space Complexity: O(U) where U is number of unique teachers
-- ====================================================================

SELECT 
    teacher_id,
    COUNT(DISTINCT subject_id) AS cnt
FROM 
    Teacher
GROUP BY 
    teacher_id;
