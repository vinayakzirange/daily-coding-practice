-- Problem: Second Highest Salary (LeetCode 176)
-- Language: SQL
-- Difficulty: Medium

SELECT (
    SELECT DISTINCT salary
    FROM Employee
    ORDER BY salary DESC
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;
