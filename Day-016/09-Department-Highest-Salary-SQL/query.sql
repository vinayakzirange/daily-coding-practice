-- Problem: Department Highest Salary
-- Topic: SQL / Subquery / IN / MAX / GROUP BY
-- Language: SQL
--
-- Approach:
-- Select department name, employee name, and salary where (departmentId, salary) is present in
-- subquery selecting (departmentId, MAX(salary)) grouped by departmentId.

SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
    SELECT departmentId, MAX(salary)
    FROM Employee
    GROUP BY departmentId
);
