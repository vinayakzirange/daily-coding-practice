-- Problem Name: Nth Highest Salary
-- Problem Statement: Write an SQL query to report the Nth highest salary from the Employee table.
-- If there is no Nth highest salary, the query should report null.
--
-- Schema:
-- Employee (id INT, salary INT)

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
