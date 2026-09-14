-- Problem: Group Sold Products By The Date
-- Topic: SQL / GROUP_CONCAT / GROUP BY
-- Language: SQL
--
-- Approach:
-- Group by sell_date, count distinct product names, and concatenate distinct product names
-- lexicographically separated by commas using GROUP_CONCAT.

SELECT 
    sell_date,
    COUNT(DISTINCT product) AS num_sold,
    GROUP_CONCAT(DISTINCT product ORDER BY product ASC SEPARATOR ',') AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;
