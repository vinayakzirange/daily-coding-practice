-- Problem: Nth Highest Salary Stored Function
-- Topic: SQL / Stored Function / DENSE_RANK / LIMIT OFFSET
-- Language: SQL
--
-- Approach:
-- Create a function getNthHighestSalary(N) that sets M = N - 1 and selects distinct salary
-- ordered by salary DESC with LIMIT 1 OFFSET M.

CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
  DECLARE M INT;
  SET M = N - 1;
  RETURN (
      SELECT DISTINCT salary
      FROM Employee
      ORDER BY salary DESC
      LIMIT 1 OFFSET M
  );
END;
