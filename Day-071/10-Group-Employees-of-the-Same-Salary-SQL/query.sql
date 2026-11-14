-- Problem: Group Employees of the Same Salary (LeetCode 1875)
-- Difficulty: Medium
-- Language: SQL (MySQL)

/*
Table: Employees
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| employee_id | int     |
| name        | varchar |
| salary      | int     |
+-------------+---------+
employee_id is the column with unique values for this table.

A company wants to divide the employees into teams such that:
  - Each team consists of at least two employees.
  - All employees on a team have the same salary.
  - Employees with unique salaries are not assigned to any team.
  - team_id is assigned based on the ranking of team salaries where the lowest salary gets 1.

Return the result table ordered by team_id ASC, employee_id ASC.
*/

WITH TeamSalaries AS (
    SELECT 
        salary
    FROM Employees
    GROUP BY salary
    HAVING COUNT(*) >= 2
)
SELECT 
    e.employee_id,
    e.name,
    e.salary,
    DENSE_RANK() OVER (ORDER BY e.salary ASC) AS team_id
FROM Employees e
INNER JOIN TeamSalaries ts 
    ON e.salary = ts.salary
ORDER BY 
    team_id ASC,
    e.employee_id ASC;
