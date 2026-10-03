"""
Problem: Rotate Image (2D Matrix Rotation 90 degrees clockwise)
Topic: 2D Grid / Matrix Transpose & Reverse
Language: Python

Approach:
Rotate an N x N 2D matrix 90 degrees clockwise in-place:
1. Transpose the matrix (swap matrix[i][j] with matrix[j][i]).
2. Reverse each row.

Time Complexity: O(N^2)
Space Complexity: O(1) in-place
"""

from typing import List

class Solution:
    @staticmethod
    def rotate(matrix: List[List[int]]) -> None:
        n = len(matrix)

        # Step 1: Transpose
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        # Step 2: Reverse each row
        for i in range(n):
            matrix[i].reverse()

if __name__ == "__main__":
    matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    Solution.rotate(matrix)
    print("Rotated Matrix ->", matrix)
    # Output: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
