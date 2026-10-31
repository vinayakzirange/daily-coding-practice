-- ====================================================================
-- Problem: Delete Duplicate Emails (LeetCode 196)
-- Difficulty: Easy / Medium Practice
-- Topic: Database, SQL, DELETE, Self Join, Filtering
-- ====================================================================

/*
Table: Person
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| email       | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table.
Each row of this table contains an email. The emails will not contain uppercase letters.

Write a solution to delete all duplicate emails, keeping only one unique
email with the smallest id.

For SQL users, please note that you are supposed to write a DELETE statement
and not a SELECT one.

After your script is run, the answer shown is the Person table. The driver
will first compile and run your piece of code and then show the Person table.
The final order of the Person table does not matter.

Example 1:
Input: 
Person table:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
| 3  | john@example.com |
+----+------------------+
Output: 
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
+----+------------------+
Explanation: 
john@example.com is repeated two times. We keep the row with the smallest Id = 1.
*/

-- ====================================================================
-- Solution: DELETE with Self-Join on identical email and greater id
-- Time Complexity: O(N^2) worst case without index, O(N) with index
-- Space Complexity: O(1) in-place row deletion
-- ====================================================================

DELETE p1
FROM
    Person p1
JOIN
    Person p2 ON p1.email = p2.email
WHERE
    p1.id > p2.id;
