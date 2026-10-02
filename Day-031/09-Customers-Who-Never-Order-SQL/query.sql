-- Problem: Customers Who Never Order (LeetCode 183)
-- Language: SQL
-- Difficulty: Easy / Medium

SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.id IS NULL;
