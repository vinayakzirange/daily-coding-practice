-- ====================================================================
-- Problem: Restaurant Growth (LeetCode 1321)
-- Difficulty: Medium
-- Topic: SQL / Window Functions / Rolling Aggregation / ROUND / INTERVAL
-- ====================================================================

/*
Table: Customer
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| customer_id   | int     |
| name          | varchar |
| visited_on    | date    |
| amount        | int     |
+---------------+---------+
In SQL,(customer_id, visited_on) is the primary key for this table.
This table contains data about customer transactions in a restaurant.
visited_on is the date on which the customer visited the restaurant.
amount is the total paid by a customer.

Question:
Compute the moving average of how much the customer paid in a seven days window
(i.e., current day + 6 days before).
average_amount should be rounded to 2 decimal places.

Return the result table ordered by visited_on in ascending order.

Example 1:
Input: 
Customer table:
+-------------+--------------+--------------+-------------+
| customer_id | name         | visited_on   | amount      |
+-------------+--------------+--------------+-------------+
| 1           | Jhon         | 2019-01-01   | 100         |
| 2           | Daniel       | 2019-01-02   | 110         |
| 3           | Jade         | 2019-01-03   | 120         |
| 4           | Khaled       | 2019-01-04   | 130         |
| 5           | Winston      | 2019-01-05   | 110         | 
| 6           | Elvis        | 2019-01-06   | 140         | 
| 7           | Anna         | 2019-01-07   | 150         |
| 8           | Maria        | 2019-01-08   | 80          |
| 9           | Jaze         | 2019-01-09   | 110         | 
| 1           | Jhon         | 2019-01-10   | 130         | 
| 3           | Jade         | 2019-01-10   | 150         | 
+-------------+--------------+--------------+-------------+
Output: 
+--------------+--------------+----------------+
| visited_on   | amount       | average_amount |
+--------------+--------------+----------------+
| 2019-01-07   | 860          | 122.86         |
| 2019-01-08   | 840          | 120.00         |
| 2019-01-09   | 840          | 120.00         |
| 2019-01-10   | 1000         | 142.86         |
+--------------+--------------+----------------+
*/

-- Solution: Using CTE to aggregate daily sums, then 7-day rolling window
WITH DailyAmounts AS (
    SELECT 
        visited_on,
        SUM(amount) AS daily_amount
    FROM 
        Customer
    GROUP BY 
        visited_on
),
RollingStats AS (
    SELECT 
        visited_on,
        SUM(daily_amount) OVER (
            ORDER BY visited_on 
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ) AS amount,
        ROUND(AVG(daily_amount) OVER (
            ORDER BY visited_on 
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 2) AS average_amount,
        DENSE_RANK() OVER (ORDER BY visited_on) AS rnk
    FROM 
        DailyAmounts
)
SELECT 
    visited_on,
    amount,
    average_amount
FROM 
    RollingStats
WHERE 
    rnk >= 7
ORDER BY 
    visited_on ASC;
