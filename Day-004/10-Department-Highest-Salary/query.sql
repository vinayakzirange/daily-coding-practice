-- Problem Name: Department Highest Salary
-- Problem Statement: Write an SQL query to find employees who have the highest salary in each of the departments.
--
-- Schema:
-- Employee (id INT, name VARCHAR, salary INT, departmentId INT)
-- Department (id INT, name VARCHAR)

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
