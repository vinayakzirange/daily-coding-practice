-- Problem: Friend Requests II: Who Has Most Friends
-- Topic: SQL / UNION ALL / GROUP BY / ORDER BY / LIMIT
-- Language: SQL
--
-- Approach:
-- Combine requester_id and accepter_id into a single column using UNION ALL.
-- Group by id, sum total count as num, order by num DESC, and return top 1 with LIMIT 1.

WITH AllFriends AS (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
)
SELECT 
    id,
    COUNT(*) AS num
FROM AllFriends
GROUP BY id
ORDER BY num DESC
LIMIT 1;
