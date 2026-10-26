-- ====================================================================
-- Problem: Actors and Directors Who Cooperated At Least Three Times (LeetCode 1050)
-- Difficulty: Easy / Medium Practice
-- Topic: Database, SQL, GROUP BY, HAVING
-- ====================================================================

/*
Table: ActorDirector
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| actor_id    | int     |
| director_id | int     |
| timestamp   | int     |
+-------------+---------+
timestamp is the primary key (column with unique values) for this table.

Write a solution to find all the pairs (actor_id, director_id) where
the actor has cooperated with the director at least three times.

Return the result table in any order.

Example 1:
Input: 
ActorDirector table:
+-------------+-------------+-------------+
| actor_id    | director_id | timestamp   |
+-------------+-------------+-------------+
| 1           | 1           | 0           |
| 1           | 1           | 1           |
| 1           | 1           | 2           |
| 1           | 2           | 3           |
| 1           | 2           | 4           |
| 2           | 1           | 5           |
| 2           | 1           | 6           |
+-------------+-------------+-------------+
Output: 
+-------------+-------------+
| actor_id    | director_id |
+-------------+-------------+
| 1           | 1           |
+-------------+-------------+
Explanation: 
The only pair is (1, 1) who cooperated exactly 3 times.
*/

-- ====================================================================
-- Solution: GROUP BY composite key (actor_id, director_id) with HAVING
-- Time Complexity: O(N) where N is rows in ActorDirector
-- Space Complexity: O(U) where U is number of unique actor-director pairs
-- ====================================================================

SELECT
    actor_id,
    director_id
FROM
    ActorDirector
GROUP BY
    actor_id,
    director_id
HAVING
    COUNT(*) >= 3;
