-- Problem: Rearrange Products Table
-- Topic: SQL / UNPIVOT / UNION
-- Language: SQL
--
-- Approach:
-- Transform columns (store1, store2, store3) into rows using UNION ALL,
-- filtering out NULL prices.

SELECT product_id, 'store1' AS store, store1 AS price
FROM Products
WHERE store1 IS NOT NULL

UNION ALL

SELECT product_id, 'store2' AS store, store2 AS price
FROM Products
WHERE store2 IS NOT NULL

UNION ALL

SELECT product_id, 'store3' AS store, store3 AS price
FROM Products
WHERE store3 IS NOT NULL;
