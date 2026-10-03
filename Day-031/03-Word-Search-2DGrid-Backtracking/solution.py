"""
Problem: Word Search (LeetCode 79)
Language: Python
Difficulty: Medium
Time Complexity: O(M * N * 3^L) where L is length of word
Space Complexity: O(L) call stack
"""

from typing import List

class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])

        def dfs(r: int, c: int, index: int) -> bool:
            if index == len(word):
                return True
            if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[index]:
                return False

            temp = board[r][c]
            board[r][c] = '#'

            found = (dfs(r + 1, c, index + 1) or
                     dfs(r - 1, c, index + 1) or
                     dfs(r, c + 1, index + 1) or
                     dfs(r, c - 1, index + 1))

            board[r][c] = temp
            return found

        for i in range(m):
            for j in range(n):
                if board[i][j] == word[0] and dfs(i, j, 0):
                    return True

        return False

if __name__ == "__main__":
    sol = Solution()
    board = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
    ]
    print("Word 'ABCCED' exists:", sol.exist(board, "ABCCED"))  # True
    print("Word 'SEE' exists:", sol.exist(board, "SEE"))        # True
    print("Word 'ABCB' exists:", sol.exist(board, "ABCB"))      # False
