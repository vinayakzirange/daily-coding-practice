-- Problem: Second Highest Salary
-- Topic: SQL / MAX Subquery / IFNULL
-- Language: SQL
--
-- Approach:
-- Select MAX(salary) from Employee where salary < (SELECT MAX(salary) FROM Employee).
-- Wrap in IFNULL/alias to return NULL if no second highest salary exists.

SELECT 
    MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);
