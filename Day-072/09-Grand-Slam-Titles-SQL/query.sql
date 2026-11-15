-- Problem: Grand Slam Titles (LeetCode 1783)
-- Difficulty: Medium
-- Category: Database / SQL / Aggregation / Join / Unpivot

/*
Table: Players
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| player_id   | int     |
| player_name | varchar |
+-------------+---------+
player_id is the primary key for this table.
Each row contains the name and ID of a tennis player.

Table: Championships
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| year        | int     |
| Wimbledon   | int     |
| Fr_open     | int     |
| US_open     | int     |
| Au_open     | int     |
+-------------+---------+
year is the primary key for this table.
Each row contains the IDs of the players who won each of the four Grand Slam tournaments in that year.

Problem Statement:
Write an SQL query to report the number of grand slam tournaments won by each player.
Do not include the players who did not win any tournaments.
Return the result table in any order.

Example Output:
+-----------+-------------+-------------------+
| player_id | player_name | grand_slams_count |
+-----------+-------------+-------------------+
| 2         | Federer     | 5                 |
| 1         | Nadal       | 7                 |
+-----------+-------------+-------------------+
*/

-- ----------------- Schema Setup -----------------
CREATE TABLE IF NOT EXISTS Players (
    player_id INT PRIMARY KEY,
    player_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Championships (
    year INT PRIMARY KEY,
    Wimbledon INT,
    Fr_open INT,
    US_open INT,
    Au_open INT
);

-- ----------------- Sample Data -----------------
TRUNCATE TABLE Players;
INSERT INTO Players (player_id, player_name) VALUES
(1, 'Nadal'),
(2, 'Federer'),
(3, 'Novak');

TRUNCATE TABLE Championships;
INSERT INTO Championships (year, Wimbledon, Fr_open, US_open, Au_open) VALUES
(2018, 1, 1, 1, 1),
(2019, 1, 1, 2, 2),
(2020, 2, 1, 2, 2);

-- ----------------- Solution Query (Approach 1: UNION ALL Unpivot CTE) -----------------
WITH AllGrandSlamWinners AS (
    SELECT Wimbledon AS player_id FROM Championships
    UNION ALL
    SELECT Fr_open AS player_id FROM Championships
    UNION ALL
    SELECT US_open AS player_id FROM Championships
    UNION ALL
    SELECT Au_open AS player_id FROM Championships
)
SELECT
    p.player_id,
    p.player_name,
    COUNT(w.player_id) AS grand_slams_count
FROM Players p
INNER JOIN AllGrandSlamWinners w
    ON p.player_id = w.player_id
GROUP BY
    p.player_id,
    p.player_name;

-- ----------------- Alternative Solution (Approach 2: Boolean Aggregation) -----------------
/*
SELECT
    p.player_id,
    p.player_name,
    SUM(
        (p.player_id = c.Wimbledon) +
        (p.player_id = c.Fr_open) +
        (p.player_id = c.US_open) +
        (p.player_id = c.Au_open)
    ) AS grand_slams_count
FROM Players p
INNER JOIN Championships c
    ON p.player_id IN (c.Wimbledon, c.Fr_open, c.US_open, c.Au_open)
GROUP BY
    p.player_id,
    p.player_name;
*/
