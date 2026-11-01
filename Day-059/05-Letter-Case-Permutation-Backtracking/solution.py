r"""
LeetCode 784: Letter Case Permutation (Medium)
https://leetcode.com/problems/letter-case-permutation/

Given a string s, you can transform every letter individually to be lowercase or uppercase
to create another string.

Return a list of all possible strings we could create. Return the output in any order.

Example 1:
Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]

Example 2:
Input: s = "3z4"
Output: ["3z4","3Z4"]

Constraints:
- 1 <= s.length <= 12
- s consists of lowercase English letters, uppercase English letters, and digits.
"""

from typing import List


class Solution:
    def letterCasePermutation(self, s: str) -> List[str]:
        """
        Backtracking / iterative approach:
        Start with an initial list containing an empty prefix.
        For each character in s:
          - If digit, append digit to all current prefixes.
          - If letter, duplicate each current prefix: append lowercase to one and uppercase to the other.

        Time Complexity: O(2^k * N) where k is the number of letters (k <= 12) and N is len(s).
        Space Complexity: O(2^k * N) to store the result.
        """
        result = [""]
        for ch in s:
            if ch.isalpha():
                lower_ch = ch.lower()
                upper_ch = ch.upper()
                result = [prefix + c for prefix in result for c in (lower_ch, upper_ch)]
            else:
                result = [prefix + ch for prefix in result]
        return result


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1
    res1 = sorted(sol.letterCasePermutation("a1b2"))
    expected1 = sorted(["a1b2", "a1B2", "A1b2", "A1B2"])
    assert res1 == expected1, f"Test 1 Failed: {res1} != {expected1}"

    # Test Case 2
    res2 = sorted(sol.letterCasePermutation("3z4"))
    expected2 = sorted(["3z4", "3Z4"])
    assert res2 == expected2, f"Test 2 Failed: {res2} != {expected2}"

    # Test Case 3: all digits
    res3 = sorted(sol.letterCasePermutation("123"))
    expected3 = ["123"]
    assert res3 == expected3, f"Test 3 Failed: {res3} != {expected3}"

    # Test Case 4: single letter
    res4 = sorted(sol.letterCasePermutation("C"))
    expected4 = sorted(["c", "C"])
    assert res4 == expected4, f"Test 4 Failed: {res4} != {expected4}"

    print("All tests passed for Letter Case Permutation!")
