-- Problem: Calculate Special Bonus
-- Topic: SQL / CASE WHEN / IF / MOD
-- Language: SQL
--
-- Approach:
-- Assign a 100% bonus if employee_id is odd AND name does not start with 'M'.
-- Otherwise, assign 0. Order output by employee_id.

SELECT 
    employee_id,
    CASE 
        WHEN employee_id % 2 != 0 AND name NOT LIKE 'M%' THEN salary
        ELSE 0
    END AS bonus
FROM Employees
ORDER BY employee_id;
