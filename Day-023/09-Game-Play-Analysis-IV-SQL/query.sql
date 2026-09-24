-- Problem: Game Play Analysis IV
-- Topic: SQL / Subquery / DATESUB / DATE_ADD / ROUND / AVG
-- Language: SQL
--
-- Approach:
-- Find first login date for each player in a CTE.
-- Join Activity table where event_date = DATE_ADD(first_login, INTERVAL 1 DAY).
-- Calculate fraction of players logging in consecutive day rounded to 2 decimal places.

WITH FirstLogins AS (
    SELECT player_id, MIN(event_date) AS first_login
    FROM Activity
    GROUP BY player_id
)
SELECT 
    ROUND(
        COUNT(a.player_id) / COUNT(f.player_id), 
        2
    ) AS fraction
FROM FirstLogins f
LEFT JOIN Activity a 
    ON f.player_id = a.player_id 
   AND a.event_date = DATE_ADD(f.first_login, INTERVAL 1 DAY);
