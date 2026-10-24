-- ====================================================================
-- Problem: Find Customer Referee (LeetCode 584)
-- Difficulty: Easy / Medium Practice
-- Topic: SQL / Filtering / NULL Handling / Boolean Logic
-- ====================================================================

/*
Table: Customer
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
| referee_id  | int     |
+-------------+---------+
In SQL, id is the primary key column for this table.
Each row of this table indicates the id of a customer, their name,
and the id of the customer who referred them.

Question:
Find the names of the customer that are either referred by any customer
except the customer with id = 2, or not referred by anyone.

Return the result table in any order.

Example 1:
Input: 
Customer table:
+----+------+------------+
| id | name | referee_id |
+----+------+------------+
| 1  | Will | null       |
| 2  | Jane | null       |
| 3  | Alex | 2          |
| 4  | Bill | null       |
| 5  | Zack | 1          |
| 6  | Mark | 2          |
+----+------+------------+
Output: 
+------+
| name |
+------+
| Will |
| Jane |
| Bill |
| Zack |
+------+
Explanation: 
Customers Will, Jane, and Bill have referee_id = null.
Customer Zack has referee_id = 1.
Customers Alex and Mark have referee_id = 2 and are excluded.
*/

-- ====================================================================
-- Solution:
-- Filter WHERE referee_id != 2 OR referee_id IS NULL.
-- (In SQL three-valued logic, NULL != 2 evaluates to UNKNOWN, so NULL check is mandatory).
-- Time Complexity: O(N) single scan of Customer table
-- Space Complexity: O(1)
-- ====================================================================

SELECT 
    name
FROM 
    Customer
WHERE 
    referee_id != 2 
    OR referee_id IS NULL;
