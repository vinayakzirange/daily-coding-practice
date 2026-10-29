-- ====================================================================
-- Problem: Employees Whose Manager Left the Company (LeetCode 1978)
-- Difficulty: Easy / Medium Practice
-- Topic: Database, SQL, Subquery, Filtering, Sorting
-- ====================================================================

/*
Table: Employees
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| employee_id   | int     |
| name          | varchar |
| manager_id    | int     |
| salary        | int     |
+---------------+---------+
employee_id is the primary key (column with unique values) for this table.
This table contains information about the employees, their salary, and the
ID of their manager. Some employees do not have a manager (manager_id is null). 

Find the IDs of the employees whose salary is strictly less than $30000
and whose manager left the company. When a manager leaves the company,
their information is deleted from the Employees table, but the reports
still have their manager_id set to the manager who left.

Return the result table ordered by employee_id.

Example 1:
Input:  
Employees table:
+-------------+----------+------------+--------+
| employee_id | name     | manager_id | salary |
+-------------+----------+------------+--------+
| 3           | Mila     | 9          | 60301  |
| 12          | Antonella| null       | 31000  |
| 13          | Emery    | null       | 67084  |
| 1           | Kalel    | 11         | 21241  |
| 9           | Mikaela  | null       | 50937  |
| 11          | Joziah   | 6          | 28485  |
+-------------+----------+------------+--------+
Output: 
+-------------+
| employee_id |
+-------------+
| 11          |
+-------------+
Explanation: 
The employees with a salary under $30000 are 1 (salary 21241) and 11 (salary 28485).
Manager 11 is in the table (employee 11), so employee 1's manager did not leave.
Manager 6 is NOT in the table (manager left the company), so employee 11 qualifies.
*/

-- ====================================================================
-- Solution: Filter salary < 30000 AND manager_id NOT IN (active employee_ids)
-- Time Complexity: O(N) with Hash Set or Subquery lookup
-- Space Complexity: O(N)
-- ====================================================================

SELECT
    employee_id
FROM
    Employees
WHERE
    salary < 30000
    AND manager_id IS NOT NULL
    AND manager_id NOT IN (
        SELECT employee_id FROM Employees
    )
ORDER BY
    employee_id;
