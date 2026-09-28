-- Problem: Friend Requests I: Overall Acceptance Rate (LeetCode 597)
-- Language: SQL
-- Difficulty: Easy / Medium

SELECT 
    ROUND(
        IFNULL(
            (SELECT COUNT(DISTINCT requester_id, accepter_id) FROM RequestAccepted) /
            (SELECT COUNT(DISTINCT sender_id, send_to_id) FROM FriendRequest),
            0
        ),
        2
    ) AS accept_rate;
