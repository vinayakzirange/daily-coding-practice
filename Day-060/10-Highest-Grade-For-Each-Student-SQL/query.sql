-- LeetCode 1112: Highest Grade For Each Student (Medium)
-- https://leetcode.com/problems/highest-grade-for-each-student/
--
-- Table: Enrollments
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | student_id    | int     |
-- | course_id     | int     |
-- | grade         | int     |
-- +---------------+---------+
-- (student_id, course_id) is the primary key of this table.
-- grade is never NULL.
--
-- Write a solution to find the highest grade with its corresponding course
-- for each student. In case of a tie, you should find the course with the
-- smallest course_id.
-- Return the result table ordered by student_id in ascending order.

SELECT 
    student_id,
    course_id,
    grade
FROM (
    SELECT 
        student_id,
        course_id,
        grade,
        ROW_NUMBER() OVER(
            PARTITION BY student_id 
            ORDER BY grade DESC, course_id ASC
        ) AS rn
    FROM Enrollments
) ranked
WHERE 
    rn = 1
ORDER BY 
    student_id ASC;
