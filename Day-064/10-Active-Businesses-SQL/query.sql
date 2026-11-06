-- LeetCode 1126: Active Businesses (Medium)
-- https://leetcode.com/problems/active-businesses/
--
-- Table: Events
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | business_id   | int     |
-- | event_type    | varchar |
-- | occurences    | int     |
-- +---------------+---------+
-- (business_id, event_type) is the primary key of this table.
-- Each row in the table logs the number of occurrences of an event of a business.
--
-- The average activity for a particular event_type is the average occurences
-- across all companies that have this event.
-- An active business is a business that has more than one event_type where the
-- occurences for that event is strictly greater than the average activity for that event.
--
-- Write an SQL query to find all active businesses.
-- Return the result table in any order.

WITH EventAverages AS (
    SELECT 
        event_type,
        AVG(occurences) AS avg_occurences
    FROM Events
    GROUP BY 
        event_type
)
SELECT 
    e.business_id
FROM Events e
JOIN EventAverages a 
    ON e.event_type = a.event_type
WHERE 
    e.occurences > a.avg_occurences
GROUP BY 
    e.business_id
HAVING 
    COUNT(e.event_type) > 1;

