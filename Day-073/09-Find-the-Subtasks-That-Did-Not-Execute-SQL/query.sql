-- Problem: Find the Subtasks That Did Not Execute (LeetCode 1767)
-- Difficulty: Medium / Hard-level Medium
-- Category: Database / SQL / Recursive CTE / Outer Join

/*
Table: Tasks
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| task_id        | int     |
| subtasks_count | int     |
+----------------+---------+
task_id is the primary key for this table.
Each row in this table indicates that task_id was divided into subtasks_count subtasks
from 1 to subtasks_count.

Table: Executed
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| task_id       | int     |
| subtask_id    | int     |
+---------------+---------+
(task_id, subtask_id) is the primary key for this table.
Each row indicates that for the task task_id, the subtask subtask_id was executed.
It is guaranteed that 1 <= subtask_id <= subtasks_count for each task_id.

Problem Statement:
Write an SQL query to report the IDs of the missing subtasks for each task_id
that were not executed.
Return the result table in any order.

Example 1:
Input:
Tasks table:
+---------+----------------+
| task_id | subtasks_count |
+---------+----------------+
| 1       | 3              |
| 2       | 2              |
| 3       | 4              |
+---------+----------------+
Executed table:
+---------+------------+
| task_id | subtask_id |
+---------+------------+
| 1       | 2          |
| 3       | 1          |
| 3       | 2          |
| 3       | 3          |
| 3       | 4          |
+---------+------------+
Output:
+---------+------------+
| task_id | subtask_id |
+---------+------------+
| 1       | 1          |
| 1       | 3          |
| 2       | 1          |
| 2       | 2          |
+---------+------------+
Explanation:
Task 1 was divided into 3 subtasks (1, 2, 3). Only subtask 2 was executed, so subtasks 1 and 3 are missing.
Task 2 was divided into 2 subtasks (1, 2). Zero subtasks were executed, so subtasks 1 and 2 are missing.
Task 3 was divided into 4 subtasks (1, 2, 3, 4). All were executed, so no missing subtasks.
*/

-- ----------------- Schema Setup -----------------
CREATE TABLE IF NOT EXISTS Tasks (
    task_id INT PRIMARY KEY,
    subtasks_count INT
);

CREATE TABLE IF NOT EXISTS Executed (
    task_id INT,
    subtask_id INT,
    PRIMARY KEY (task_id, subtask_id)
);

-- ----------------- Sample Data -----------------
TRUNCATE TABLE Tasks;
INSERT INTO Tasks (task_id, subtasks_count) VALUES
(1, 3),
(2, 2),
(3, 4);

TRUNCATE TABLE Executed;
INSERT INTO Executed (task_id, subtask_id) VALUES
(1, 2),
(3, 1),
(3, 2),
(3, 3),
(3, 4);

-- ----------------- Solution Query (Recursive CTE + LEFT JOIN) -----------------
WITH RECURSIVE SubtaskGenerator AS (
    -- Anchor member: initialize subtask 1 for every task
    SELECT
        task_id,
        subtasks_count,
        1 AS subtask_id
    FROM Tasks

    UNION ALL

    -- Recursive member: generate next subtask ID until reaching subtasks_count
    SELECT
        task_id,
        subtasks_count,
        subtask_id + 1
    FROM SubtaskGenerator
    WHERE subtask_id < subtasks_count
)
SELECT
    g.task_id,
    g.subtask_id
FROM SubtaskGenerator g
LEFT JOIN Executed e
    ON g.task_id = e.task_id
    AND g.subtask_id = e.subtask_id
WHERE e.subtask_id IS NULL
ORDER BY
    g.task_id ASC,
    g.subtask_id ASC;
