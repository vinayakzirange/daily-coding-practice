-- ====================================================================
-- Problem: Customer Placing the Largest Number of Orders (LeetCode 586)
-- Difficulty: Easy / Medium Practice
-- Topic: Database, SQL, Aggregation, Sorting
-- ====================================================================

/*
Table: Orders
+-----------------+----------+
| Column Name     | Type     |
+-----------------+----------+
| order_number    | int      |
| customer_number | int      |
+-----------------+----------+
order_number is the primary key (column with unique values) for this table.
This table contains information about the order ID and the customer ID.

Write a solution to find the customer_number for the customer who has
placed the largest number of orders.

The test cases are generated so that exactly one customer will have
placed more orders than any other customer.

Example 1:
Input: 
Orders table:
+--------------+-----------------+
| order_number | customer_number |
+--------------+-----------------+
| 1            | 1               |
| 2            | 2               |
| 3            | 3               |
| 4            | 3               |
+--------------+-----------------+
Output: 
+-----------------+
| customer_number |
+-----------------+
| 3               |
+-----------------+
Explanation: 
The customer with number 3 has two orders, which is greater than
either customer 1 or 2 because each of them only has one order. 
So result is customer_number 3.
*/

-- ====================================================================
-- Solution: GROUP BY customer_number, ORDER BY COUNT(*) DESC, LIMIT 1
-- Time Complexity: O(N log N) or O(N) where N is number of rows in Orders
-- Space Complexity: O(C) where C is number of distinct customers
-- ====================================================================

SELECT
    customer_number
FROM
    Orders
GROUP BY
    customer_number
ORDER BY
    COUNT(*) DESC
LIMIT 1;
