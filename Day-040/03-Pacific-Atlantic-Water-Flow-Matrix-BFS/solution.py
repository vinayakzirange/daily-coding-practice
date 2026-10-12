"""
Problem: Pacific Atlantic Water Flow (LeetCode 417)
Difficulty: Medium
Topic: Depth-First Search / Breadth-First Search / Matrix / Graph

Description:
There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean.
The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches
the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer
matrix heights where heights[r][c] represents the height above sea level of the cell
at coordinate (r, c).

Rain water can flow to neighboring cells directly north, south, east, and west if the
neighboring cell's height is less than or equal to the current cell's height. Water
can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [r_i, c_i] denotes that
rain water can flow from cell (r_i, c_i) to both the Pacific and Atlantic oceans.

Example 1:
Input: heights = [
  [1,2,2,3,5],
  [3,2,3,4,4],
  [2,4,5,3,1],
  [6,7,1,4,5],
  [5,1,1,2,4]
]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The cells from which water can reach both oceans are marked above.

Example 2:
Input: heights = [[1]]
Output: [[0,0]]
Explanation: The single cell touches both oceans.

Constraints:
- m == heights.length
- n == heights[r].length
- 1 <= m, n <= 200
- 0 <= heights[r][c] <= 10^5

Complexity Analysis:
- Time Complexity: O(m * n) since each cell is visited at most twice during BFS traversals.
- Space Complexity: O(m * n) for the visited sets and BFS queues.
"""

from collections import deque
from typing import List


class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        if not heights or not heights[0]:
            return []

        rows, cols = len(heights), len(heights[0])
        pacific_queue = deque()
        atlantic_queue = deque()
        pacific_visited = set()
        atlantic_visited = set()

        # Pacific touches top row and left col
        # Atlantic touches bottom row and right col
        for r in range(rows):
            pacific_queue.append((r, 0))
            pacific_visited.add((r, 0))
            atlantic_queue.append((r, cols - 1))
            atlantic_visited.add((r, cols - 1))

        for c in range(cols):
            if (0, c) not in pacific_visited:
                pacific_queue.append((0, c))
                pacific_visited.add((0, c))
            if (rows - 1, c) not in atlantic_visited:
                atlantic_queue.append((rows - 1, c))
                atlantic_visited.add((rows - 1, c))

        def bfs(queue: deque, visited: set):
            directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
            while queue:
                r, c = queue.popleft()
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols:
                        if (nr, nc) not in visited and heights[nr][nc] >= heights[r][c]:
                            visited.add((nr, nc))
                            queue.append((nr, nc))

        # Flow backwards from oceans up the terrain
        bfs(pacific_queue, pacific_visited)
        bfs(atlantic_queue, atlantic_visited)

        # Intersection gives cells reachable by both oceans
        common = pacific_visited & atlantic_visited
        return sorted([list(coord) for coord in common])


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        (
            [
                [1, 2, 2, 3, 5],
                [3, 2, 3, 4, 4],
                [2, 4, 5, 3, 1],
                [6, 7, 1, 4, 5],
                [5, 1, 1, 2, 4],
            ],
            [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
        ),
        ([[1]], [[0, 0]]),
        (
            [[2, 1], [1, 2]],
            [[0, 0], [0, 1], [1, 0], [1, 1]],
        ),
        (
            [[1, 2, 3], [8, 9, 4], [7, 6, 5]],
            [[0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
        ),
    ]

    for idx, (heights, expected) in enumerate(test_cases, 1):
        res = sol.pacificAtlantic(heights)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: grid={len(heights)}x{len(heights[0])} -> {len(res)} cells reach both oceans")

    print("\nAll Pacific Atlantic Water Flow tests passed successfully!")
