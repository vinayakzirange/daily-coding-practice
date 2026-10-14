-- ====================================================================
-- Problem: Customers Who Bought All Products (LeetCode 1045)
-- Difficulty: Medium
-- Topic: SQL / GROUP BY / HAVING / COUNT(DISTINCT) / Subquery
-- ====================================================================

/*
Table: Customer
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| customer_id | int     |
| product_key | int     |
+-------------+---------+
This table may contain duplicate rows.
customer_id is not NULL.
product_key is a foreign key to Product table.

Table: Product
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| product_key | int     |
+-------------+---------+
product_key is the primary key (column with unique values) for this table.

Question:
Write a solution to report the customer ids from the Customer table that
bought all the products in the Product table.

Return the result table in any order.

Example 1:
Input: 
Customer table:
+-------------+-------------+
| customer_id | product_key |
+-------------+-------------+
| 1           | 5           |
| 2           | 6           |
| 3           | 5           |
| 3           | 6           |
| 1           | 6           |
+-------------+-------------+
Product table:
+-------------+
| product_key |
+-------------+
| 5           |
| 6           |
+-------------+
Output: 
+-------------+
| customer_id |
+-------------+
| 1           |
| 3           |
+-------------+
Explanation: 
The customers who bought all the products (5 and 6) are customers 1 and 3.
*/

-- Solution: Using GROUP BY and HAVING COUNT(DISTINCT product_key)
SELECT 
    customer_id
FROM 
    Customer
GROUP BY 
    customer_id
HAVING 
    COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);
