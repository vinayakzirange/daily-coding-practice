-- ====================================================================
-- Problem: Patients With a Condition (LeetCode 1527)
-- Difficulty: Easy / Medium Practice
-- Topic: Database, SQL, String Pattern Matching, Regex / LIKE
-- ====================================================================

/*
Table: Patients
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| patient_id   | int     |
| patient_name | varchar |
| conditions   | varchar |
+--------------+---------+
patient_id is the primary key (column with unique values) for this table.
conditions contains 0 or more code separated by spaces.
This table contains information of the patients in the hospital.

Write a solution to find the patient_id, patient_name, and conditions of
the patients who have Type I Diabetes. Type I Diabetes always starts with
prefix DIAB1.

Return the result table in any order.

Example 1:
Input: 
Patients table:
+------------+--------------+--------------+
| patient_id | patient_name | conditions   |
+------------+--------------+--------------+
| 1          | Daniel       | YFEV COUGH   |
| 2          | Alice        |              |
| 3          | Bob          | DIAB100 MYOP |
| 4          | George       | ACNE DIAB100 |
| 5          | Alain        | DIAB201      |
+------------+--------------+--------------+
Output: 
+------------+--------------+--------------+
| patient_id | patient_name | conditions   |
+------------+--------------+--------------+
| 3          | Bob          | DIAB100 MYOP |
| 4          | George       | ACNE DIAB100 | 
+------------+--------------+--------------+
Explanation: 
Bob and George both have a condition that starts with DIAB1.
*/

-- ====================================================================
-- Solution: Match prefix at start of string or preceded by space
-- Time Complexity: O(N) where N is number of patient records
-- Space Complexity: O(R) where R is number of matching records
-- ====================================================================

SELECT
    patient_id,
    patient_name,
    conditions
FROM
    Patients
WHERE
    conditions LIKE 'DIAB1%'
    OR conditions LIKE '% DIAB1%';
