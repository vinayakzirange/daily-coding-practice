"""
Problem: Minimum Falling Path Sum (LeetCode 931)
Difficulty: Medium
Topic: 2D Matrix / Dynamic Programming

Description:
Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

A falling path starts at any element in the first row and chooses the element in the next row 
that is either directly below or diagonally left/right. 
Specifically, the next element from position (row, col) will be:
(row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).

Example 1:
Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
Explanation:
There are two falling paths with a minimum sum of 13:
[1, 5, 7] -> 1 + 5 + 7 = 13
[1, 4, 8] -> 1 + 4 + 8 = 13

Example 2:
Input: matrix = [[-19,57],[-40,-5]]
Output: -59
Explanation:
Falling path: [-19, -40] -> -19 + -40 = -59.

Constraints:
  * n == matrix.length == matrix[i].length
  * 1 <= n <= 100
  * -100 <= matrix[i][j] <= 100

Complexity:
  * Time Complexity: O(n^2) where n is the number of rows and columns.
  * Space Complexity: O(n) for 1D rolling DP array (or O(1) in-place).
"""

from typing import List


class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        # Previous row's minimum falling path sums
        prev_row = matrix[0][:]

        for r in range(1, n):
            curr_row = [0] * n
            for c in range(n):
                # Choices from directly above, diagonally left, diagonally right
                best = prev_row[c]
                if c > 0:
                    best = min(best, prev_row[c - 1])
                if c < n - 1:
                    best = min(best, prev_row[c + 1])
                curr_row[c] = matrix[r][c] + best
            prev_row = curr_row

        return min(prev_row)


if __name__ == "__main__":
    sol = Solution()

    # Test 1
    m1 = [[2, 1, 3], [6, 5, 4], [7, 8, 9]]
    res1 = sol.minFallingPathSum(m1)
    print(f"Test 1: Output={res1}, Expected=13 | Pass: {res1 == 13}")

    # Test 2
    m2 = [[-19, 57], [-40, -5]]
    res2 = sol.minFallingPathSum(m2)
    print(f"Test 2: Output={res2}, Expected=-59 | Pass: {res2 == -59}")

    # Test 3
    m3 = [[7]]
    res3 = sol.minFallingPathSum(m3)
    print(f"Test 3: Output={res3}, Expected=7 | Pass: {res3 == 7}")
