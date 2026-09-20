-- Problem: Movie Rating
-- Topic: SQL / UNION ALL / Subqueries / GROUP BY / ORDER BY / LIMIT
-- Language: SQL
--
-- Approach:
-- 1. Find user who rated most movies (tie-breaker: lexicographically smaller name).
-- 2. Find movie with highest average rating in Feb 2020 (tie-breaker: lexicographically smaller title).
-- 3. Combine both results using UNION ALL.

(
    SELECT u.name AS results
    FROM MovieRating r
    JOIN Users u ON r.user_id = u.user_id
    GROUP BY r.user_id, u.name
    ORDER BY COUNT(*) DESC, u.name ASC
    LIMIT 1
)
UNION ALL
(
    SELECT m.title AS results
    FROM MovieRating r
    JOIN Movies m ON r.movie_id = m.movie_id
    WHERE r.created_at BETWEEN '2020-02-01' AND '2020-02-29'
    GROUP BY r.movie_id, m.title
    ORDER BY AVG(r.rating) DESC, m.title ASC
    LIMIT 1
);
