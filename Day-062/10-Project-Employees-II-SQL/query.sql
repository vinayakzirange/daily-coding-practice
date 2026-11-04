-- LeetCode 1076: Project Employees II (Medium)
-- https://leetcode.com/problems/project-employees-ii/
--
-- Table: Project
-- +-------------+---------+
-- | Column Name | Type    |
-- +-------------+---------+
-- | project_id  | int     |
-- | employee_id | int     |
-- +-------------+---------+
-- (project_id, employee_id) is the primary key of this table.
--
-- Table: Employee
-- +------------------+---------+
-- | Column Name      | Type    |
-- +------------------+---------+
-- | employee_id      | int     |
-- | name             | varchar |
-- | experience_years | int     |
-- +------------------+---------+
-- employee_id is the primary key of this table.
--
-- Write an SQL query that reports all the projects that have the most employees.
-- Return the result table in any order.

SELECT 
    project_id
FROM Project
GROUP BY 
    project_id
HAVING 
    COUNT(employee_id) = (
        SELECT COUNT(employee_id)
        FROM Project
        GROUP BY project_id
        ORDER BY COUNT(employee_id) DESC
        LIMIT 1
    );

