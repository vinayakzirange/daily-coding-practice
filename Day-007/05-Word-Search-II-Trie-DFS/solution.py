"""
Problem Name: Word Search II
Problem Statement: Given an m x n board of characters and a list of strings words, return all words on the board.

Approach: Insert all words into a Trie, then perform DFS from every grid cell matching the Trie root.

Time Complexity: O(M * N * 4^L) where L is max word length
Space Complexity: O(W * L) for Trie structure
"""

from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

class Solution:
    @staticmethod
    def findWords(board: List[List[str]], words: List[str]) -> List[str]:
        root = TrieNode()
        for w in words:
            curr = root
            for ch in w:
                if ch not in curr.children:
                    curr.children[ch] = TrieNode()
                curr = curr.children[ch]
            curr.word = w

        result = []
        rows, cols = len(board), len(board[0])

        def dfs(r: int, c: int, parent: TrieNode):
            ch = board[r][c]
            curr = parent.children.get(ch)
            if not curr:
                return

            if curr.word:
                result.append(curr.word)
                curr.word = None  # Avoid duplicates

            board[r][c] = '#'  # Visited
            for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols:
                    dfs(nr, nc, curr)
            board[r][c] = ch  # Backtrack

        for r in range(rows):
            for c in range(cols):
                if board[r][c] in root.children:
                    dfs(r, c, root)

        return result

if __name__ == "__main__":
    board = [
        ['o', 'a', 'a', 'n'],
        ['e', 't', 'a', 'e'],
        ['i', 'h', 'k', 'r'],
        ['i', 'f', 'l', 'v']
    ]
    words = ["oath", "pea", "eat", "rain"]
    print("Words found:", Solution.findWords(board, words))  # Expected: ["oath", "eat"]
