r"""
====================================================================
Problem: Minesweeper (LeetCode 529)
Difficulty: Medium
Topic: Array, Depth-First Search, Breadth-First Search, Matrix
====================================================================

Let's play the minesweeper game!

You are given an m x n 2D char matrix board representing the game board:
- 'M' represents an unrevealed mine,
- 'E' represents an unrevealed empty square,
- 'B' represents a revealed blank square that has no adjacent mines
  (i.e., above, below, left, right, and all 4 diagonals),
- digit ('1' to '8') represents how many mines are adjacent to this revealed square,
- 'X' represents a revealed mine.

You are also given an integer array click where click = [click_r, click_c]
represents the next click position among all the unrevealed squares ('M' or 'E').

Return the board after revealing this position according to the following rules:
1. If a mine 'M' is revealed, then the game is over - change it to 'X'.
2. If an empty square 'E' with at least one adjacent mine is revealed, then
   change it to a digit ('1' to '8') representing the number of adjacent mines.
3. If an empty square 'E' with no adjacent mines is revealed, then change it to
   a blank 'B' and all of its adjacent unrevealed squares should be revealed
   recursively.
4. Return the board when no more squares will be revealed.

Example 1:
Input: board = [
  ["E","E","E","E","E"],
  ["E","E","M","E","E"],
  ["E","E","E","E","E"],
  ["E","E","E","E","E"]
], click = [3,0]
Output: [
  ["B","1","E","1","B"],
  ["B","1","M","1","B"],
  ["B","1","1","1","B"],
  ["B","B","B","B","B"]
]

Example 2:
Input: board = [
  ["B","1","E","1","B"],
  ["B","1","M","1","B"],
  ["B","1","1","1","B"],
  ["B","B","B","B","B"]
], click = [1,2]
Output: [
  ["B","1","E","1","B"],
  ["B","1","X","1","B"],
  ["B","1","1","1","B"],
  ["B","B","B","B","B"]
]

Constraints:
- m == board.length
- n == board[i].length
- 1 <= m, n <= 50
- board[i][j] is either 'M', 'E', 'B', or a digit from '1' to '8'.
- click.length == 2
- 0 <= click_r < m
- 0 <= click_c < n
- board[click_r][click_c] is either 'M' or 'E'.
====================================================================
"""

from typing import List


class Solution:
    def updateBoard(self, board: List[List[str]], click: List[int]) -> List[List[str]]:
        """
        Reveals board squares following Minesweeper rules via DFS.

        Complexity:
        - Time: O(m * n) in the worst case where the entire board is empty and revealed
        - Space: O(m * n) maximum recursion stack depth
        """
        r, c = click
        m, n = len(board), len(board[0])

        # Rule 1: Clicked directly on a mine
        if board[r][c] == "M":
            board[r][c] = "X"
            return board

        directions = [
            (-1, -1), (-1, 0), (-1, 1),
            (0, -1),           (0, 1),
            (1, -1),  (1, 0),  (1, 1)
        ]

        def dfs(row: int, col: int) -> None:
            # Count adjacent mines
            mine_count = 0
            for dr, dc in directions:
                nr, nc = row + dr, col + dc
                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] == "M":
                    mine_count += 1

            if mine_count > 0:
                # Rule 2: Has adjacent mines -> show count
                board[row][col] = str(mine_count)
            else:
                # Rule 3: No adjacent mines -> mark as Blank and reveal neighbours
                board[row][col] = "B"
                for dr, dc in directions:
                    nr, nc = row + dr, col + dc
                    if 0 <= nr < m and 0 <= nc < n and board[nr][nc] == "E":
                        dfs(nr, nc)

        dfs(r, c)
        return board


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: Click on [3, 0]
    board1 = [
        ["E", "E", "E", "E", "E"],
        ["E", "E", "M", "E", "E"],
        ["E", "E", "E", "E", "E"],
        ["E", "E", "E", "E", "E"],
    ]
    res1 = sol.updateBoard(board1, [3, 0])
    expected1 = [
        ["B", "1", "E", "1", "B"],
        ["B", "1", "M", "1", "B"],
        ["B", "1", "1", "1", "B"],
        ["B", "B", "B", "B", "B"],
    ]
    assert res1 == expected1, f"Test 1 failed: {res1}"

    # Test 2: Click on mine [1, 2]
    board2 = [
        ["B", "1", "E", "1", "B"],
        ["B", "1", "M", "1", "B"],
        ["B", "1", "1", "1", "B"],
        ["B", "B", "B", "B", "B"],
    ]
    res2 = sol.updateBoard(board2, [1, 2])
    assert res2[1][2] == "X", f"Test 2 failed: expected 'X', got {res2[1][2]}"

    # Test 3: 1x1 board without mine
    board3 = [["E"]]
    res3 = sol.updateBoard(board3, [0, 0])
    assert res3 == [["B"]], f"Test 3 failed: {res3}"

    # Test 4: 1x1 board with mine
    board4 = [["M"]]
    res4 = sol.updateBoard(board4, [0, 0])
    assert res4 == [["X"]], f"Test 4 failed: {res4}"

    print("All Minesweeper tests passed successfully!")
