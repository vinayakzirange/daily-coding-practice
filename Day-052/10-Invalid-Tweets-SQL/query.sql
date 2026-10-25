-- ====================================================================
-- Problem: Invalid Tweets (LeetCode 1683)
-- Difficulty: Easy / Medium Practice
-- Topic: SQL / String Functions / LENGTH / Filtering
-- ====================================================================

/*
Table: Tweets
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| tweet_id       | int     |
| content        | varchar |
+----------------+---------+
tweet_id is the primary key (column with unique values) for this table.
content consists of characters on an American Keyboard, and no hidden characters.
This table contains all the tweets in a social media app.

Question:
Write a solution to find the IDs of the invalid tweets. The tweet is invalid
if the number of characters used in the content of the tweet is strictly
greater than 15.

Return the result table in any order.

Example 1:
Input: 
Tweets table:
+----------+-----------------------------------+
| tweet_id | content                           |
+----------+-----------------------------------+
| 1        | Let us Code                       |
| 2        | More than fifteen chars are here! |
+----------+-----------------------------------+
Output: 
+----------+
| tweet_id |
+----------+
| 2        |
+----------+
Explanation: 
Tweet 1 has length = 11. It is a valid tweet.
Tweet 2 has length = 33. It is an invalid tweet.
*/

-- ====================================================================
-- Solution: Filter WHERE CHAR_LENGTH(content) > 15 (or LENGTH(content) > 15)
-- Time Complexity: O(N) where N is number of rows in Tweets
-- Space Complexity: O(1)
-- ====================================================================

SELECT 
    tweet_id
FROM 
    Tweets
WHERE 
    CHAR_LENGTH(content) > 15;
