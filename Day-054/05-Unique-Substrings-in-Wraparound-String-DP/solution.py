r"""
====================================================================
Problem: Unique Substrings in Wraparound String (LeetCode 467)
Difficulty: Medium
Topic: String, Dynamic Programming
====================================================================

We define the string base to be the infinite wraparound string of
"abcdefghijklmnopqrstuvwxyz", so base will look like this:
"...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd...".

Given a string s, return the number of unique non-empty substrings
of s that are present in base.

Example 1:
Input: s = "a"
Output: 1
Explanation: Only the substring "a" of s is in base.

Example 2:
Input: s = "cac"
Output: 2
Explanation: There are two substrings ("a", "c") of s in base.

Example 3:
Input: s = "zab"
Output: 6
Explanation: There are six substrings ("z", "a", "b", "za", "ab", and "zab")
of s in base.

Constraints:
- 1 <= s.length <= 10^5
- s consists of lowercase English letters.
====================================================================
"""


class Solution:
    def findSubstringInWraproundString(self, s: str) -> int:
        """
        Calculates the number of unique substrings of s present in the
        infinite wraparound base string.

        Key insight:
        If a valid substring ending at character c has length L, it implies
        valid substrings of length 1, 2, ..., L ending at c. Tracking the
        maximum continuous valid length ending at each of the 26 characters
        avoids duplicates naturally.

        Complexity:
        - Time: O(n) single pass
        - Space: O(1) fixed array of size 26
        """
        if not s:
            return 0

        # max_len[i] = max length of valid substring ending with character chr(ord('a') + i)
        max_len = [0] * 26
        curr_len = 0

        for i in range(len(s)):
            if i > 0 and (ord(s[i]) - ord(s[i - 1])) % 26 == 1:
                curr_len += 1
            else:
                curr_len = 1

            idx = ord(s[i]) - ord("a")
            max_len[idx] = max(max_len[idx], curr_len)

        return sum(max_len)


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: "a" -> 1
    assert sol.findSubstringInWraproundString("a") == 1, "Test 1 failed"

    # Test 2: "cac" -> 2 ("a", "c")
    assert sol.findSubstringInWraproundString("cac") == 2, "Test 2 failed"

    # Test 3: "zab" -> 6 ("z", "a", "b", "za", "ab", "zab")
    assert sol.findSubstringInWraproundString("zab") == 6, "Test 3 failed"

    # Test 4: Wraparound around z -> a
    assert sol.findSubstringInWraproundString("zabcdef") == 28, "Test 4 failed"

    # Test 5: Repeated characters
    assert sol.findSubstringInWraproundString("aaaa") == 1, "Test 5 failed"

    print("All Unique Substrings in Wraparound String tests passed successfully!")
