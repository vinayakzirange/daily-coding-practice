-- LeetCode 1107: New Users Daily Count (Medium)
-- https://leetcode.com/problems/new-users-daily-count/
--
-- Table: Traffic
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | user_id       | int     |
-- | activity      | enum    |
-- | activity_date | date    |
-- +---------------+---------+
-- There is no primary key for this table, it may have duplicate rows.
-- The activity column is an ENUM type of ('login', 'logout', 'jobs', 'groups', 'homepage').
--
-- Write an SQL query to report for every date within at most 90 days from today,
-- the number of users that logged in for the first time on that date.
-- Assume today is 2019-06-30.
-- Return the result table in any order.

SELECT 
    login_date,
    COUNT(user_id) AS user_count
FROM (
    SELECT 
        user_id,
        MIN(activity_date) AS login_date
    FROM Traffic
    WHERE 
        activity = 'login'
    GROUP BY 
        user_id
) first_logins
WHERE 
    login_date BETWEEN DATE_SUB('2019-06-30', INTERVAL 90 DAY) AND '2019-06-30'
GROUP BY 
    login_date;

