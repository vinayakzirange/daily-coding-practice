-- Problem: Monthly Transactions I
-- Topic: SQL / DATE_FORMAT / GROUP BY / COUNT / SUM / CASE WHEN
-- Language: SQL
--
-- Approach:
-- Format trans_date as '%Y-%m' (month). Group by month and country.
-- Calculate trans_count, approved_count, trans_total_amount, approved_total_amount using CASE WHEN.

SELECT 
    DATE_FORMAT(trans_date, '%Y-%m') AS month,
    country,
    COUNT(*) AS trans_count,
    SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
    SUM(amount) AS trans_total_amount,
    SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY month, country;
