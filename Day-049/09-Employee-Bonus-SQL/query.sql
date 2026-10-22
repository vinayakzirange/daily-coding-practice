-- ====================================================================
-- Problem: Employee Bonus (LeetCode 577)
-- Difficulty: Easy / Medium Practice
-- Topic: SQL / LEFT JOIN / Filtering / NULL Handling
-- ====================================================================

/*
Table: Employee
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| empId       | int     |
| name        | varchar |
| supervisor  | int     |
| salary      | int     |
+-------------+---------+
empId is the column with unique values for this table.
Each row of this table indicates the name and the ID of an employee in
addition to their salary and the id of their manager.

Table: Bonus
+-------------+------+
| Column Name | Type |
+-------------+------+
| empId       | int  |
| bonus       | int  |
+-------------+------+
empId is the column of unique values for this table.
empId is a foreign key (reference column) to empId from the Employee table.
Each row of this table contains the id of an employee and their respective bonus.

Question:
Write a solution to report the name and bonus amount of each employee with
a bonus less than 1000.

Return the result table in any order.

Example 1:
Input: 
Employee table:
+-------+--------+------------+--------+
| empId | name   | supervisor | salary |
+-------+--------+------------+--------+
| 3     | Brad   | null       | 4000   |
| 1     | John   | 3          | 1000   |
| 2     | Dan    | 3          | 2000   |
| 4     | Thomas | 3          | 4000   |
+-------+--------+------------+--------+
Bonus table:
+-------+-------+
| empId | bonus |
+-------+-------+
| 2     | 500   |
| 4     | 2000  |
+-------+-------+
Output: 
+------+-------+
| name | bonus |
+------+-------+
| Brad | null  |
| John | null  |
| Dan  | 500   |
+------+-------+
Explanation: 
- Brad and John do not receive a bonus (bonus IS NULL), so they qualify.
- Dan receives a bonus of 500 (< 1000), so he qualifies.
- Thomas receives a bonus of 2000 (>= 1000), so he does not qualify.
*/

-- ====================================================================
-- Solution:
-- LEFT JOIN Employee with Bonus on empId.
-- Filter WHERE bonus < 1000 OR bonus IS NULL.
-- Time Complexity: O(E + B) where E = Employee count, B = Bonus count
-- Space Complexity: O(E)
-- ====================================================================

SELECT 
    e.name,
    b.bonus
FROM 
    Employee e
LEFT JOIN 
    Bonus b 
    ON e.empId = b.empId
WHERE 
    b.bonus < 1000 
    OR b.bonus IS NULL;
