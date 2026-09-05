-- Problem Name: Employees Earning More Than Their Managers
-- Problem Statement: Write an SQL query to find the employees who earn more than their managers.
--
-- Schema:
-- Employee (id INT, name VARCHAR, salary INT, managerId INT)

SELECT e.name AS Employee
FROM Employee e
JOIN Employee m ON e.managerId = m.id
WHERE e.salary > m.salary;
