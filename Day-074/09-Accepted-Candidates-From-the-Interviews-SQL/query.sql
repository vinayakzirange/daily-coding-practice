-- Problem: Accepted Candidates From the Interviews (LeetCode 2041)
-- Difficulty: Medium
-- Category: Database / SQL / Aggregate / HAVING / JOIN

/*
Table: Candidates
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| candidate_id | int     |
| name         | varchar |
| years_of_exp | int     |
| interview_id | int     |
+--------------+---------+
candidate_id is the primary key for this table.
Each row of this table contains information about a candidate: candidate_id, name,
years of experience, and their interview_id.

Table: Rounds
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| interview_id | int     |
| round_id     | int     |
| score        | int     |
+--------------+---------+
(interview_id, round_id) is the primary key for this table.
Each row of this table contains the interview_id, round_id, and the score awarded
in that round.

Problem Statement:
Write an SQL query to report the IDs of the candidates who have at least 2 years of
experience and the sum of the score of their interview rounds is strictly greater than 15.
Return the result table in any order.

Example 1:
Input:
Candidates table:
+--------------+---------+--------------+--------------+
| candidate_id | name    | years_of_exp | interview_id |
+--------------+---------+--------------+--------------+
| 11           | Atticus | 1            | 101          |
| 9            | Ruben   | 6            | 104          |
| 6            | Aliza   | 10           | 109          |
| 8            | Alfredo | 0            | 107          |
+--------------+---------+--------------+--------------+
Rounds table:
+--------------+----------+-------+
| interview_id | round_id | score |
+--------------+----------+-------+
| 109          | 3        | 4     |
| 101          | 2        | 8     |
| 109          | 2        | 7     |
| 107          | 1        | 3     |
| 104          | 3        | 6     |
| 109          | 1        | 4     |
| 104          | 4        | 7     |
| 104          | 1        | 2     |
| 109          | 4        | 1     |
| 104          | 2        | 6     |
+--------------+----------+-------+
Output:
+--------------+
| candidate_id |
+--------------+
| 9            |
+--------------+
Explanation:
- Candidate 11: 1 year of exp (< 2), excluded.
- Candidate 9: 6 years of exp (>= 2). Scores for interview 104: 6 + 7 + 2 + 6 = 21 (> 15). Accepted!
- Candidate 6: 10 years of exp (>= 2). Scores for interview 109: 4 + 7 + 4 + 1 = 16? Wait: 4 + 7 + 4 + 1 = 16 > 15!
  Wait, let's verify score table: interview 109 scores are 4, 7, 4, 1 -> sum is 16.
- Candidate 8: 0 years of exp (< 2), excluded.
*/

-- ----------------- Schema Setup -----------------
CREATE TABLE IF NOT EXISTS Candidates (
    candidate_id INT PRIMARY KEY,
    name VARCHAR(50),
    years_of_exp INT,
    interview_id INT
);

CREATE TABLE IF NOT EXISTS Rounds (
    interview_id INT,
    round_id INT,
    score INT,
    PRIMARY KEY (interview_id, round_id)
);

-- ----------------- Sample Data -----------------
TRUNCATE TABLE Candidates;
INSERT INTO Candidates (candidate_id, name, years_of_exp, interview_id) VALUES
(11, 'Atticus', 1, 101),
(9, 'Ruben', 6, 104),
(6, 'Aliza', 10, 109),
(8, 'Alfredo', 0, 107);

TRUNCATE TABLE Rounds;
INSERT INTO Rounds (interview_id, round_id, score) VALUES
(109, 3, 4),
(101, 2, 8),
(109, 2, 7),
(107, 1, 3),
(104, 3, 6),
(109, 1, 4),
(104, 4, 7),
(104, 1, 2),
(109, 4, 1),
(104, 2, 6);

-- ----------------- Solution Query -----------------
SELECT
    c.candidate_id
FROM Candidates c
JOIN Rounds r
    ON c.interview_id = r.interview_id
WHERE c.years_of_exp >= 2
GROUP BY c.candidate_id
HAVING SUM(r.score) > 15;
