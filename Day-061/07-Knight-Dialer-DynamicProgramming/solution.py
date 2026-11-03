r"""
LeetCode 935: Knight Dialer (Medium)
https://leetcode.com/problems/knight-dialer/

The chess knight has a unique movement, it may move two squares vertically and one square
horizontally, or two squares horizontally and one square vertically (with both forming
the shape of an L). The possible movements of chess knight on a phone pad are shown below:

1 2 3
4 5 6
7 8 9
* 0 #

We have a chess knight and a phone pad as shown above, the knight can only stand on a numeric cell (i.e. 0-9).
Given an integer n, return how many distinct phone numbers of length n we can dial.
You are allowed to place the knight on any numeric cell initially.

Since the answer may be very large, return the answer modulo 10^9 + 7.

Example 1:
Input: n = 1
Output: 10
Explanation: We can dial any single-digit number (0-9).

Example 2:
Input: n = 2
Output: 20
Explanation: All possible numbers are [04, 06, 16, 18, 27, 29, 34, 38, 40, 43, 49, 60, 61, 67, 72, 76, 81, 83, 92, 94]

Example 3:
Input: n = 3
Output: 46

Constraints:
- 1 <= n <= 5000
"""


class Solution:
    def knightDialer(self, n: int) -> int:
        """
        Dynamic Programming over the knight transition graph:
        At step 1 (n=1), there is 1 path starting at each digit (0-9).
        At each subsequent step, the number of paths of length k ending at digit d
        equals the sum of paths of length k-1 ending at all knight neighbors of d.

        Time Complexity: O(n * 10) = O(n)
        Space Complexity: O(1) using two DP arrays of length 10
        """
        MOD = 10**9 + 7

        # Undirected adjacency list of knight moves on the keypad
        moves = {
            0: [4, 6],
            1: [6, 8],
            2: [7, 9],
            3: [4, 8],
            4: [0, 3, 9],
            5: [],
            6: [0, 1, 7],
            7: [2, 6],
            8: [1, 3],
            9: [2, 4],
        }

        dp = [1] * 10

        for _ in range(n - 1):
            next_dp = [0] * 10
            for digit in range(10):
                next_dp[digit] = sum(dp[prev] for prev in moves[digit]) % MOD
            dp = next_dp

        return sum(dp) % MOD


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: n = 1 -> 10
    assert sol.knightDialer(1) == 10, "Test 1 Failed"

    # Test Case 2: n = 2 -> 20
    assert sol.knightDialer(2) == 20, "Test 2 Failed"

    # Test Case 3: n = 3 -> 46
    assert sol.knightDialer(3) == 46, "Test 3 Failed"

    # Test Case 4: n = 4 -> 104
    assert sol.knightDialer(4) == 104, "Test 4 Failed"

    # Test Case 5: n = 5 -> 240
    assert sol.knightDialer(5) == 240, "Test 5 Failed"

    # Test Case 6: n = 50 -> 267287516
    assert sol.knightDialer(50) == 267287516, "Test 6 Failed"

    print("All Knight Dialer tests passed successfully!")
