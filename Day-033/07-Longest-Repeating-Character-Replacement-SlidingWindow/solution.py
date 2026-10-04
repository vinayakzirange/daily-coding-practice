"""
Problem: Longest Repeating Character Replacement (LeetCode 424)
Difficulty: Medium
Topic: String / Sliding Window / Frequency Counting / Two Pointers

Description:
You are given a string s and an integer k. You can choose any character of the string
and change it to any other uppercase English character. You can perform this operation
at most k times.

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
  * 1 <= s.length <= 10^5
  * s consists of only uppercase English letters.
  * 0 <= k <= s.length

Complexity:
  * Time Complexity: O(n) - Both left and right pointers traverse at most n steps.
  * Space Complexity: O(1) - Frequency map of at most 26 uppercase English letters.
"""


class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        freq = {}
        left = 0
        max_freq = 0
        max_length = 0

        for right in range(len(s)):
            char = s[right]
            freq[char] = freq.get(char, 0) + 1
            max_freq = max(max_freq, freq[char])

            # Current window length is (right - left + 1).
            # The number of characters that need to be replaced is
            # window_length - max_freq.
            # If that exceeds k, we must shrink the window from the left.
            while (right - left + 1) - max_freq > k:
                freq[s[left]] -= 1
                left += 1

            max_length = max(max_length, right - left + 1)

        return max_length


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
        ("BAAA", 0, 3),
        ("A", 0, 1),
    ]

    for idx, (s_val, k_val, expected) in enumerate(test_cases, 1):
        result = sol.characterReplacement(s_val, k_val)
        assert result == expected, f"Test {idx} failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: s='{s_val}', k={k_val} -> max length = {result}")

    print("\nAll Longest Repeating Character Replacement tests passed successfully!")
