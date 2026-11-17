-- Problem: Find Cutoff Score for Each School (LeetCode 1988)
-- Difficulty: Medium
-- Category: Database / SQL / LEFT JOIN / Aggregation / COALESCE

/*
Table: Schools
+-------------+------+
| Column Name | Type |
+-------------+------+
| school_id   | int  |
| capacity    | int  |
+-------------+------+
school_id is the primary key for this table.
This table contains information about the capacity of each school.

Table: Exam
+---------------+------+
| Column Name   | Type |
+---------------+------+
| score         | int  |
| student_count | int  |
+---------------+------+
score is the primary key for this table.
Each row represents the number of students who obtained that score or higher on the exam.

Problem Statement:
Every year, each school announces a cutoff score:
1. The school wants to choose the minimum score such that the number of students
   admitted (student_count) does not exceed the school's capacity.
2. If there are multiple qualifying scores, the school chooses the minimum score.
3. If no score can satisfy the requirement, the school chooses -1.

Write an SQL query to report the cutoff score for each school.
Return the result table in any order.

Example 1:
Input:
Schools table:
+-----------+----------+
| school_id | capacity |
+-----------+----------+
| 11        | 151      |
| 5         | 17       |
| 9         | 9        |
| 10        | 99       |
+-----------+----------+
Exam table:
+-------+---------------+
| score | student_count |
+-------+---------------+
| 975   | 10            |
| 966   | 60            |
| 844   | 76            |
| 103   | 96            |
| 398   | 97            |
| 504   | 138           |
+-------+---------------+
Output:
+-----------+-------+
| school_id | score |
+-----------+-------+
| 11        | 504   |
| 5         | 975   |
| 9         | -1    |
| 10        | 103   |
+-----------+-------+
*/

-- ----------------- Schema Setup -----------------
CREATE TABLE IF NOT EXISTS Schools (
    school_id INT PRIMARY KEY,
    capacity INT
);

CREATE TABLE IF NOT EXISTS Exam (
    score INT PRIMARY KEY,
    student_count INT
);

-- ----------------- Sample Data -----------------
TRUNCATE TABLE Schools;
INSERT INTO Schools (school_id, capacity) VALUES
(11, 151),
(5, 17),
(9, 9),
(10, 99);

TRUNCATE TABLE Exam;
INSERT INTO Exam (score, student_count) VALUES
(975, 10),
(966, 60),
(844, 76),
(103, 96),
(398, 97),
(504, 138);

-- ----------------- Solution Query -----------------
SELECT
    s.school_id,
    COALESCE(MIN(e.score), -1) AS score
FROM Schools s
LEFT JOIN Exam e
    ON e.student_count <= s.capacity
GROUP BY
    s.school_id;
