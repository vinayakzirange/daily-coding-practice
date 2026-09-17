-- Problem: Rank Scores
-- Topic: SQL / DENSE_RANK Window Function
-- Language: SQL
--
-- Approach:
-- Rank scores descending using DENSE_RANK() OVER (ORDER BY score DESC).
-- DENSE_RANK ensures tied scores receive identical rank without skipping rank positions.

SELECT 
    score,
    DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank'
FROM Scores;
