"""
Problem: Triangle (LeetCode 120)
Difficulty: Medium
Topic: Array / Dynamic Programming

Description:
Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally,
if you are on index i on the current row, you may move to either index i or index
i + 1 on the next row.

Example 1:
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11.

Example 2:
Input: triangle = [[-10]]
Output: -10

Constraints:
- 1 <= triangle.length <= 200
- triangle[0].length == 1
- triangle[i].length == triangle[i - 1].length + 1
- -10^4 <= triangle[i][j] <= 10^4

Follow up: Could you do this using only O(n) extra space, where n is the total
number of rows in the triangle?

Complexity Analysis:
- Time Complexity: O(N^2) where N is the number of rows in the triangle.
- Space Complexity: O(N) using a 1D DP array of size equal to the bottom row.
"""

from typing import List


class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        if not triangle:
            return 0

        # Initialize DP table with the bottom-most row of the triangle
        dp = list(triangle[-1])

        # Bottom-up approach: collapse from second-to-last row up to top
        for row in range(len(triangle) - 2, -1, -1):
            for col in range(len(triangle[row])):
                dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])

        return dp[0]


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]], 11),
        ([[-10]], -10),
        ([[-1], [2, 3], [1, -1, -3]], -1),
        ([[7]], 7),
        ([[1], [2, 3], [4, 5, 6], [7, 8, 9, 10]], 14),
    ]

    for idx, (triangle, expected) in enumerate(test_cases, 1):
        res = sol.minimumTotal(triangle)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: rows={len(triangle)} -> min path sum = {res}")

    print("\nAll Triangle tests passed successfully!")
