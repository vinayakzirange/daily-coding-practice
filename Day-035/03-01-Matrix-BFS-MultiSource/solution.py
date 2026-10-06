"""
Problem: 01 Matrix (LeetCode 542)
Difficulty: Medium
Topic: 2D Grid / Multi-Source BFS / Matrix Queue / Distance Field

Description:
Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

Example 1:
Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]

Example 2:
Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]

Constraints:
  * m == mat.length
  * n == mat[i].length
  * 1 <= m, n <= 10^4
  * 1 <= m * n <= 10^4
  * mat[i][j] is either 0 or 1.
  * There is at least one 0 in mat.

Complexity:
  * Time Complexity: O(m * n) - Each cell is visited and pushed to the BFS queue at most once.
  * Space Complexity: O(m * n) - Distance matrix and BFS queue.
"""

from collections import deque
from typing import List


class Solution:
    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:
        m, n = len(mat), len(mat[0])
        dist = [[-1] * n for _ in range(m)]
        queue = deque()

        # Multi-source BFS initialization:
        # Enqueue all cells with value 0 with distance 0
        for r in range(m):
            for c in range(n):
                if mat[r][c] == 0:
                    dist[r][c] = 0
                    queue.append((r, c))

        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        while queue:
            r, c = queue.popleft()

            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and dist[nr][nc] == -1:
                    dist[nr][nc] = dist[r][c] + 1
                    queue.append((nr, nc))

        return dist


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        (
            [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 1, 0], [0, 0, 0]],
        ),
        (
            [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
            [[0, 0, 0], [0, 1, 0], [1, 2, 1]],
        ),
        (
            [[0]],
            [[0]],
        ),
        (
            [[0, 1], [1, 1]],
            [[0, 1], [1, 2]],
        ),
    ]

    for idx, (mat, expected) in enumerate(test_cases, 1):
        result = sol.updateMatrix(mat)
        assert result == expected, f"Test {idx} failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: {len(mat)}x{len(mat[0])} matrix updated correctly: {result}")

    print("\nAll 01 Matrix tests passed successfully!")
