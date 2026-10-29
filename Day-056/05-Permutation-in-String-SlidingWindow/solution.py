r"""
====================================================================
Problem: Permutation in String (LeetCode 567)
Difficulty: Medium
Topic: Hash Table, Two Pointers, String, Sliding Window
====================================================================

Given two strings s1 and s2, return true if s2 contains a permutation
of s1, or false otherwise.

In other words, return true if one of s1's permutations is the
substring of s2.

Example 1:
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").

Example 2:
Input: s1 = "ab", s2 = "eidboaoo"
Output: false

Constraints:
- 1 <= s1.length, s2.length <= 10^4
- s1 and s2 consist of lowercase English letters.
====================================================================
"""


class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        """
        Sliding window of fixed length len(s1) over s2 with character
        frequency array comparison.

        Complexity:
        - Time: O(len(s2)) single pass with O(1) sliding window updates
        - Space: O(1) auxiliary space (fixed arrays of size 26)
        """
        n1, n2 = len(s1), len(s2)
        if n1 > n2:
            return False

        count1 = [0] * 26
        count2 = [0] * 26

        for i in range(n1):
            count1[ord(s1[i]) - ord("a")] += 1
            count2[ord(s2[i]) - ord("a")] += 1

        matches = sum(1 for i in range(26) if count1[i] == count2[i])

        if matches == 26:
            return True

        for i in range(n1, n2):
            # Incoming character
            r_idx = ord(s2[i]) - ord("a")
            count2[r_idx] += 1
            if count2[r_idx] == count1[r_idx]:
                matches += 1
            elif count2[r_idx] == count1[r_idx] + 1:
                matches -= 1

            # Outgoing character
            l_idx = ord(s2[i - n1]) - ord("a")
            count2[l_idx] -= 1
            if count2[l_idx] == count1[l_idx]:
                matches += 1
            elif count2[l_idx] == count1[l_idx] - 1:
                matches -= 1

            if matches == 26:
                return True

        return False


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: "ab", "eidbaooo" -> True
    assert sol.checkInclusion("ab", "eidbaooo") is True, "Test 1 failed"

    # Test 2: "ab", "eidboaoo" -> False
    assert sol.checkInclusion("ab", "eidboaoo") is False, "Test 2 failed"

    # Test 3: Exact match "adc", "dcda" -> True ("cda")
    assert sol.checkInclusion("adc", "dcda") is True, "Test 3 failed"

    # Test 4: s1 longer than s2
    assert sol.checkInclusion("hello", "hi") is False, "Test 4 failed"

    # Test 5: Single characters
    assert sol.checkInclusion("a", "a") is True, "Test 5 failed"
    assert sol.checkInclusion("a", "b") is False, "Test 5b failed"

    print("All Permutation in String tests passed successfully!")
