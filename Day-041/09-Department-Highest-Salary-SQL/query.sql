-- ====================================================================
-- Problem: Department Highest Salary (LeetCode 184)
-- Difficulty: Medium
-- Topic: SQL / JOIN / Subquery / Window Function (DENSE_RANK) / Aggregation
-- ====================================================================

/*
Table: Employee
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+
id is the primary key for this table.
departmentId is a foreign key to id in the Department table.
Each row of this table indicates the ID, name, and salary of an employee,
along with the ID of their department.

Table: Department
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id is the primary key for this table.
Each row of this table indicates the ID and name of a department.

Question:
Write a solution to find employees who have the highest salary in each of the departments.
Return the result table in any order.

Example 1:
Input: 
Employee table:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |
+----+-------+--------+--------------+
Department table:
+----+-------+
| id | name  |
+----+-------+
| 1  | IT    |
| 2  | Sales |
+----+-------+
Output: 
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Jim      | 90000  |
| Sales      | Henry    | 80000  |
| IT         | Max      | 90000  |
+------------+----------+--------+
Explanation: Max and Jim both have the highest salary in the IT department,
and Henry has the highest salary in the Sales department.
*/

-- Solution 1: Using Subquery with IN condition
SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary
FROM 
    Employee e
JOIN 
    Department d 
    ON e.departmentId = d.id
WHERE 
    (e.departmentId, e.salary) IN (
        SELECT 
            departmentId, 
            MAX(salary)
        FROM 
            Employee
        GROUP BY 
            departmentId
    );

/*
-- Alternative Solution 2: Using Window Functions (DENSE_RANK)
WITH RankedEmployees AS (
    SELECT 
        e.name AS Employee,
        e.salary AS Salary,
        d.name AS Department,
        DENSE_RANK() OVER (
            PARTITION BY e.departmentId 
            ORDER BY e.salary DESC
        ) AS rnk
    FROM 
        Employee e
    JOIN 
        Department d 
        ON e.departmentId = d.id
)
SELECT 
    Department,
    Employee,
    Salary
FROM 
    RankedEmployees
WHERE 
    rnk = 1;
*/
