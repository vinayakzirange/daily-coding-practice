-- Problem: Countries You Can Safely Invest In (LeetCode 1501)
-- Difficulty: Medium
-- Language: SQL (MySQL)

/*
Table: Person
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| id             | int     |
| name           | varchar |
| phone_number   | varchar |
+----------------+---------+
id is the column of unique values for this table.
phone_number format: "xxx-yyyyyyy" where xxx is 3-digit country code.

Table: Country
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| name           | varchar |
| country_code   | varchar |
+----------------+---------+
country_code is the column of unique values for this table.

Table: Calls
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| caller_id      | int     |
| callee_id      | int     |
| duration       | int     |
+----------------+---------+

Find countries where the average call duration of its people is strictly greater
than the global average call duration. Return the result table in any order.
*/

SELECT 
    c.name AS country
FROM Person p
INNER JOIN Country c 
    ON SUBSTRING(p.phone_number, 1, 3) = c.country_code
INNER JOIN (
    SELECT caller_id AS person_id, duration FROM Calls
    UNION ALL
    SELECT callee_id AS person_id, duration FROM Calls
) call_records 
    ON p.id = call_records.person_id
GROUP BY 
    c.name
HAVING 
    AVG(call_records.duration) > (SELECT AVG(duration) FROM Calls);

