r"""
====================================================================
Problem: Longest Word in Dictionary through Deleting (LeetCode 524)
Difficulty: Medium
Topic: Array, Two Pointers, String, Sorting
====================================================================

Given a string s and a string array dictionary, return the longest string
in the dictionary that can be formed by deleting some of the given string
characters. If there is more than one possible result, return the longest
word with the smallest lexicographical order. If there is no possible result,
return the empty string.

Example 1:
Input: s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
Output: "apple"

Example 2:
Input: s = "abpcplea", dictionary = ["a","b","c"]
Output: "a"

Constraints:
- 1 <= s.length <= 1000
- 1 <= dictionary.length <= 1000
- 1 <= dictionary[i].length <= 1000
- s and dictionary[i] consist of lowercase English letters.
====================================================================
"""

from typing import List


class Solution:
    def findLongestWord(self, s: str, dictionary: List[str]) -> str:
        """
        Sorts dictionary by descending length, then ascending alphabetical order.
        Returns the first word that is a valid subsequence of s.

        Complexity:
        - Time: O(D * L * log D + D * (N + L)) where D = len(dictionary), L = max word length, N = len(s)
        - Space: O(D * L) for sorted dictionary
        """
        # Sort words: longest first; lexicographically smaller first for ties
        dictionary.sort(key=lambda word: (-len(word), word))

        def is_subsequence(word: str) -> bool:
            i, j = 0, 0
            len_s, len_w = len(s), len(word)
            while i < len_s and j < len_w:
                if s[i] == word[j]:
                    j += 1
                i += 1
            return j == len_w

        for word in dictionary:
            if is_subsequence(word):
                return word

        return ""


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: "abpcplea", ["ale","apple","monkey","plea"] -> "apple"
    assert (
        sol.findLongestWord("abpcplea", ["ale", "apple", "monkey", "plea"]) == "apple"
    ), "Test 1 failed"

    # Test 2: "abpcplea", ["a","b","c"] -> "a"
    assert sol.findLongestWord("abpcplea", ["a", "b", "c"]) == "a", "Test 2 failed"

    # Test 3: No matching word
    assert sol.findLongestWord("abc", ["d", "e", "f"]) == "", "Test 3 failed"

    # Test 4: Equal length tie-breaking ("apple" vs "apply")
    assert (
        sol.findLongestWord("abpcplea", ["apply", "apple"]) == "apple"
    ), "Test 4 failed"

    # Test 5: Exact match
    assert sol.findLongestWord("leetcode", ["leetcode", "code"]) == "leetcode", "Test 5 failed"

    print("All Longest Word in Dictionary tests passed successfully!")
