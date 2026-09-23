-- Problem: Immediate Food Delivery II
-- Topic: SQL / Subquery / FIRST_VALUE / ROUND / AVG
-- Language: SQL
--
-- Approach:
-- Find first order date for each customer. Calculate percentage of immediate first orders
-- (order_date = customer_pref_delivery_date) rounded to 2 decimal places.

SELECT 
    ROUND(
        AVG(order_date = customer_pref_delivery_date) * 100, 
        2
    ) AS immediate_percentage
FROM Delivery
WHERE (customer_id, order_date) IN (
    SELECT customer_id, MIN(order_date)
    FROM Delivery
    GROUP BY customer_id
);
