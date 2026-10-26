"""
====================================================================
Problem: Interleaving String (LeetCode 97)
Difficulty: Medium
Topic: String, Dynamic Programming
====================================================================

Given strings s1, s2, and s3, find whether s3 is formed by an
interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where s and t
are divided into n and m substrings respectively, such that:
- s = s_1 + s_2 + ... + s_n
- t = t_1 + t_2 + ... + t_m
- |n - m| <= 1
- The interleaving is s_1 + t_1 + s_2 + t_2 + ... or t_1 + s_1 + t_2 + s_2 + ...

Note: a + b is the concatenation of strings a and b.

Example 1:
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
Explanation: One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving gives "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".

Example 2:
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false
Explanation: Notice how it is impossible to interleave s1 and s2 in
to s3.

Example 3:
Input: s1 = "", s2 = "", s3 = ""
Output: true

Constraints:
- 0 <= s1.length, s2.length <= 100
- 0 <= s3.length <= 200
- s1, s2, and s3 consist of lowercase English letters.

Follow up: Could you solve it using only O(s2.length) additional memory space?
====================================================================
"""

class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        """
        2D Dynamic Programming with O(len(s2)) 1D space optimization:
        dp[j] represents whether s1[0:i] and s2[0:j] can form s3[0:i+j].
        
        Transition:
        dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or
                (dp[j - 1] and s2[j - 1] == s3[i + j - 1])

        Time Complexity: O(m * n) where m = len(s1), n = len(s2)
        Space Complexity: O(n) using 1D DP array
        """
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False

        dp = [False] * (n + 1)
        dp[0] = True

        # Base case: using only s2 to form s3 prefix
        for j in range(1, n + 1):
            dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]

        for i in range(1, m + 1):
            # Update dp[0] using only s1
            dp[0] = dp[0] and s1[i - 1] == s3[i - 1]

            for j in range(1, n + 1):
                from_s1 = dp[j] and s1[i - 1] == s3[i + j - 1]
                from_s2 = dp[j - 1] and s2[j - 1] == s3[i + j - 1]
                dp[j] = from_s1 or from_s2

        return dp[n]


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: Standard interleaving: True
    assert solver.isInterleave("aabcc", "dbbca", "aadbbcbcac") is True, "Test 1 failed"
    print("Test 1 Passed: 'aabcc' + 'dbbca' -> 'aadbbcbcac' (True)")

    # Test 2: Impossible interleaving: False
    assert solver.isInterleave("aabcc", "dbbca", "aadbbbaccc") is False, "Test 2 failed"
    print("Test 2 Passed: 'aabcc' + 'dbbca' -> 'aadbbbaccc' (False)")

    # Test 3: All empty strings: True
    assert solver.isInterleave("", "", "") is True, "Test 3 failed"
    print("Test 3 Passed: '' + '' -> '' (True)")

    # Test 4: Mismatched length: False
    assert solver.isInterleave("a", "b", "abc") is False, "Test 4 failed"
    print("Test 4 Passed: length mismatch returns False")

    # Test 5: One empty string: True
    assert solver.isInterleave("hello", "", "hello") is True, "Test 5 failed"
    print("Test 5 Passed: 'hello' + '' -> 'hello' (True)")

    # Test 6: Overlapping characters needing backtracking: True
    s1 = "aa"
    s2 = "ab"
    s3 = "aaba"
    assert solver.isInterleave(s1, s2, s3) is True, "Test 6 failed"
    print(f"Test 6 Passed: '{s1}' + '{s2}' -> '{s3}' (True)")

    print("\nAll Interleaving String tests passed successfully!")
