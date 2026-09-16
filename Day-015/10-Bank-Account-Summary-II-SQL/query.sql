-- Problem: Bank Account Summary II
-- Topic: SQL / JOIN / GROUP BY / HAVING / SUM
-- Language: SQL
--
-- Approach:
-- JOIN Users with Transactions on account number. Group by user_id and name.
-- Filter accounts with balance > 10000 using HAVING SUM(amount) > 10000.

SELECT 
    u.name,
    SUM(t.amount) AS balance
FROM Users u
JOIN Transactions t ON u.account = t.account
GROUP BY u.account, u.name
HAVING balance > 10000;
