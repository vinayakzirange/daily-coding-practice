-- Problem: Orders With Maximum Quantity Above Average (LeetCode 1867)
-- Difficulty: Medium
-- Category: Database / SQL / Aggregate / HAVING / Subquery

/*
Table: OrderDetails
+-------------+------+
| Column Name | Type |
+-------------+------+
| order_id    | int  |
| item_id     | int  |
| quantity    | int  |
+-------------+------+
(order_id, item_id) is the primary key for this table.
Each row contains information about the order id, item id, and quantity of an item ordered.

Problem Statement:
The average quantity of an order is calculated as:
    (total quantity of items in order) / (number of different items in order).
The maximum quantity of an order is the maximum quantity of any single item in the order.

Write an SQL query to report the order_id of all orders whose maximum quantity is
strictly greater than the maximum average quantity among all orders.
Return the result table in any order.

Example 1:
Input:
OrderDetails table:
+----------+---------+----------+
| order_id | item_id | quantity |
+----------+---------+----------+
| 1        | 1       | 12       |
| 1        | 2       | 10       |
| 1        | 3       | 15       |
| 2        | 1       | 8        |
| 2        | 2       | 4        |
| 2        | 3       | 6        |
| 3        | 1       | 5        |
| 3        | 2       | 18       |
| 4        | 1       | 2        |
| 4        | 2       | 3        |
| 4        | 3       | 2        |
| 5        | 1       | 2        |
| 5        | 2       | 3        |
+----------+---------+----------+
Output:
+----------+
| order_id |
+----------+
| 1        |
| 3        |
+----------+
Explanation:
- Order 1: avg = (12 + 10 + 15) / 3 = 12.33, max = 15
- Order 2: avg = (8 + 4 + 6) / 3 = 6.0, max = 8
- Order 3: avg = (5 + 18) / 2 = 11.5, max = 18
- Order 4: avg = (2 + 3 + 2) / 3 = 2.33, max = 3
- Order 5: avg = (2 + 3) / 2 = 2.5, max = 3

The maximum average quantity among all orders is 12.33 (Order 1).
Orders whose MAX quantity is strictly greater than 12.33:
- Order 1: max quantity = 15 > 12.33
- Order 3: max quantity = 18 > 12.33
Result: [1, 3].
*/

-- ----------------- Schema Setup -----------------
CREATE TABLE IF NOT EXISTS OrderDetails (
    order_id INT,
    item_id INT,
    quantity INT,
    PRIMARY KEY (order_id, item_id)
);

-- ----------------- Sample Data -----------------
TRUNCATE TABLE OrderDetails;
INSERT INTO OrderDetails (order_id, item_id, quantity) VALUES
(1, 1, 12),
(1, 2, 10),
(1, 3, 15),
(2, 1, 8),
(2, 2, 4),
(2, 3, 6),
(3, 1, 5),
(3, 2, 18),
(4, 1, 2),
(4, 2, 3),
(4, 3, 2),
(5, 1, 2),
(5, 2, 3);

-- ----------------- Solution Query -----------------
SELECT
    order_id
FROM OrderDetails
GROUP BY
    order_id
HAVING MAX(quantity) > (
    SELECT MAX(avg_qty)
    FROM (
        SELECT AVG(quantity) AS avg_qty
        FROM OrderDetails
        GROUP BY order_id
    ) AS OrderAverages
);
