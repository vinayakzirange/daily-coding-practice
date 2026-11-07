-- LeetCode 1308: Running Total for Different Genders (Medium)
-- https://leetcode.com/problems/running-total-for-different-genders/
--
-- Table: Scores
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | player_name   | varchar |
-- | gender        | varchar |
-- | day           | date    |
-- | score_points  | int     |
-- +---------------+---------+
-- (gender, day) is the primary key for this table.
-- Each row of this table indicates that a player played a match on someday
-- and scored some points.
--
-- Write a solution to find the total score for each gender on each day.
-- Return the result table ordered by gender and day in ascending order.

SELECT 
    gender,
    day,
    SUM(score_points) OVER (
        PARTITION BY gender 
        ORDER BY day ASC
    ) AS total_points
FROM Scores
ORDER BY 
    gender ASC, 
    day ASC;
