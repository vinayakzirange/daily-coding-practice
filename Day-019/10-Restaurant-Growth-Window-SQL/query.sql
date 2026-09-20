-- Problem: Restaurant Growth 7-Day Moving Average
-- Topic: SQL / Moving Average / Window Function / DATESUB
-- Language: SQL
--
-- Approach:
-- Aggregate daily customer amounts into a CTE. Calculate 7-day moving sum and moving average
-- using SUM() OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).
-- Filter visited_on dates having at least 6 preceding days.

WITH DailyAmount AS (
    SELECT 
        visited_on,
        SUM(amount) AS daily_amount
    FROM Customer
    GROUP BY visited_on
),
MovingStats AS (
    SELECT 
        visited_on,
        SUM(daily_amount) OVER (
            ORDER BY visited_on 
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ) AS amount,
        ROUND(AVG(daily_amount) OVER (
            ORDER BY visited_on 
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 2) AS average,
        DENSE_RANK() OVER (ORDER BY visited_on) AS rnk
    FROM DailyAmount
)
SELECT visited_on, amount, average
FROM MovingStats
WHERE rnk >= 7
ORDER BY visited_on;
