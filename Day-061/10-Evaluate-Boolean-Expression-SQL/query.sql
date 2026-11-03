-- LeetCode 1440: Evaluate Boolean Expression (Medium)
-- https://leetcode.com/problems/evaluate-boolean-expression/
--
-- Table: Variables
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | name          | varchar |
-- | value         | int     |
-- +---------------+---------+
-- name is the primary key for this table.
--
-- Table: Expressions
-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | left_operand  | varchar |
-- | operator      | enum    |
-- | right_operand | varchar |
-- +---------------+---------+
-- (left_operand, operator, right_operand) is the primary key for this table.
-- Some values of operator are ('<', '>', '=')
--
-- Write an SQL query to evaluate the boolean expressions in Expressions table.
-- Return the result table in any order.

SELECT 
    e.left_operand,
    e.operator,
    e.right_operand,
    CASE 
        WHEN e.operator = '>' AND v1.value > v2.value THEN 'true'
        WHEN e.operator = '<' AND v1.value < v2.value THEN 'true'
        WHEN e.operator = '=' AND v1.value = v2.value THEN 'true'
        ELSE 'false'
    END AS value
FROM Expressions e
JOIN Variables v1 
    ON e.left_operand = v1.name
JOIN Variables v2 
    ON e.right_operand = v2.name;

