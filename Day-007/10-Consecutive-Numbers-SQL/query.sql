-- Problem Name: Consecutive Numbers
-- Problem Statement: Find all numbers that appear at least three times consecutively in the Logs table.
--
-- Schema:
-- Logs (id INT, num VARCHAR)

SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1
JOIN Logs l2 ON l1.id = l2.id - 1
JOIN Logs l3 ON l1.id = l3.id - 2
WHERE l1.num = l2.num AND l2.num = l3.num;

-- Alternative Window Function Approach (LEAD / LAG):
-- SELECT DISTINCT num AS ConsecutiveNums
-- FROM (
--     SELECT num, 
--            LEAD(num, 1) OVER (ORDER BY id) AS next1,
--            LEAD(num, 2) OVER (ORDER BY id) AS next2
--     FROM Logs
-- ) temp
-- WHERE num = next1 AND next1 = next2;
