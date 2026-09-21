-- Problem: Capital Gain/Loss
-- Topic: SQL / CASE WHEN / SUM / GROUP BY
-- Language: SQL
--
-- Approach:
-- Sum price values using CASE WHEN operation = 'Buy' THEN -price ELSE price END.
-- Group output by stock_name.

SELECT 
    stock_name,
    SUM(
        CASE 
            WHEN operation = 'Buy' THEN -price 
            ELSE price 
        END
    ) AS capital_gain_loss
FROM Stocks
GROUP BY stock_name;
