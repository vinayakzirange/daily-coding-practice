-- LeetCode 1098: Unpopular Books (Medium)
-- https://leetcode.com/problems/unpopular-books/
--
-- Table: Books
-- +----------------+---------+
-- | Column Name    | Type    |
-- +----------------+---------+
-- | book_id        | int     |
-- | name           | varchar |
-- | available_from | date    |
-- +----------------+---------+
-- book_id is the primary key of this table.
--
-- Table: Orders
-- +----------------+---------+
-- | Column Name    | Type    |
-- +----------------+---------+
-- | order_id       | int     |
-- | book_id        | int     |
-- | quantity       | int     |
-- | dispatch_date  | date    |
-- +----------------+---------+
-- order_id is the primary key of this table.
-- book_id is a foreign key to the Books table.
--
-- Write an SQL query that reports the books that have sold less than 10 copies
-- in the last year, excluding books that have been available for less than one
-- month from today. Assume today is 2019-06-23.
-- Return the result table in any order.

SELECT 
    b.book_id,
    b.name
FROM Books b
LEFT JOIN Orders o 
    ON b.book_id = o.book_id 
    AND o.dispatch_date BETWEEN '2018-06-23' AND '2019-06-23'
WHERE 
    b.available_from < '2019-05-23'
GROUP BY 
    b.book_id, 
    b.name
HAVING 
    COALESCE(SUM(o.quantity), 0) < 10;

