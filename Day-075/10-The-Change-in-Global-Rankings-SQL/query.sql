-- Problem: The Change in Global Rankings (LeetCode 2175)
-- Difficulty: Medium
-- Category: Database / SQL / Window Functions / ROW_NUMBER

/*
Table: TeamPoints
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| team_id     | int     |
| name        | varchar |
| points      | int     |
+-------------+---------+
team_id is the primary key for this table.
Each row of this table contains the ID of a national team, its name, and its points.

Table: PointsChange
+---------------+------+
| Column Name   | Type |
+---------------+------+
| team_id       | int  |
| points_change | int  |
+---------------+------+
team_id is the primary key for this table.
Each row contains the points change for each national team after the championship.

Problem Statement:
The global ranking of a national team is based on its points:
- The team with the most points gets rank 1.
- In case of a tie, teams are sorted alphabetically by their name in ascending order.
- After the championship, the new points are (points + points_change).

Calculate the difference between the rank of each team before and after the points change:
    rank_diff = initial_rank - new_rank.

Return the result table in any order.

Example 1:
Input:
TeamPoints table:
+---------+-------------+--------+
| team_id | name        | points |
+---------+-------------+--------+
| 3       | Algeria     | 1431   |
| 1       | Senegal     | 2132   |
| 2       | New Zealand | 1402   |
| 4       | Croatia     | 1805   |
+---------+-------------+--------+
PointsChange table:
+---------+---------------+
| team_id | points_change |
+---------+---------------+
| 3       | 399           |
| 2       | 0             |
| 4       | 13            |
| 1       | -22           |
+---------+---------------+
Output:
+---------+-------------+-----------+
| team_id | name        | rank_diff |
+---------+-------------+-----------+
| 1       | Senegal     | 0         |
| 4       | Croatia     | -1        |
| 3       | Algeria     | 1         |
| 2       | New Zealand | 0         |
+---------+-------------+-----------+
Explanation:
Initial rankings:
- 1: Senegal (2132)
- 2: Croatia (1805)
- 3: Algeria (1431)
- 4: New Zealand (1402)

New points and new rankings:
- Senegal: 2132 - 22 = 2110 -> Rank 1 (rank_diff = 1 - 1 = 0)
- Algeria: 1431 + 399 = 1830 -> Rank 2 (rank_diff = 3 - 2 = 1)
- Croatia: 1805 + 13 = 1818 -> Rank 3 (rank_diff = 2 - 3 = -1)
- New Zealand: 1402 + 0 = 1402 -> Rank 4 (rank_diff = 4 - 4 = 0)
*/

-- ----------------- Schema Setup -----------------
CREATE TABLE IF NOT EXISTS TeamPoints (
    team_id INT PRIMARY KEY,
    name VARCHAR(50),
    points INT
);

CREATE TABLE IF NOT EXISTS PointsChange (
    team_id INT PRIMARY KEY,
    points_change INT
);

-- ----------------- Sample Data -----------------
TRUNCATE TABLE TeamPoints;
INSERT INTO TeamPoints (team_id, name, points) VALUES
(3, 'Algeria', 1431),
(1, 'Senegal', 2132),
(2, 'New Zealand', 1402),
(4, 'Croatia', 1805);

TRUNCATE TABLE PointsChange;
INSERT INTO PointsChange (team_id, points_change) VALUES
(3, 399),
(2, 0),
(4, 13),
(1, -22);

-- ----------------- Solution Query (Window Function ROW_NUMBER) -----------------
WITH InitialRank AS (
    SELECT
        team_id,
        name,
        ROW_NUMBER() OVER (ORDER BY points DESC, name ASC) AS init_rank
    FROM TeamPoints
),
NewRank AS (
    SELECT
        p.team_id,
        ROW_NUMBER() OVER (ORDER BY p.points + c.points_change DESC, p.name ASC) AS new_rank
    FROM TeamPoints p
    JOIN PointsChange c
        ON p.team_id = c.team_id
)
SELECT
    i.team_id,
    i.name,
    CAST(i.init_rank AS SIGNED) - CAST(n.new_rank AS SIGNED) AS rank_diff
FROM InitialRank i
JOIN NewRank n
    ON i.team_id = n.team_id;
