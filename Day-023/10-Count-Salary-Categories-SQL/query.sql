-- Problem: Count Salary Categories
-- Topic: SQL / UNION / SUM / CASE WHEN
-- Language: SQL
--
-- Approach:
-- Count accounts for 3 categories: Low Salary (< 20000), Average Salary (20000 to 50000), High Salary (> 50000).
-- Use UNION to guarantee all 3 categories appear in output even if count is 0.

SELECT 'Low Salary' AS category, SUM(CASE WHEN income < 20000 THEN 1 ELSE 0 END) AS accounts_count FROM Accounts
UNION ALL
SELECT 'Average Salary' AS category, SUM(CASE WHEN income BETWEEN 20000 AND 50000 THEN 1 ELSE 0 END) AS accounts_count FROM Accounts
UNION ALL
SELECT 'High Salary' AS category, SUM(CASE WHEN income > 50000 THEN 1 ELSE 0 END) AS accounts_count FROM Accounts;
