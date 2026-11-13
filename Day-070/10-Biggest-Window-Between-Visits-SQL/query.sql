-- Problem: Biggest Window Between Visits (LeetCode 1709)
-- Difficulty: Medium
-- Language: SQL (MySQL)

/*
Table: UserVisits
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| user_id       | int     |
| visit_date    | date    |
+---------------+---------+

Assume today's date is '2021-01-01'.
A window between two visits is the number of days between two consecutive visits of a user.
The window of the last visit is the number of days between the last visit and '2021-01-01'.

Write a solution to report the biggest window in days between consecutive visits for each user.
Return the result table ordered by user_id ASC.
*/

WITH VisitWindows AS (
    SELECT 
        user_id,
        DATEDIFF(
            LEAD(visit_date, 1, '2021-01-01') OVER (
                PARTITION BY user_id 
                ORDER BY visit_date ASC
            ),
            visit_date
        ) AS window_days
    FROM UserVisits
)
SELECT 
    user_id,
    MAX(window_days) AS biggest_window
FROM VisitWindows
GROUP BY 
    user_id
ORDER BY 
    user_id ASC;
