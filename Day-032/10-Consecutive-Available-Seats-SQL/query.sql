-- Problem: Consecutive Available Seats (LeetCode 603)
-- Language: SQL
-- Difficulty: Medium

/*
Table: Cinema
+-------------+------+
| Column Name | Type |
+-------------+------+
| seat_id     | int  |
| free        | bool |
+-------------+------+
seat_id is an auto-increment column.
free is 1 if the seat is free and 0 otherwise.

Query to find all the consecutive available seats in the cinema.
Order the result table by seat_id in ascending order.
*/

-- Approach 1: Window Functions LAG() and LEAD()
SELECT DISTINCT seat_id
FROM (
    SELECT
        seat_id,
        free,
        LAG(free) OVER (ORDER BY seat_id) AS prev_free,
        LEAD(free) OVER (ORDER BY seat_id) AS next_free
    FROM Cinema
) t
WHERE free = 1
  AND (prev_free = 1 OR next_free = 1)
ORDER BY seat_id;

-- Approach 2: Self-Join (Compatible with older SQL engines)
/*
SELECT DISTINCT c1.seat_id
FROM Cinema c1
JOIN Cinema c2
  ON ABS(c1.seat_id - c2.seat_id) = 1
WHERE c1.free = 1 AND c2.free = 1
ORDER BY c1.seat_id;
*/
