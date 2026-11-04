-- LeetCode 1212: Team Scores in Football Matches (Medium)
-- https://leetcode.com/problems/team-scores-in-football-matches/
--
-- Table: Teams
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | team_id       | int     |
-- | team_name     | varchar |
-- +---------------+---------+
-- team_id is the column with unique values for this table.
--
-- Table: Matches
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | match_id      | int     |
-- | host_team     | int     |
-- | guest_team    | int     | 
-- | host_goals    | int     |
-- | guest_goals   | int     |
-- +---------------+---------+
-- match_id is the column of unique values of this table.
--
-- Scoring rules:
-- - Win: 3 points
-- - Draw: 1 point
-- - Loss: 0 points
--
-- Write a solution to report the team_id, team_name, and num_points.
-- Return the result table ordered by num_points DESC, team_id ASC.

SELECT 
    t.team_id,
    t.team_name,
    COALESCE(SUM(
        CASE 
            WHEN t.team_id = m.host_team AND m.host_goals > m.guest_goals THEN 3
            WHEN t.team_id = m.guest_team AND m.guest_goals > m.host_goals THEN 3
            WHEN (t.team_id = m.host_team OR t.team_id = m.guest_team) AND m.host_goals = m.guest_goals THEN 1
            ELSE 0
        END
    ), 0) AS num_points
FROM Teams t
LEFT JOIN Matches m 
    ON t.team_id = m.host_team OR t.team_id = m.guest_team
GROUP BY 
    t.team_id,
    t.team_name
ORDER BY 
    num_points DESC,
    t.team_id ASC;

