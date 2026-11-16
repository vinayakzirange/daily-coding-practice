"""
Problem: Construct K Palindrome Strings (LeetCode 1400)
Difficulty: Medium
Category: Hash Table / String / Greedy / Counting

Description:
Given a string s and an integer k, return true if you can use all the characters
in s to construct k palindrome strings or false otherwise.

Example 1:
    Input: s = "annabelle", k = 2
    Output: true
    Explanation: You can construct two palindromes using all characters in s.
                 Some possible constructions: "anna" + "elble", "anbna" + "elle", "anellena" + "b".

Example 2:
    Input: s = "leetcode", k = 3
    Output: false
    Explanation: It is impossible to construct 3 palindromes using all characters of s.

Example 3:
    Input: s = "true", k = 4
    Output: true
    Explanation: The only possible solution is to put each character in a separate string: "t", "r", "u", "e", all of which are palindromes.

Constraints:
    - 1 <= s.length <= 10^5
    - s consists of lowercase English letters.
    - 1 <= k <= 10^5
"""

from collections import Counter


class Solution:
    def canConstruct(self, s: str, k: int) -> bool:
        """
        Determines whether s can be partitioned into exactly k palindromes.

        Key Invariants:
        1. If k > len(s), we cannot form k non-empty strings, so return False.
        2. In any palindrome, at most one character can have an odd count (the center).
           Thus, each character with an odd frequency requires its own separate palindrome.
        3. Therefore, the minimum number of palindromes we can construct is equal
           to the number of characters with odd frequencies (`odd_count`).
        4. Any character with an even count (or extra pairs) can be split or placed
           symmetrically into existing palindromes or form single-character palindromes.
        5. Hence, condition is: odd_count <= k <= len(s).

        Time Complexity: O(n)
        Space Complexity: O(1) (at most 26 lowercase characters)
        """
        if k > len(s):
            return False

        char_counts = Counter(s)
        odd_count = sum(1 for count in char_counts.values() if count % 2 != 0)

        return odd_count <= k


def run_tests():
    sol = Solution()

    # Test 1: Example 1
    assert sol.canConstruct("annabelle", 2) is True, "Test 1 Failed"

    # Test 2: Example 2
    assert sol.canConstruct("leetcode", 3) is False, "Test 2 Failed"

    # Test 3: Example 3
    assert sol.canConstruct("true", 4) is True, "Test 3 Failed"

    # Test 4: k greater than string length
    assert sol.canConstruct("abc", 5) is False, "Test 4 Failed"

    # Test 5: All characters identical
    assert sol.canConstruct("aaaa", 2) is True, "Test 5 Failed"

    # Test 6: Single character
    assert sol.canConstruct("y", 1) is True, "Test 6 Failed"

    # Test 7: Exactly odd_count == k
    assert sol.canConstruct("cr", 2) is True, "Test 7 Failed"

    print("All tests passed for 03-Construct-K-Palindrome-Strings-Greedy!")


if __name__ == "__main__":
    run_tests()
