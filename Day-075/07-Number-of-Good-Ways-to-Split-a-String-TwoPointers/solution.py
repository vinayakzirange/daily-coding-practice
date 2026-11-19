"""
Problem: Number of Good Ways to Split a String (LeetCode 1525)
Difficulty: Medium
Category: String / Hash Table / Two Pointers / Dynamic Programming

Description:
You are given a string s.

A split is called good if you can split s into two non-empty strings s_left and s_right
such that the number of unique letters in s_left and s_right is the same
(i.e. len(set(s_left)) == len(set(s_right))).

Return the number of good splits you can make in s.

Example 1:
    Input: s = "aacaba"
    Output: 2
    Explanation: There are 5 ways to split "aacaba" and 2 of them are good:
                 - ("a", "acaba") -> 1 != 3
                 - ("aa", "caba") -> 1 != 3
                 - ("aac", "aba") -> 2 == 2 (Good)
                 - ("aaca", "ba") -> 2 == 2 (Good)
                 - ("aacab", "a") -> 3 != 1

Example 2:
    Input: s = "abcd"
    Output: 1
    Explanation: Split the string as ("ab", "cd").

Constraints:
    - 1 <= s.length <= 10^5
    - s consists of only lowercase English letters.
"""

from collections import Counter


class Solution:
    def numSplits(self, s: str) -> int:
        """
        Calculates the number of splits where both halves have the same number of distinct characters.

        Simple Two-Frequency Table Approach:
        - Start with all characters in the right partition frequency map.
        - Iterate through the string up to len(s) - 1, moving one character from right to left.
        - Whenever len(left_counts) == len(right_counts), we have a valid good split.

        Time Complexity: O(n)
        Space Complexity: O(1) (at most 26 distinct lowercase characters)
        """
        left_counts = Counter()
        right_counts = Counter(s)
        good_splits = 0

        # Non-empty split requires leaving at least 1 character in right half
        for char in s[:-1]:
            left_counts[char] += 1
            right_counts[char] -= 1
            if right_counts[char] == 0:
                del right_counts[char]

            if len(left_counts) == len(right_counts):
                good_splits += 1

        return good_splits


def run_tests():
    sol = Solution()

    # Test 1: Example 1
    assert sol.numSplits("aacaba") == 2, "Test 1 Failed"

    # Test 2: Example 2
    assert sol.numSplits("abcd") == 1, "Test 2 Failed"

    # Test 3: All identical characters: "aaaa" -> 3 splits: ("a","aaa"), ("aa","aa"), ("aaa","a")
    assert sol.numSplits("aaaa") == 3, "Test 3 Failed"

    # Test 4: Two distinct characters: "ab" -> 1 split ("a", "b")
    assert sol.numSplits("ab") == 1, "Test 4 Failed"

    # Test 5: No valid split: "abaa" -> ("a","baa") 1!=2, ("ab","aa") 2!=1, ("aba","a") 2!=1
    assert sol.numSplits("abaa") == 0, "Test 5 Failed"

    print("All tests passed for 07-Number-of-Good-Ways-to-Split-a-String-TwoPointers!")


if __name__ == "__main__":
    run_tests()
