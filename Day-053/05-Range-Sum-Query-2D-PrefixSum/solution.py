r"""
====================================================================
Problem: Range Sum Query 2D - Immutable (LeetCode 304)
Difficulty: Medium
Topic: Array, Design, Matrix, Prefix Sum
====================================================================

Given a 2D matrix matrix, handle multiple queries of the following type:
- Calculate the sum of the elements of matrix inside the rectangle
  defined by its upper left corner (row1, col1) and lower right corner
  (row2, col2).

Implement the NumMatrix class:
- NumMatrix(int[][] matrix) Initializes the object with the integer matrix.
- int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of
  the elements of matrix inside the rectangle defined by its upper left
  corner (row1, col1) and lower right corner (row2, col2).

You must design an algorithm where sumRegion works on O(1) time complexity.

Example 1:
Input:
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2],
   [5, 6, 3, 2, 1],
   [1, 2, 0, 1, 5],
   [4, 1, 0, 1, 7],
   [1, 0, 3, 0, 5]]],
 [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output:
[null, 8, 11, 12]

Constraints:
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 200
- -10^4 <= matrix[i][j] <= 10^4
- 0 <= row1 <= row2 < m
- 0 <= col1 <= col2 < n
- At most 10^4 calls will be made to sumRegion.
====================================================================
"""

from typing import List


class NumMatrix:
    """
    2D Prefix Sum implementation allowing O(1) rectangular region queries.
    
    pre[r+1][c+1] = sum of elements in rectangle from (0,0) to (r,c).
    """

    def __init__(self, matrix: List[List[int]]):
        if not matrix or not matrix[0]:
            self.pref = []
            return

        m, n = len(matrix), len(matrix[0])
        self.pref = [[0] * (n + 1) for _ in range(m + 1)]

        for r in range(m):
            for c in range(n):
                self.pref[r + 1][c + 1] = (
                    matrix[r][c]
                    + self.pref[r][c + 1]
                    + self.pref[r + 1][c]
                    - self.pref[r][c]
                )

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        """
        Returns the sum of matrix[r][c] for row1 <= r <= row2 and col1 <= c <= col2 in O(1) time.
        """
        return (
            self.pref[row2 + 1][col2 + 1]
            - self.pref[row1][col2 + 1]
            - self.pref[row2 + 1][col1]
            + self.pref[row1][col1]
        )


# --- Test Suite ---
if __name__ == "__main__":
    matrix = [
        [3, 0, 1, 4, 2],
        [5, 6, 3, 2, 1],
        [1, 2, 0, 1, 5],
        [4, 1, 0, 1, 7],
        [1, 0, 3, 0, 5],
    ]
    nm = NumMatrix(matrix)

    # Test 1: sumRegion(2, 1, 4, 3) -> 8
    ans1 = nm.sumRegion(2, 1, 4, 3)
    assert ans1 == 8, f"Test 1 failed: expected 8, got {ans1}"

    # Test 2: sumRegion(1, 1, 2, 2) -> 11
    ans2 = nm.sumRegion(1, 1, 2, 2)
    assert ans2 == 11, f"Test 2 failed: expected 11, got {ans2}"

    # Test 3: sumRegion(1, 2, 2, 4) -> 12
    ans3 = nm.sumRegion(1, 2, 2, 4)
    assert ans3 == 12, f"Test 3 failed: expected 12, got {ans3}"

    # Test 4: Single cell query (0, 0, 0, 0) -> 3
    assert nm.sumRegion(0, 0, 0, 0) == 3, "Test 4 failed"

    # Test 5: Entire matrix sum
    total = sum(sum(row) for row in matrix)
    assert nm.sumRegion(0, 0, 4, 4) == total, f"Test 5 failed: expected {total}"

    print("All Range Sum Query 2D tests passed successfully!")
