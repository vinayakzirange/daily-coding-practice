"""
Problem: Flood Fill Algorithm
Topic: 2D Grid / DFS / Graph Traversal
Language: Python

Approach:
Check starting pixel color. If it differs from newColor, recursively DFS fill top, bottom,
left, and right adjacent pixels with matching original color.

Time Complexity: O(N * M) grid size
Space Complexity: O(N * M) recursion stack
"""

from typing import List

class Solution:
    @staticmethod
    def floodFill(image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        original_color = image[sr][sc]
        if original_color == color:
            return image

        rows, cols = len(image), len(image[0])

        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or image[r][c] != original_color:
                return
            image[r][c] = color
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        dfs(sr, sc)
        return image

if __name__ == "__main__":
    image = [
        [1, 1, 1],
        [1, 1, 0],
        [1, 0, 1]
    ]
    result = Solution.floodFill(image, 1, 1, 2)
    print("Flood Fill Result:", result)
