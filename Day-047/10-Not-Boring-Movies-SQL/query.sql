-- ====================================================================
-- Problem: Not Boring Movies (LeetCode 620)
-- Difficulty: Easy / Medium Practice
-- Topic: SQL / Filtering / ORDER BY / Modulo Arithmetic
-- ====================================================================

/*
Table: Cinema
+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| id             | int      |
| movie          | varchar  |
| description    | varchar  |
| rating         | float    |
+----------------+----------+
id is the primary key (column with unique values) for this table.
Each row contains information about the name of a movie, its genre, and its rating.
rating is a 2 decimal places float in the range [0, 10]

Question:
Write a solution to report the movies with an odd-numbered ID and a description
that is not "boring".

Return the result table ordered by rating in descending order.

Example 1:
Input: 
Cinema table:
+----+------------+-------------+--------+
| id | movie      | description | rating |
+----+------------+-------------+--------+
| 1  | War        | great 3D    | 8.9    |
| 2  | Science    | fiction     | 8.5    |
| 3  | irish      | boring      | 6.2    |
| 4  | Ice song   | Fantacy     | 8.6    |
| 5  | House card | Interesting | 9.1    |
+----+------------+-------------+--------+
Output: 
+----+------------+-------------+--------+
| id | movie      | description | rating |
+----+------------+-------------+--------+
| 5  | House card | Interesting | 9.1    |
| 1  | War        | great 3D    | 8.9    |
+----+------------+-------------+--------+
Explanation: 
We have three movies with odd-numbered IDs: 1, 3, and 5.
The movie with ID = 3 is boring, so we do not include it in the answer.
Movie 5 has a rating of 9.1 and movie 1 has a rating of 8.9.
We sort the resulting movies in descending order of rating.
*/

-- ====================================================================
-- Solution:
-- Filter rows WHERE id % 2 = 1 AND description <> 'boring'
-- Sort by rating DESC
-- Time Complexity: O(N log N) for ORDER BY
-- Space Complexity: O(N)
-- ====================================================================

SELECT 
    id,
    movie,
    description,
    rating
FROM 
    Cinema
WHERE 
    id % 2 = 1
    AND description <> 'boring'
ORDER BY 
    rating DESC;
