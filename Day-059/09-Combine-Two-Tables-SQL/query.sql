-- LeetCode 175: Combine Two Tables
-- https://leetcode.com/problems/combine-two-tables/
--
-- Table: Person
-- +-------------+---------+
-- | Column Name | Type    |
-- +-------------+---------+
-- | personId    | int     |
-- | lastName    | varchar |
-- | firstName   | varchar |
-- +-------------+---------+
-- personId is the primary key column for this table.
--
-- Table: Address
-- +-------------+---------+
-- | Column Name | Type    |
-- +-------------+---------+
-- | addressId   | int     |
-- | personId    | int     |
-- | city        | varchar |
-- | state       | varchar |
-- +-------------+---------+
-- addressId is the primary key column for this table.
--
-- Write an SQL query to report the first name, last name, city, and state of each person
-- in the Person table. If the address of a personId is not present in the Address table,
-- report null instead.
-- Return the result table in any order.

SELECT 
    p.firstName,
    p.lastName,
    a.city,
    a.state
FROM Person p
LEFT JOIN Address a 
    ON p.personId = a.personId;
