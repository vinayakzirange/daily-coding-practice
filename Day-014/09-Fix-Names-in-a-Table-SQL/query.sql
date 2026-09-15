-- Problem: Fix Names in a Table
-- Topic: SQL / String Manipulation / CONCAT / UPPER / LOWER
-- Language: SQL
--
-- Approach:
-- Capitalize the first character using UPPER(SUBSTR(name, 1, 1)) and convert remaining
-- characters to lowercase using LOWER(SUBSTR(name, 2)). Concatenate both parts.

SELECT 
    user_id,
    CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) AS name
FROM Users
ORDER BY user_id;
