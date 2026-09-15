-- Problem: Top Travellers
-- Topic: SQL / LEFT JOIN / IFNULL / SUM / GROUP BY
-- Language: SQL
--
-- Approach:
-- LEFT JOIN Users with Rides on user_id. Sum distance using IFNULL(SUM(distance), 0).
-- Group by user_id and user name. Order by travelled_distance DESC, then name ASC.

SELECT 
    u.name,
    IFNULL(SUM(r.distance), 0) AS travelled_distance
FROM Users u
LEFT JOIN Rides r ON u.id = r.user_id
GROUP BY u.id, u.name
ORDER BY travelled_distance DESC, u.name ASC;
