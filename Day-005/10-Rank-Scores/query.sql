-- Problem Name: Rank Scores
-- Problem Statement: Write an SQL query to rank the scores. The ranking should be calculated according to the following rules:
-- 1. Scores should be ranked from highest to lowest.
-- 2. If there is a tie between two scores, both should have the same ranking.
-- 3. After a tie, the next ranking number should be the next consecutive integer value (no holes in rank, i.e., DENSE_RANK).
--
-- Schema:
-- Scores (id INT, score DECIMAL(3,2))

SELECT 
    score,
    DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank'
FROM Scores;
