-- LeetCode 1077: Project Employees III (Medium)
-- https://leetcode.com/problems/project-employees-iii/
--
-- Table: Project
-- +-------------+---------+
-- | Column Name | Type    |
-- +-------------+---------+
-- | project_id  | int     |
-- | employee_id | int     |
-- +-------------+---------+
-- (project_id, employee_id) is the primary key of this table.
-- employee_id is a foreign key to Employee table.
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
-- Write an SQL query that reports the most experienced employees in each project.
-- In case of a tie, report all employees with the maximum number of experience years.
-- Return the result table in any order.

SELECT 
    project_id,
    employee_id
FROM (
    SELECT 
        p.project_id,
        p.employee_id,
        DENSE_RANK() OVER (
            PARTITION BY p.project_id 
            ORDER BY e.experience_years DESC
        ) AS rnk
    FROM Project p
    JOIN Employee e 
        ON p.employee_id = e.employee_id
) ranked
WHERE 
    rnk = 1;

