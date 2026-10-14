"""
Problem: Surrounded Regions (LeetCode 130)
Difficulty: Medium
Topic: Array / Depth-First Search / Breadth-First Search / Union Find / Matrix

Description:
Given an m x n matrix board containing 'X' and 'O', capture all regions that
are 4-directionally surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
Any 'O' that is not connected to the border is surrounded by 'X' and will be captured.

Example 1:
Input: board = [
  ["X","X","X","X"],
  ["X","O","O","X"],
  ["X","X","O","X"],
  ["X","O","X","X"]
]
Output: [
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","O","X","X"]
]
Explanation: Notice that an 'O' should not be flipped if it is on the border,
or it is adjacent to an 'O' that should not be flipped.

Example 2:
Input: board = [["X"]]
Output: [["X"]]

Constraints:
- m == board.length
- n == board[i].length
- 1 <= m, n <= 200
- board[i][j] is 'X' or 'O'.

Complexity Analysis:
- Time Complexity: O(m * n) visiting each cell at most a constant number of times.
- Space Complexity: O(m * n) recursion stack in the worst case.
"""

from typing import List


class Solution:
    def solve(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        if not board or not board[0]:
            return

        rows, cols = len(board), len(board[0])

        def dfs(r: int, c: int):
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != "O":
                return
            # Mark as safe (connected to border)
            board[r][c] = "#"
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        # Step 1: Run DFS from all border 'O's
        for r in range(rows):
            if board[r][0] == "O":
                dfs(r, 0)
            if board[r][cols - 1] == "O":
                dfs(r, cols - 1)

        for c in range(cols):
            if board[0][c] == "O":
                dfs(0, c)
            if board[rows - 1][c] == "O":
                dfs(rows - 1, c)

        # Step 2: Flip unvisited 'O' -> 'X' and restore '#' -> 'O'
        for r in range(rows):
            for c in range(cols):
                if board[r][c] == "O":
                    board[r][c] = "X"
                elif board[r][c] == "#":
                    board[r][c] = "O"


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        (
            [
                ["X", "X", "X", "X"],
                ["X", "O", "O", "X"],
                ["X", "X", "O", "X"],
                ["X", "O", "X", "X"],
            ],
            [
                ["X", "X", "X", "X"],
                ["X", "X", "X", "X"],
                ["X", "X", "X", "X"],
                ["X", "O", "X", "X"],
            ],
        ),
        ([["X"]], [["X"]]),
        ([["O"]], [["O"]]),
        (
            [
                ["O", "O", "O"],
                ["O", "O", "O"],
                ["O", "O", "O"],
            ],
            [
                ["O", "O", "O"],
                ["O", "O", "O"],
                ["O", "O", "O"],
            ],
        ),
        (
            [
                ["X", "O", "X"],
                ["X", "O", "X"],
                ["X", "O", "X"],
            ],
            [
                ["X", "O", "X"],
                ["X", "O", "X"],
                ["X", "O", "X"],
            ],
        ),
    ]

    for idx, (board, expected) in enumerate(test_cases, 1):
        board_copy = [row[:] for row in board]
        sol.solve(board_copy)
        assert (
            board_copy == expected
        ), f"Test {idx} Failed: got {board_copy}, expected {expected}"
        print(f"Test {idx} Passed: {len(board)}x{len(board[0])} board solved correctly")

    print("\nAll Surrounded Regions tests passed successfully!")
