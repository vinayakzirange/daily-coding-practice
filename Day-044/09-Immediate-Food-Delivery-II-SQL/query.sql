-- ====================================================================
-- Problem: Immediate Food Delivery II (LeetCode 1174)
-- Difficulty: Medium
-- Topic: SQL / Subqueries / Aggregation / CASE WHEN / ROUND
-- ====================================================================

/*
Table: Delivery
+-----------------------------+---------+
| Column Name                 | Type    |
+-----------------------------+---------+
| delivery_id                 | int     |
| customer_id                 | int     |
| order_date                  | date    |
| customer_pref_delivery_date | date    |
+-----------------------------+---------+
delivery_id is the column of unique values of this table.
The table holds information about food delivery to customers that make orders
at some date and specify a preferred delivery date (on the same order date or after it).

If the customer's preferred delivery date is the same as the order date, then
the order is called immediate; otherwise, it is called scheduled.

The first order of a customer is the order with the earliest order date that
the customer made. It is guaranteed that a customer has precisely one first order.

Question:
Write a solution to find the percentage of immediate orders in the first orders
of all customers, rounded to 2 decimal places.

Example 1:
Input: 
Delivery table:
+-------------+-------------+------------+-----------------------------+
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
+-------------+-------------+------------+-----------------------------+
| 1           | 1           | 2019-08-01 | 2019-08-02                  |
| 2           | 2           | 2019-08-02 | 2019-08-02                  |
| 3           | 1           | 2019-08-11 | 2019-08-12                  |
| 4           | 3           | 2019-08-24 | 2019-08-24                  |
| 5           | 3           | 2019-08-21 | 2019-08-22                  |
| 6           | 2           | 2019-08-11 | 2019-08-13                  |
| 7           | 4           | 2019-08-09 | 2019-08-09                  |
+-------------+-------------+------------+-----------------------------+
Output: 
+----------------------+
| immediate_percentage |
+----------------------+
| 50.00                |
+----------------------+
Explanation: 
- Customer 1: first order is delivery_id 1 (scheduled).
- Customer 2: first order is delivery_id 2 (immediate).
- Customer 3: first order is delivery_id 5 (scheduled).
- Customer 4: first order is delivery_id 7 (immediate).
Total 4 customers: 2 immediate out of 4 = 50.00%
*/

-- Solution: Using Subquery to filter to customer's first orders
SELECT 
    ROUND(
        100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*),
        2
    ) AS immediate_percentage
FROM 
    Delivery
WHERE 
    (customer_id, order_date) IN (
        SELECT 
            customer_id, 
            MIN(order_date)
        FROM 
            Delivery
        GROUP BY 
            customer_id
    );
