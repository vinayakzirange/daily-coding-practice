r"""
====================================================================
Problem: Diagonal Traverse (LeetCode 498)
Difficulty: Medium
Topic: Array, Matrix, Simulation
====================================================================

Given an m x n matrix mat, return an array of all the elements of the
array in a diagonal order.

Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]

Example 2:
Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]

Constraints:
- m == mat.length
- n == mat[i].length
- 1 <= m, n <= 10^4
- 1 <= m * n <= 10^4
- -10^5 <= mat[i][j] <= 10^5
====================================================================
"""

from typing import List


class Solution:
    def findDiagonalOrder(self, mat: List[List[int]]) -> List[int]:
        """
        Traverses matrix diagonally by grouping elements on anti-diagonals (r + c = d).
        Even d traverses diagonally upwards-right (bottom-left to top-right).
        Odd d traverses diagonally downwards-left (top-right to bottom-left).

        Complexity:
        - Time: O(m * n) visiting each cell exactly once
        - Space: O(1) auxiliary space (excluding result array)
        """
        if not mat or not mat[0]:
            return []

        m, n = len(mat), len(mat[0])
        result = []

        # Total diagonals = (m - 1) + (n - 1) + 1 = m + n - 1
        for d in range(m + n - 1):
            if d % 2 == 0:
                # Upwards-right: r decreases, c increases
                r = min(d, m - 1)
                c = d - r
                while r >= 0 and c < n:
                    result.append(mat[r][c])
                    r -= 1
                    c += 1
            else:
                # Downwards-left: c decreases, r increases
                c = min(d, n - 1)
                r = d - c
                while c >= 0 and r < m:
                    result.append(mat[r][c])
                    r += 1
                    c -= 1

        return result


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: 3x3 matrix
    mat1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert sol.findDiagonalOrder(mat1) == [1, 2, 4, 7, 5, 3, 6, 8, 9], "Test 1 failed"

    # Test 2: 2x2 matrix
    mat2 = [[1, 2], [3, 4]]
    assert sol.findDiagonalOrder(mat2) == [1, 2, 3, 4], "Test 2 failed"

    # Test 3: 1x3 matrix
    mat3 = [[1, 2, 3]]
    assert sol.findDiagonalOrder(mat3) == [1, 2, 3], "Test 3 failed"

    # Test 4: 3x1 matrix
    mat4 = [[1], [2], [3]]
    assert sol.findDiagonalOrder(mat4) == [1, 2, 3], "Test 4 failed"

    # Test 5: Single element
    assert sol.findDiagonalOrder([[42]]) == [42], "Test 5 failed"

    print("All Diagonal Traverse tests passed successfully!")
