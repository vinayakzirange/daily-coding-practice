-- Problem: Investments in 2016
-- Topic: SQL / Subquery / COUNT OVER / Window Functions
-- Language: SQL
--
-- Approach:
-- Select SUM(tiv_2016) for policyholders whose tiv_2015 value is shared with at least one other policyholder,
-- AND whose location (lat, lon) is unique.

SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance
WHERE tiv_2015 IN (
    SELECT tiv_2015
    FROM Insurance
    GROUP BY tiv_2015
    HAVING COUNT(*) > 1
)
AND (lat, lon) IN (
    SELECT lat, lon
    FROM Insurance
    GROUP BY lat, lon
    HAVING COUNT(*) = 1
);
