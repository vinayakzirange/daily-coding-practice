-- Problem: Drop Type 1 Orders for Customers With Type 0 Orders (LeetCode 2084)
-- Difficulty: Medium
-- Category: Database / SQL / Filtering / Subquery / Window Function

/*
Table: Orders
+-------------+------+
| Column Name | Type |
+-------------+------+
| order_id    | int  |
| customer_id | int  |
| order_type  | int  |
+-------------+------+
order_id is the primary key for this table.
Each row of this table contains the ID of an order, the ID of the customer who ordered it,
and the order type (which is either 0 or 1).

Problem Statement:
Write an SQL query to drop the type 1 orders for customers who have at least one type 0 order.
For customers who only have type 1 orders, keep their type 1 orders.
Return the result table in any order.

Example 1:
Input:
Orders table:
+----------+-------------+------------+
| order_id | customer_id | order_type |
+----------+-------------+------------+
| 1        | 1           | 0          |
| 2        | 1           | 0          |
| 11       | 2           | 0          |
| 12       | 2           | 1          |
| 21       | 3           | 1          |
| 22       | 3           | 1          |
| 31       | 4           | 1          |
| 32       | 4           | 1          |
+----------+-------------+------------+
Output:
+----------+-------------+------------+
| order_id | customer_id | order_type |
+----------+-------------+------------+
| 1        | 1           | 0          |
| 2        | 1           | 0          |
| 11       | 2           | 0          |
| 21       | 3           | 1          |
| 22       | 3           | 1          |
| 31       | 4           | 1          |
| 32       | 4           | 1          |
+----------+-------------+------------+
Explanation:
- Customer 1 only has type 0 orders: both orders 1 and 2 are kept.
- Customer 2 has both type 0 and type 1 orders: drop order 12 (type 1), keep order 11 (type 0).
- Customer 3 only has type 1 orders: keep orders 21 and 22.
- Customer 4 only has type 1 orders: keep orders 31 and 32.
*/

-- ----------------- Schema Setup -----------------
CREATE TABLE IF NOT EXISTS Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_type INT CHECK (order_type IN (0, 1))
);

-- ----------------- Sample Data -----------------
TRUNCATE TABLE Orders;
INSERT INTO Orders (order_id, customer_id, order_type) VALUES
(1, 1, 0),
(2, 1, 0),
(11, 2, 0),
(12, 2, 1),
(21, 3, 1),
(22, 3, 1),
(31, 4, 1),
(32, 4, 1);

-- ----------------- Solution Query (Approach 1: NOT IN Subquery) -----------------
SELECT
    order_id,
    customer_id,
    order_type
FROM Orders
WHERE order_type = 0
   OR customer_id NOT IN (
       SELECT DISTINCT customer_id
       FROM Orders
       WHERE order_type = 0
   );

-- ----------------- Alternative Solution (Approach 2: Window Function) -----------------
/*
WITH PartitionedOrders AS (
    SELECT
        order_id,
        customer_id,
        order_type,
        MIN(order_type) OVER (PARTITION BY customer_id) AS min_order_type
    FROM Orders
)
SELECT
    order_id,
    customer_id,
    order_type
FROM PartitionedOrders
WHERE order_type = min_order_type;
*/
