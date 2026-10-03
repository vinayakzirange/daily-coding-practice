"""
Problem: Word Ladder
Topic: Graph / BFS Shortest Path / String Transformations
Language: Python

Approach:
Model words as graph nodes where an edge represents 1-character difference.
Run BFS from beginWord level by level. Return shortest path depth when reaching endWord.

Time Complexity: O(N * M^2) where N is number of words, M is word length
Space Complexity: O(N * M)
"""

from collections import deque
from typing import List

class Solution:
    @staticmethod
    def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
        word_set = set(wordList)
        if endWord not in word_set:
            return 0

        queue = deque([(beginWord, 1)])
        if beginWord in word_set:
            word_set.remove(beginWord)

        while queue:
            word, level = queue.popleft()
            if word == endWord:
                return level

            chars = list(word)
            for j in range(len(chars)):
                orig = chars[j]
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    chars[j] = c
                    next_word = "".join(chars)
                    if next_word in word_set:
                        word_set.remove(next_word)
                        queue.append((next_word, level + 1))
                chars[j] = orig

        return 0

if __name__ == "__main__":
    words = ["hot", "dot", "dog", "lot", "log", "cog"]
    print("hit -> cog length ->", Solution.ladderLength("hit", "cog", words))  # 5
