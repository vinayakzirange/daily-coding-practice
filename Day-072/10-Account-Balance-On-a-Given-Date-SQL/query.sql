-- Problem: Account Balance On a Given Date (LeetCode 2066)
-- Difficulty: Medium
-- Category: Database / SQL / Window Functions / Cumulative Sum

/*
Table: Transactions
+-------------+------+
| Column Name | Type |
+-------------+------+
| account_id  | int  |
| day         | date |
| type        | ENUM |
| amount      | int  |
+-------------+------+
(account_id, day) is the primary key for this table.
Each row contains transaction details: account_id, day, transaction type ('Deposit', 'Withdraw'),
and transaction amount.

Problem Statement:
Write an SQL query to report the balance of each user after each transaction.
You may assume that the balance of each account is 0 before the first transaction.
Return the result table ordered by account_id and day in ascending order.

Example Output:
+------------+------------+---------+
| account_id | day        | balance |
+------------+------------+---------+
| 1          | 2021-11-07 | 2000    |
| 1          | 2021-11-09 | 1000    |
| 1          | 2021-11-11 | 4000    |
| 2          | 2021-12-07 | 7000    |
| 2          | 2021-12-12 | 0       |
+------------+------------+---------+
*/

-- ----------------- Schema Setup -----------------
CREATE TABLE IF NOT EXISTS Transactions (
    account_id INT,
    day DATE,
    type VARCHAR(10) CHECK (type IN ('Deposit', 'Withdraw')),
    amount INT,
    PRIMARY KEY (account_id, day)
);

-- ----------------- Sample Data -----------------
TRUNCATE TABLE Transactions;
INSERT INTO Transactions (account_id, day, type, amount) VALUES
(1, '2021-11-07', 'Deposit', 2000),
(1, '2021-11-09', 'Withdraw', 1000),
(1, '2021-11-11', 'Deposit', 3000),
(2, '2021-12-07', 'Deposit', 7000),
(2, '2021-12-12', 'Withdraw', 7000);

-- ----------------- Solution Query (Window Function SUM OVER) -----------------
SELECT
    account_id,
    day,
    SUM(
        CASE
            WHEN type = 'Deposit' THEN amount
            ELSE -amount
        END
    ) OVER (
        PARTITION BY account_id
        ORDER BY day ASC
    ) AS balance
FROM Transactions
ORDER BY
    account_id ASC,
    day ASC;
