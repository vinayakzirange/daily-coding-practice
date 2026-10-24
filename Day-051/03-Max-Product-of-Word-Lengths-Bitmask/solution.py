"""
====================================================================
Problem: Maximum Product of Word Lengths (LeetCode 318)
Difficulty: Medium
Topic: Array, String, Bit Manipulation
====================================================================

Given a string array words, return the maximum value of
length(word[i]) * length(word[j]) where the two words do not share
common letters. If no such two words exist, return 0.

Example 1:
Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16
Explanation: The two words can be "abcw", "xtfn".

Example 2:
Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4
Explanation: The two words can be "ab", "cd".

Example 3:
Input: words = ["a","aa","aaa","aaaa"]
Output: 0
Explanation: No such pair of words.

Constraints:
- 2 <= words.length <= 1000
- 1 <= words[i].length <= 1000
- words[i] consists only of lowercase English letters.
====================================================================
"""

from typing import List

class Solution:
    def maxProduct(self, words: List[str]) -> int:
        """
        Bitmask representation for character sets:
        Each lowercase letter 'a'-'z' maps to bit (ord(c) - 97).
        Two words share no letters iff (mask[i] & mask[j]) == 0.
        To optimize, map each distinct mask to the maximum length word having that mask.

        Time Complexity: O(total_chars + (unique_masks)^2)
        Space Complexity: O(unique_masks) <= O(min(len(words), 2^26))
        """
        mask_to_maxlen = {}

        for word in words:
            mask = 0
            for char in word:
                mask |= (1 << (ord(char) - 97))
            mask_to_maxlen[mask] = max(mask_to_maxlen.get(mask, 0), len(word))

        max_prod = 0
        masks = list(mask_to_maxlen.items())

        for i in range(len(masks)):
            mask1, len1 = masks[i]
            for j in range(i + 1, len(masks)):
                mask2, len2 = masks[j]
                if (mask1 & mask2) == 0:
                    prod = len1 * len2
                    if prod > max_prod:
                        max_prod = prod

        return max_prod


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: ["abcw","baz","foo","bar","xtfn","abcdef"] -> 16
    w1 = ["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]
    assert solver.maxProduct(w1) == 16, "Test 1 failed"
    print("Test 1 Passed: ['abcw', ..., 'abcdef'] -> 16 ('abcw' * 'xtfn')")

    # Test 2: ["a","ab","abc","d","cd","bcd","abcd"] -> 4
    w2 = ["a", "ab", "abc", "d", "cd", "bcd", "abcd"]
    assert solver.maxProduct(w2) == 4, "Test 2 failed"
    print("Test 2 Passed: ['a', ..., 'abcd'] -> 4 ('ab' * 'cd')")

    # Test 3: ["a","aa","aaa","aaaa"] -> 0
    w3 = ["a", "aa", "aaa", "aaaa"]
    assert solver.maxProduct(w3) == 0, "Test 3 failed"
    print("Test 3 Passed: all sharing 'a' -> 0")

    # Test 4: Completely disjoint long words
    w4 = ["abcdefghijklm", "nopqrstuvwxyz"]
    assert solver.maxProduct(w4) == 13 * 13, "Test 4 failed"
    print("Test 4 Passed: 13 * 13 = 169")

    # Test 5: Single duplicate letter preventing product
    w5 = ["abc", "def", "c"]
    # "abc" and "def" don't share: 3 * 3 = 9
    assert solver.maxProduct(w5) == 9, "Test 5 failed"
    print("Test 5 Passed: ['abc', 'def', 'c'] -> 9")

    print("\nAll Maximum Product of Word Lengths tests passed successfully!")
