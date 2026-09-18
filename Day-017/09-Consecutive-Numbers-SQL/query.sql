-- Problem: Consecutive Numbers
-- Topic: SQL / Window Function / LEAD / LAG
-- Language: SQL
--
-- Approach:
-- Use LEAD() and LAG() window functions to inspect the previous and next row values of num.
-- Filter distinct values where num equals both its preceding value and succeeding value.

WITH RankedLogs AS (
    SELECT 
        num,
        LAG(num, 1) OVER (ORDER BY id) AS prev_num,
        LEAD(num, 1) OVER (ORDER BY id) AS next_num
    FROM Logs
)
SELECT DISTINCT num AS ConsecutiveNums
FROM RankedLogs
WHERE num = prev_num AND num = next_num;
