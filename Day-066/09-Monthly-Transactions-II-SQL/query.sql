-- Problem: Monthly Transactions II (LeetCode 1205)
-- Difficulty: Medium
-- Language: SQL (MySQL)

/*
Table: Transactions
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| id             | int     |
| country        | varchar |
| state          | enum    |
| amount         | int     |
| trans_date     | date    |
+----------------+---------+
id is the column of unique values of this table.
state is an ENUM of type ["approved", "declined"].

Table: Chargebacks
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| trans_id       | int     |
| trans_date     | date    |
+----------------+---------+
References Transactions(id).

Write an SQL query to find for each month and country:
  - the number of approved transactions and their total amount,
  - the number of chargebacks and their total amount.
Note: Ignore rows where all four values are 0.
*/

WITH Combined AS (
    -- Approved Transactions
    SELECT 
        DATE_FORMAT(trans_date, '%Y-%m') AS month,
        country,
        1 AS approved_count,
        amount AS approved_amount,
        0 AS chargeback_count,
        0 AS chargeback_amount
    FROM Transactions
    WHERE state = 'approved'

    UNION ALL

    -- Chargebacks
    SELECT 
        DATE_FORMAT(c.trans_date, '%Y-%m') AS month,
        t.country,
        0 AS approved_count,
        0 AS approved_amount,
        1 AS chargeback_count,
        t.amount AS chargeback_amount
    FROM Chargebacks c
    INNER JOIN Transactions t ON c.trans_id = t.id
)
SELECT 
    month,
    country,
    SUM(approved_count) AS approved_count,
    SUM(approved_amount) AS approved_amount,
    SUM(chargeback_count) AS chargeback_count,
    SUM(chargeback_amount) AS chargeback_amount
FROM Combined
GROUP BY 
    month, 
    country
HAVING 
    approved_count > 0 OR chargeback_count > 0;
