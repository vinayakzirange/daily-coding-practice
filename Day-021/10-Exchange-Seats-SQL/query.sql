-- Problem: Exchange Seats
-- Topic: SQL / CASE WHEN / MOD / Window Shifting
-- Language: SQL
--
-- Approach:
-- Swap adjacent student seat IDs:
-- If id is odd and not the last id, return id + 1.
-- If id is even, return id - 1.
-- If id is odd and is the last id, return id unchanged.
-- Order output by id ASC.

SELECT 
    CASE 
        WHEN id % 2 != 0 AND id = (SELECT MAX(id) FROM Seat) THEN id
        WHEN id % 2 != 0 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM Seat
ORDER BY id ASC;
