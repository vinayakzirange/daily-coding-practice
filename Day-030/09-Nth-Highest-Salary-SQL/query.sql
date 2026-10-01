-- Problem: Nth Highest Salary (LeetCode 177)
-- Language: SQL
-- Difficulty: Medium

CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  SET N = N - 1;
  RETURN (
      SELECT DISTINCT salary
      FROM Employee
      ORDER BY salary DESC
      LIMIT 1 OFFSET N
  );
END;
