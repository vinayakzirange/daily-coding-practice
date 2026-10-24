-- ====================================================================
-- Problem: Customer Who Visited but Did Not Make Any Transactions (LeetCode 1581)
-- Difficulty: Easy / Medium Practice
-- Topic: SQL / LEFT JOIN / Filtering / Aggregation / COUNT / GROUP BY
-- ====================================================================

/*
Table: Visits
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| visit_id    | int     |
| customer_id | int     |
+-------------+---------+
visit_id is the column with unique values for this table.
This table contains information about the customers who visited the mall.

Table: Transactions
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| transaction_id | int     |
| visit_id       | int     |
| amount         | int     |
+----------------+---------+
transaction_id is the column with unique values for this table.
This table contains information about the transactions made during the visit_id.

Question:
Write a solution to find the IDs of the users who visited without making
any transactions and the number of times they made these types of visits.

Return the result table sorted in any order.

Example 1:
Input: 
Visits
+----------+-------------+
| visit_id | customer_id |
+----------+-------------+
| 1        | 23          |
| 2        | 9           |
| 4        | 30          |
| 5        | 54          |
| 6        | 96          |
| 7        | 54          |
| 8        | 54          |
+----------+-------------+
Transactions
+----------------+----------+--------+
| transaction_id | visit_id | amount |
+----------------+----------+--------+
| 2              | 5        | 310    |
| 3              | 5        | 300    |
| 9              | 5        | 200    |
| 12             | 1        | 910    |
| 13             | 2        | 970    |
+----------------+----------+--------+
Output: 
+-------------+----------------+
| customer_id | count_no_trans |
+-------------+----------------+
| 54          | 2              |
| 30          | 1              |
| 96          | 1              |
+-------------+----------------+
Explanation: 
- Customer 23 visited once and made 1 transaction.
- Customer 9 visited once and made 1 transaction.
- Customer 30 visited once and made no transactions.
- Customer 54 visited 3 times (visit_ids 5, 7, 8). In visit 5 they bought 3 items,
  in visits 7 and 8 they bought nothing. So 2 visits without transactions.
- Customer 96 visited once and made no transactions.
*/

-- ====================================================================
-- Solution:
-- LEFT JOIN Visits with Transactions on visit_id.
-- Filter WHERE t.transaction_id IS NULL.
-- GROUP BY customer_id and COUNT(*).
-- Time Complexity: O(V + T) where V is visits count, T is transactions count
-- Space Complexity: O(V)
-- ====================================================================

SELECT 
    v.customer_id,
    COUNT(v.visit_id) AS count_no_trans
FROM 
    Visits v
LEFT JOIN 
    Transactions t 
    ON v.visit_id = t.visit_id
WHERE 
    t.transaction_id IS NULL
GROUP BY 
    v.customer_id;
