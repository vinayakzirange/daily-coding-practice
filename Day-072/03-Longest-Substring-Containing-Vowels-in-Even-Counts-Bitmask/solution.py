"""
Problem: Find the Longest Substring Containing Vowels in Even Counts (LeetCode 1371)
Difficulty: Medium
Category: Hash Table / String / Bit Manipulation / Prefix XOR

Description:
Given the string s, return the size of the longest substring containing each
vowel 'a', 'e', 'i', 'o', and 'u' an even number of times.

Example 1:
    Input: s = "eleetminicoworoep"
    Output: 13
    Explanation: The longest substring is "leetminicowor" which contains two 'e's,
                 two 'i's, two 'o's, and zero 'a's and 'u's.

Example 2:
    Input: s = "leetcodeisgreat"
    Output: 5
    Explanation: The longest substring is "leetc" which contains two 'e's.

Example 3:
    Input: s = "bcbcbc"
    Output: 6
    Explanation: In this case, the given string "bcbcbc" is the longest because
                 all vowels appear 0 times (0 is an even number).

Constraints:
    - 1 <= s.length <= 5 * 10^5
    - s contains only lowercase English letters.
"""


class Solution:
    def findTheLongestSubstring(self, s: str) -> int:
        """
        Finds the length of the longest substring with even counts of 'a', 'e', 'i', 'o', 'u'.

        Uses a 5-bit mask to represent parity of each vowel:
            bit 0: 'a', bit 1: 'e', bit 2: 'i', bit 3: 'o', bit 4: 'u'.
        If prefix mask at index j equals prefix mask at index i (j < i),
        then substring s[j+1..i] has all even vowel counts.

        Time Complexity: O(n)
        Space Complexity: O(1) (at most 32 mask states)
        """
        vowel_to_bit = {
            'a': 1 << 0,
            'e': 1 << 1,
            'i': 1 << 2,
            'o': 1 << 3,
            'u': 1 << 4
        }

        # Store the earliest index where each mask was observed
        # Mask 0 has been seen before the string starts (index -1)
        first_seen = {0: -1}
        current_mask = 0
        max_len = 0

        for i, char in enumerate(s):
            if char in vowel_to_bit:
                current_mask ^= vowel_to_bit[char]

            if current_mask in first_seen:
                max_len = max(max_len, i - first_seen[current_mask])
            else:
                first_seen[current_mask] = i

        return max_len


def run_tests():
    sol = Solution()

    # Test 1: Standard case with multiple vowels
    assert sol.findTheLongestSubstring("eleetminicoworoep") == 13, "Test 1 Failed"

    # Test 2: Substring "leetc"
    assert sol.findTheLongestSubstring("leetcodeisgreat") == 5, "Test 2 Failed"

    # Test 3: String without any vowels
    assert sol.findTheLongestSubstring("bcbcbc") == 6, "Test 3 Failed"

    # Test 4: Single vowel odd count
    assert sol.findTheLongestSubstring("a") == 0, "Test 4 Failed"

    # Test 5: Two identical vowels
    assert sol.findTheLongestSubstring("aa") == 2, "Test 5 Failed"

    # Test 6: All 5 vowels in pairs
    assert sol.findTheLongestSubstring("aeiouuoiea") == 10, "Test 6 Failed"

    # Test 7: Alternating vowels
    assert sol.findTheLongestSubstring("aeiou") == 0, "Test 7 Failed"

    print("All tests passed for 03-Longest-Substring-Containing-Vowels-in-Even-Counts-Bitmask!")


if __name__ == "__main__":
    run_tests()
