"""
Problem: Get Equal Substrings Within Budget (LeetCode 1208)
Difficulty: Medium
Language: Python

You are given two strings s and t of the same length and an integer maxCost.
You want to change s to t. Changing the i-th character of s to i-th character of t
costs |s[i] - t[i]| (i.e., the absolute difference between the ASCII values of the characters).

Return the maximum length of a substring of s that can be changed to be the same as
the corresponding substring of t with a cost less than or equal to maxCost.
If there is no substring from s that can be changed to its corresponding substring from t, return 0.

Example 1:
    Input: s = "abcd", t = "bcdf", maxCost = 3
    Output: 3
    Explanation: "abc" of s can change to "bcd". That costs 3, so the maximum length is 3.

Example 2:
    Input: s = "abcd", t = "cdef", maxCost = 3
    Output: 1
    Explanation: Each character costs 2 to change, so max length within budget 3 is 1.

Example 3:
    Input: s = "abcd", t = "acde", maxCost = 0
    Output: 1
    Explanation: You cannot make any change, so the only valid substring is "a" which already matches "a".

Constraints:
    1 <= s.length <= 10^5
    t.length == s.length
    0 <= maxCost <= 10^6
    s and t consist of only lowercase English letters.
"""


class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        """
        Finds the maximum length of equalizable substring using a dynamic Sliding Window.
        
        Complexity:
            Time: O(N) - Each character is processed at most twice (by right and left pointers).
            Space: O(1) auxiliary space - Cost is calculated on the fly without extra arrays.
        """
        left = 0
        current_cost = 0
        max_len = 0
        n = len(s)

        for right in range(n):
            current_cost += abs(ord(s[right]) - ord(t[right]))

            while current_cost > maxCost:
                current_cost -= abs(ord(s[left]) - ord(t[left]))
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.equalSubstring("abcd", "bcdf", 3) == 3, f"Test 1 Failed: {sol.equalSubstring('abcd', 'bcdf', 3)}"

    # Test 2: Example 2
    assert sol.equalSubstring("abcd", "cdef", 3) == 1, f"Test 2 Failed: {sol.equalSubstring('abcd', 'cdef', 3)}"

    # Test 3: Example 3 (Zero budget)
    assert sol.equalSubstring("abcd", "acde", 0) == 1, f"Test 3 Failed: {sol.equalSubstring('abcd', 'acde', 0)}"

    # Test 4: Generous budget covering entire string
    assert sol.equalSubstring("krrgw", "zjxbg", 100) == 5, "Test 4 Failed"

    # Test 5: No matching characters and budget 0
    assert sol.equalSubstring("abc", "def", 0) == 0, "Test 5 Failed"

    print("All Get Equal Substrings Within Budget tests passed successfully!")
