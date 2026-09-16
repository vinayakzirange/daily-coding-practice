-- Problem: Find Total Time Spent by Each Employee
-- Topic: SQL / SUM / GROUP BY / Date Functions
-- Language: SQL
--
-- Approach:
-- Calculate total time per entry as (out_time - in_time).
-- Group by event_day (as day) and emp_id, summing the calculated total times.

SELECT 
    event_day AS day,
    emp_id,
    SUM(out_time - in_time) AS total_time
FROM Employees
GROUP BY event_day, emp_id;
