"""
Problem Name: Pascal's Triangle
Problem Statement: Given an integer numRows, return the first numRows of Pascal's triangle.

Approach: In Pascal's triangle, each number is the sum of the two numbers directly above it.

Time Complexity: O(numRows^2)
Space Complexity: O(1) auxiliary space (excluding result)
"""

from typing import List

class Solution:
    @staticmethod
    def generate(numRows: int) -> List[List[int]]:
        triangle = []
        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j]
            triangle.append(row)
        return triangle

if __name__ == "__main__":
    print("Pascal's Triangle (5 rows):", Solution.generate(5))
    # Expected: [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
