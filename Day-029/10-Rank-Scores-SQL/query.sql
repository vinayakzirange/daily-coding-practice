-- Problem: Rank Scores (LeetCode 178)
-- Language: SQL
-- Difficulty: Medium

SELECT 
    score,
    DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank'
FROM Scores;
