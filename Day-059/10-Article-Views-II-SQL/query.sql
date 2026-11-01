-- LeetCode 1149: Article Views II (Medium)
-- https://leetcode.com/problems/article-views-ii/
--
-- Table: Views
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | article_id    | int     |
-- | author_id     | int     |
-- | viewer_id     | int     |
-- | view_date     | date    |
-- +---------------+---------+
-- There is no primary key for this table, it may have duplicate rows.
-- Each row of this table indicates that some viewer viewed an article
-- (written by some author) on some date.
--
-- Write an SQL query to find all the people who viewed more than one article
-- on the same date.
-- Return the result table sorted by id in ascending order.

SELECT DISTINCT 
    viewer_id AS id
FROM Views
GROUP BY 
    view_date, 
    viewer_id
HAVING 
    COUNT(DISTINCT article_id) > 1
ORDER BY 
    id ASC;
