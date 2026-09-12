-- Problem Name: Employees With Missing Information
-- Problem Statement: Write an SQL query to report the IDs of all the employees with missing information (either name or salary is missing).
-- Return the result table ordered by employee_id in ascending order.
--
-- Schema:
-- Employees (employee_id INT, name VARCHAR)
-- Salaries (employee_id INT, salary INT)

SELECT employee_id
FROM (
    SELECT e.employee_id FROM Employees e LEFT JOIN Salaries s ON e.employee_id = s.employee_id WHERE s.salary IS NULL
    UNION
    SELECT s.employee_id FROM Salaries s LEFT JOIN Employees e ON s.employee_id = e.employee_id WHERE e.name IS NULL
) missing_info
ORDER BY employee_id ASC;
