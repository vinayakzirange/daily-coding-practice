"""
====================================================================
Problem: Ones and Zeroes (LeetCode 474)
Difficulty: Medium
Topic: Array, String, Dynamic Programming, 2D Knapsack
====================================================================

You are given an array of binary strings strs and two integers m and n.

Return the size of the largest subset of strs such that there are at
most m 0's and n 1's in the subset.

A set x is a subset of a set y if all elements of x are also elements
of y.

Example 1:
Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is
{"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, which is greater than n = 3.

Example 2:
Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.

Constraints:
- 1 <= strs.length <= 600
- 1 <= strs[i].length <= 100
- strs[i] consists only of digits '0' and '1'.
- 1 <= m, n <= 100
====================================================================
"""

from typing import List

class Solution:
    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:
        """
        2D 0/1 Knapsack Dynamic Programming:
        dp[i][j] represents max subset size using at most i zeros and j ones.
        For each string with count zeros z and ones o:
          iterate backwards from m down to z, and n down to o:
            dp[i][j] = max(dp[i][j], dp[i - z][j - o] + 1)

        Time Complexity: O(len(strs) * m * n)
        Space Complexity: O(m * n) using 2D space optimization
        """
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for s in strs:
            zeros = s.count('0')
            ones = len(s) - zeros

            # Iterate backwards to prevent using the same string multiple times
            for i in range(m, zeros - 1, -1):
                for j in range(n, ones - 1, -1):
                    dp[i][j] = max(dp[i][j], dp[i - zeros][j - ones] + 1)

        return dp[m][n]


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: strs = ["10","0001","111001","1","0"], m = 5, n = 3 -> 4
    s1 = ["10", "0001", "111001", "1", "0"]
    assert solver.findMaxForm(s1, 5, 3) == 4, "Test 1 failed"
    print(f"Test 1 Passed: {s1}, m=5, n=3 -> 4")

    # Test 2: strs = ["10","0","1"], m = 1, n = 1 -> 2
    s2 = ["10", "0", "1"]
    assert solver.findMaxForm(s2, 1, 1) == 2, "Test 2 failed"
    print(f"Test 2 Passed: {s2}, m=1, n=1 -> 2")

    # Test 3: String exceeds both m and n
    s3 = ["0000", "1111"]
    assert solver.findMaxForm(s3, 1, 1) == 0, "Test 3 failed"
    print(f"Test 3 Passed: {s3}, m=1, n=1 -> 0")

    # Test 4: Single valid string
    s4 = ["01"]
    assert solver.findMaxForm(s4, 1, 1) == 1, "Test 4 failed"
    print(f"Test 4 Passed: {s4}, m=1, n=1 -> 1")

    # Test 5: All zeros
    s5 = ["0", "00", "000"]
    assert solver.findMaxForm(s5, 3, 0) == 2, "Test 5 failed"  # "0" + "00" uses 3 zeros
    print(f"Test 5 Passed: {s5}, m=3, n=0 -> 2")

    print("\nAll Ones and Zeroes tests passed successfully!")
