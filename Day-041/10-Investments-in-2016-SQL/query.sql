-- ====================================================================
-- Problem: Investments in 2016 (LeetCode 585)
-- Difficulty: Medium
-- Topic: SQL / Subqueries / Window Functions / GROUP BY / HAVING / ROUND
-- ====================================================================

/*
Table: Insurance
+-------------+-------+
| Column Name | Type  |
+-------------+-------+
| pid         | int   |
| tiv_2015    | float |
| tiv_2016    | float |
| lat         | float |
| lon         | float |
+-------------+-------+
pid is the primary key column for this table.
Each row contains information about one policy:
- pid is the policyholder's policy ID.
- tiv_2015 is the total investment value in 2015.
- tiv_2016 is the total investment value in 2016.
- lat is the latitude of the policyholder's city. It's guaranteed that lat is not NULL.
- lon is the longitude of the policyholder's city. It's guaranteed that lon is not NULL.

Question:
Write a solution to report the sum of all total investment values in 2016 tiv_2016
for all policyholders who:
1. Have the same tiv_2015 value as one or more other policyholders, and
2. Are not located in the same city as any other policyholder (i.e., the (lat, lon)
   attribute pairs must be unique).

Round tiv_2016 to two decimal places.

Example 1:
Input: 
Insurance table:
+-----+----------+----------+-----+-----+
| pid | tiv_2015 | tiv_2016 | lat | lon |
+-----+----------+----------+-----+-----+
| 1   | 10       | 5        | 10  | 10  |
| 2   | 20       | 20       | 20  | 20  |
| 3   | 10       | 30       | 20  | 20  |
| 4   | 10       | 40       | 40  | 40  |
+-----+----------+----------+-----+-----+
Output: 
+----------+
| tiv_2016 |
+----------+
| 45.00    |
+----------+
Explanation: 
The first record in the table, like the last record, meets both of the two criteria.
The tiv_2015 value 10 is the same as the third and fourth records, and its location is unique.
The second record does not meet any of the two criteria. Its tiv_2015 is not like any other policyholders and its location is also not unique.
The third record's tiv_2015 is the same as the first and fourth records, but its location is not unique.
So, the result is the sum of tiv_2016 of the first and fourth record: 5 + 40 = 45.
*/

-- Solution 1: Using Subqueries with GROUP BY and HAVING
SELECT 
    ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM 
    Insurance
WHERE 
    tiv_2015 IN (
        SELECT 
            tiv_2015
        FROM 
            Insurance
        GROUP BY 
            tiv_2015
        HAVING 
            COUNT(*) > 1
    )
    AND (lat, lon) IN (
        SELECT 
            lat, 
            lon
        FROM 
            Insurance
        GROUP BY 
            lat, 
            lon
        HAVING 
            COUNT(*) = 1
    );

/*
-- Alternative Solution 2: Using Window Functions (COUNT OVER)
SELECT 
    ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM (
    SELECT 
        tiv_2016,
        COUNT(*) OVER (PARTITION BY tiv_2015) AS cnt_tiv,
        COUNT(*) OVER (PARTITION BY lat, lon) AS cnt_loc
    FROM 
        Insurance
) sub
WHERE 
    cnt_tiv > 1 
    AND cnt_loc = 1;
*/
