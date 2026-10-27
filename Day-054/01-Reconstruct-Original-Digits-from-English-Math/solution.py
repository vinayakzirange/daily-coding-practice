r"""
====================================================================
Problem: Reconstruct Original Digits from English (LeetCode 423)
Difficulty: Medium
Topic: Hash Table, Math, String
====================================================================

Given a string s containing an out-of-order English representation of
digits 0-9, return the digits in ascending order.

Example 1:
Input: s = "owoztneoer"
Output: "012"

Example 2:
Input: s = "fviefuro"
Output: "45"

Constraints:
- 1 <= s.length <= 10^5
- s[i] is one of the characters ["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"].
- s is guaranteed to be valid.
====================================================================
"""

from collections import Counter


class Solution:
    def originalDigits(self, s: str) -> str:
        """
        Reconstructs digits from scrambled English letter counts using
        unique identifier characters.

        Unique in Round 1:
        - 'z' -> 0 (zero)
        - 'w' -> 2 (two)
        - 'u' -> 4 (four)
        - 'x' -> 6 (six)
        - 'g' -> 8 (eight)

        Round 2 (derived from remaining):
        - 'h' appears only in 3 and 8 -> count[3] = count['h'] - count[8]
        - 'f' appears only in 4 and 5 -> count[5] = count['f'] - count[4]
        - 's' appears only in 6 and 7 -> count[7] = count['s'] - count[6]
        - 'o' appears in 0, 1, 2, 4   -> count[1] = count['o'] - count[0] - count[2] - count[4]
        - 'i' appears in 5, 6, 8, 9   -> count[9] = count['i'] - count[5] - count[6] - count[8]

        Complexity:
        - Time: O(n) where n is len(s)
        - Space: O(1) auxiliary space (fixed alphabet and digit arrays)
        """
        freq = Counter(s)
        count = [0] * 10

        # Round 1: directly identified digits
        count[0] = freq["z"]
        count[2] = freq["w"]
        count[4] = freq["u"]
        count[6] = freq["x"]
        count[8] = freq["g"]

        # Round 2: secondary dependencies
        count[3] = freq["h"] - count[8]
        count[5] = freq["f"] - count[4]
        count[7] = freq["s"] - count[6]
        count[1] = freq["o"] - count[0] - count[2] - count[4]
        count[9] = freq["i"] - count[5] - count[6] - count[8]

        # Build output string in ascending order
        result = []
        for digit in range(10):
            result.append(str(digit) * count[digit])

        return "".join(result)


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: "owoztneoer" -> "012"
    assert sol.originalDigits("owoztneoer") == "012", "Test 1 failed"

    # Test 2: "fviefuro" -> "45"
    assert sol.originalDigits("fviefuro") == "45", "Test 2 failed"

    # Test 3: "zerozero" -> "00"
    assert sol.originalDigits("zerozero") == "00", "Test 3 failed"

    # Test 4: All digits "zeroonetwothreefourfivesixseveneightnine"
    all_digits = "zeroonetwothreefourfivesixseveneightnine"
    assert sol.originalDigits(all_digits) == "0123456789", "Test 4 failed"

    # Test 5: Scrambled "nine"
    assert sol.originalDigits("enni") == "9", "Test 5 failed"

    print("All Reconstruct Original Digits from English tests passed successfully!")
