-- Problem Name: Exchange Seats
-- Problem Statement: Write an SQL query to swap the seat id of every two consecutive students.
-- If the number of students is odd, the id of the last student is not swapped.
--
-- Schema:
-- Seat (id INT, student VARCHAR)

SELECT 
    CASE 
        WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id
        WHEN id % 2 = 1 THEN id + 1
        ELSE id - 1
    END AS id,
    student
FROM Seat
ORDER BY id ASC;
