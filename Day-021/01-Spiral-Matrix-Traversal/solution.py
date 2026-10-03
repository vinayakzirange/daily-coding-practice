"""
Problem: Spiral Matrix
Topic: 2D Grid / Boundary Traversal
Language: Python

Approach:
Maintain 4 boundary pointers (top, bottom, left, right).
Traverse top row, right column, bottom row (if top <= bottom), and left column (if left <= right),
contracting boundaries inward after each direction.

Time Complexity: O(M * N)
Space Complexity: O(1) auxiliary (excluding output list)
"""

from typing import List

class Solution:
    @staticmethod
    def spiralOrder(matrix: List[List[int]]) -> List[int]:
        result = []
        if not matrix or not matrix[0]:
            return result

        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1

        while top <= bottom and left <= right:
            for j in range(left, right + 1):
                result.append(matrix[top][j])
            top += 1

            for i in range(top, bottom + 1):
                result.append(matrix[i][right])
            right -= 1

            if top <= bottom:
                for j in range(right, left - 1, -1):
                    result.append(matrix[bottom][j])
                bottom -= 1

            if left <= right:
                for i in range(bottom, top - 1, -1):
                    result.append(matrix[i][left])
                left += 1

        return result

if __name__ == "__main__":
    matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    print("Spiral Order ->", Solution.spiralOrder(matrix))  # [1, 2, 3, 6, 9, 8, 7, 4, 5]
