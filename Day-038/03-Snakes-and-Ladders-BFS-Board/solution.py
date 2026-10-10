"""
Problem: Snakes and Ladders (LeetCode 909)
Difficulty: Medium
Topic: Breadth-First Search / Shortest Path / Matrix Board Simulation

Description:
You are given an n x n integer matrix board where the cells are labeled from 1 to n^2
in a Boustrophedon style starting from the bottom left of the board (i.e. board[n - 1][0])
and alternating direction each row.

You start on square 1 of the board. In each move, starting from square curr, do the following:
  * Choose a destination square next with a label in the range [curr + 1, min(curr + 6, n^2)].
    This choice simulates the result of a standard 6-sided die roll.
  * If next has a snake or ladder (board value != -1), you must move to the destination of
    that snake or ladder. Otherwise, you move to next.
  * The game ends when you reach square n^2.

A square is only affected by at most one snake or ladder. If the destination of a snake or
ladder is the start of another snake or ladder, you do not follow the subsequent snake or ladder.

Return the least number of dice rolls required to reach square n^2. If it is not possible
to reach the square, return -1.

Example 1:
Input: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],
                [-1,35,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
Output: 4
Explanation:
Initially, you start at square 1.
Roll die to land on square 2; take ladder to 15.
Roll die to land on square 17; take snake/ladder to 35.
Roll die to reach square 36.

Example 2:
Input: board = [[-1,-1],[-1,3]]
Output: 1

Constraints:
  * n == board.length == board[i].length
  * 2 <= n <= 20
  * board[i][j] is either -1 or in the range [1, n^2].
  * The squares labeled 1 and n^2 do not have any snakes or ladders.

Complexity:
  * Time Complexity: O(n^2) - Each square is visited at most once in BFS.
  * Space Complexity: O(n^2) - Queue and visited set store at most n^2 squares.
"""

from collections import deque
from typing import List


class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)
        target = n * n

        def get_coordinates(square: int) -> tuple:
            # 0-indexed square index
            idx = square - 1
            row_from_bottom = idx // n
            r = n - 1 - row_from_bottom
            c = idx % n
            # If row_from_bottom is odd, column direction goes right-to-left
            if row_from_bottom % 2 == 1:
                c = n - 1 - c
            return r, c

        queue = deque([(1, 0)])  # (square, moves)
        visited = {1}

        while queue:
            curr, moves = queue.popleft()

            if curr == target:
                return moves

            for roll in range(1, 7):
                nxt = curr + roll
                if nxt > target:
                    break

                r, c = get_coordinates(nxt)
                destination = board[r][c] if board[r][c] != -1 else nxt

                if destination not in visited:
                    visited.add(destination)
                    queue.append((destination, moves + 1))

        return -1


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    b1 = [
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, 35, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1],
        [-1, 15, -1, -1, -1, -1],
    ]
    res1 = sol.snakesAndLadders(b1)
    assert res1 == 4, f"Test 1 Failed: expected 4, got {res1}"
    print(f"Test 1 Passed: 6x6 board min moves = {res1}")

    b2 = [[-1, -1], [-1, 3]]
    res2 = sol.snakesAndLadders(b2)
    assert res2 == 1, f"Test 2 Failed: expected 1, got {res2}"
    print(f"Test 2 Passed: 2x2 board min moves = {res2}")

    b3 = [[-1, 1, 2, -1], [2, 13, 15, -1], [-1, 10, -1, -1], [-1, 6, 2, 8]]
    res3 = sol.snakesAndLadders(b3)
    print(f"Test 3 Passed: 4x4 board min moves = {res3}")

    print("\nAll Snakes and Ladders tests passed successfully!")
