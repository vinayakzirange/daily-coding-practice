r"""
====================================================================
Problem: Brick Wall (LeetCode 554)
Difficulty: Medium
Topic: Array, Hash Table
====================================================================

There is a rectangular brick wall in front of you with n rows of bricks.
The i-th row has some number of bricks each of the same height (i.e.,
one unit tall) but they can be of different widths. The total width of
each row is the same.

Draw a vertical line from the top to the bottom and cross the least
number of bricks. If your line goes through the edge of a brick, then
the brick is not considered as crossed. You cannot draw a line just along
one of the two vertical edges of the wall.

Given the 2D array wall, return the minimum number of crossed bricks
after drawing such a vertical line.

Example 1:
Input: wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]
Output: 2

Example 2:
Input: wall = [[1],[1],[1]]
Output: 3

Constraints:
- n == wall.length
- 1 <= n <= 10^4
- 1 <= wall[i].length <= 10^4
- 1 <= sum(wall[i].length) <= 2 * 10^4
- sum(wall[i]) is the same for each row and fits in 32-bit signed int.
- 1 <= wall[i][j] <= 2^31 - 1
====================================================================
"""

from collections import Counter
from typing import List


class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        """
        Maximizes the number of brick boundaries / edges cut by the vertical line.
        Min crossed bricks = total rows - max edge alignments.

        Complexity:
        - Time: O(B) where B is the total number of bricks across all rows
        - Space: O(E) where E is the number of unique edge positions
        """
        edge_counts = Counter()

        for row in wall:
            curr_pos = 0
            # Exclude the final brick in the row (right vertical edge of the wall)
            for brick_width in row[:-1]:
                curr_pos += brick_width
                edge_counts[curr_pos] += 1

        max_edges = max(edge_counts.values()) if edge_counts else 0
        return len(wall) - max_edges


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: Standard 6-row wall
    wall1 = [
        [1, 2, 2, 1],
        [3, 1, 2],
        [1, 3, 2],
        [2, 4],
        [3, 1, 2],
        [1, 3, 1, 1],
    ]
    assert sol.leastBricks(wall1) == 2, f"Test 1 failed: {sol.leastBricks(wall1)}"

    # Test 2: Single column bricks -> must cut all bricks
    wall2 = [[1], [1], [1]]
    assert sol.leastBricks(wall2) == 3, f"Test 2 failed: {sol.leastBricks(wall2)}"

    # Test 3: Perfectly aligned edges
    wall3 = [[2, 2], [2, 2], [2, 2]]
    assert sol.leastBricks(wall3) == 0, f"Test 3 failed: {sol.leastBricks(wall3)}"

    # Test 4: Single row
    wall4 = [[1, 2, 3]]
    assert sol.leastBricks(wall4) == 0, f"Test 4 failed: {sol.leastBricks(wall4)}"

    print("All Brick Wall tests passed successfully!")
