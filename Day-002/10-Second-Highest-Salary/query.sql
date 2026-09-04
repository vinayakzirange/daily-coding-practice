-- Problem Name: Second Highest Salary
-- Problem Statement: Write an SQL query to report the second highest salary from the Employee table.
-- If there is no second highest salary, the query should report null.
--
-- Schema:
-- Employee (id INT, salary INT)

-- Approach 1: Using IFNULL and Subquery with LIMIT/OFFSET
SELECT 
    IFNULL(
        (SELECT DISTINCT salary 
         FROM Employee 
         ORDER BY salary DESC 
         LIMIT 1 OFFSET 1), 
        NULL
    ) AS SecondHighestSalary;

-- Approach 2: Using MAX() with subquery (ANSI SQL compatible)
-- SELECT MAX(salary) AS SecondHighestSalary
-- FROM Employee
-- WHERE salary < (SELECT MAX(salary) FROM Employee);
