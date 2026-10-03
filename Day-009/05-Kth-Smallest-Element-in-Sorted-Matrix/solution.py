"""
Problem Name: Kth Smallest Element in a Sorted Matrix
Problem Statement: Given an n x n matrix where each of the rows and columns is sorted in ascending order,
find the kth smallest element in the matrix.

Approach: Binary Search on Value Range [matrix[0][0], matrix[n-1][n-1]].
Count elements <= mid in O(N) per step using step search from bottom-left or top-right.

Time Complexity: O(N log(Max - Min))
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def kthSmallest(matrix: List[List[int]], k: int) -> int:
        n = len(matrix)
        low, high = matrix[0][0], matrix[n - 1][n - 1]

        def count_less_equal(mid: int) -> int:
            count = 0
            row, col = n - 1, 0
            while row >= 0 and col < n:
                if matrix[row][col] <= mid:
                    count += (row + 1)
                    col += 1
                else:
                    row -= 1
            return count

        while low < high:
            mid = low + (high - low) // 2
            if count_less_equal(mid) < k:
                low = mid + 1
            else:
                high = mid

        return low

if __name__ == "__main__":
    matrix = [
        [1,  5,  9],
        [10, 11, 13],
        [12, 13, 15]
    ]
    print("8th Smallest Element:", Solution.kthSmallest(matrix, 8))  # Expected: 13
