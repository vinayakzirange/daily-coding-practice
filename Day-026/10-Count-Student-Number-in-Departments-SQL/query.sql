-- Problem: Count Student Number in Departments (LeetCode 580)
-- Language: SQL
-- Difficulty: Medium

SELECT 
    d.dept_name,
    COUNT(s.student_id) AS student_number
FROM department d
LEFT JOIN student s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
ORDER BY student_number DESC, d.dept_name ASC;
