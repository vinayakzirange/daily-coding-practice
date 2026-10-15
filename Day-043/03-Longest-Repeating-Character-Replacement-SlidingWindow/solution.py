"""
Problem: Longest Repeating Character Replacement (LeetCode 424)
Difficulty: Medium
Topic: Hash Table / String / Sliding Window

Description:
You are given a string s and an integer k. You can choose any character of the
string and change it to any other uppercase English character. You can perform
this operation at most k times.

Return the length of the longest substring containing the same letter you can get
after performing the above operations.

Example 1:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

Example 2:
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.

Constraints:
- 1 <= s.length <= 10^5
- s consists of only uppercase English letters.
- 0 <= k <= s.length

Complexity Analysis:
- Time Complexity: O(n) each character is visited at most twice by the two window pointers.
- Space Complexity: O(1) or O(26) auxiliary space for the character count dictionary.
"""

from collections import defaultdict


class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = defaultdict(int)
        max_freq = 0
        left = 0
        max_len = 0

        for right in range(len(s)):
            count[s[right]] += 1
            max_freq = max(max_freq, count[s[right]])

            # If the number of characters to replace exceeds k, shrink window
            while (right - left + 1) - max_freq > k:
                count[s[left]] -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ("ABAB", 2, 4),
        ("AABABBA", 1, 4),
        ("AAAA", 2, 4),
        ("ABCDE", 1, 2),
        ("ABBB", 2, 4),
        ("BAAA", 0, 3),
        ("ABAA", 0, 2),
    ]

    for idx, (s, k, expected) in enumerate(test_cases, 1):
        res = sol.characterReplacement(s, k)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: s='{s}', k={k} -> max length = {res}")

    print(
        "\nAll Longest Repeating Character Replacement tests passed successfully!"
    )
