"""
Problem Name: Word Ladder
Problem Statement: Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest
transformation sequence from beginWord to endWord such that only one letter changes at a time and every word is in wordList.

Approach: Breadth-First Search (BFS) for shortest path in an unweighted word graph.

Time Complexity: O(N * M^2) where N is number of words and M is word length
Space Complexity: O(N * M)
"""

from collections import deque
from typing import List

class Solution:
    @staticmethod
    def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
        words = set(wordList)
        if endWord not in words:
            return 0

        queue = deque([(beginWord, 1)])
        visited = {beginWord}

        while queue:
            curr_word, level = queue.popleft()
            if curr_word == endWord:
                return level

            for i in range(len(curr_word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    next_word = curr_word[:i] + c + curr_word[i + 1:]
                    if next_word in words and next_word not in visited:
                        visited.add(next_word)
                        queue.append((next_word, level + 1))

        return 0

if __name__ == "__main__":
    word_list = ["hot", "dot", "dog", "lot", "log", "cog"]
    print("Shortest Ladder Length:", Solution.ladderLength("hit", "cog", word_list))  # Expected: 5
