"""
Problem: Shortest Path in Binary Matrix (LeetCode 1091)
Language: Python
Difficulty: Medium
Time Complexity: O(N^2)
Space Complexity: O(N^2)
"""

from collections import deque
from typing import List

class Solution:
    DIRS = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        n = len(grid)
        if grid[0][0] != 0 or grid[n - 1][n - 1] != 0:
            return -1
        if n == 1:
            return 1

        queue = deque([(0, 0, 1)])
        grid[0][0] = 1

        while queue:
            r, c, dist = queue.popleft()
            if r == n - 1 and c == n - 1:
                return dist

            for dr, dc in self.DIRS:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                    grid[nr][nc] = 1
                    queue.append((nr, nc, dist + 1))

        return -1

if __name__ == "__main__":
    sol = Solution()
    print("Output:", sol.shortestPathBinaryMatrix([[0, 1], [1, 0]]))  # 2
    print("Output:", sol.shortestPathBinaryMatrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]]))  # 4
