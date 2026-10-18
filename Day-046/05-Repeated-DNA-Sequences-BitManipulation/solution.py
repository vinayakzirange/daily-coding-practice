"""
====================================================================
Problem: Repeated DNA Sequences (LeetCode 187)
Difficulty: Medium
Topic: Hash Table, String, Bit Manipulation, Sliding Window, Rolling Hash
====================================================================

The DNA sequence is composed of a series of nucleotides abbreviated as
'A', 'C', 'G', and 'T'.

For example, "ACGAATTCCG" is a DNA sequence.

When studying DNA, it is useful to identify repeated sequences within
the DNA.

Given a string s that represents a DNA sequence, return all the
10-letter-long sequences (substrings) that occur more than once in a
DNA molecule. You may return the answer in any order.

Example 1:
Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]

Example 2:
Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]

Constraints:
- 1 <= s.length <= 10^5
- s[i] is either 'A', 'C', 'G', or 'T'.
====================================================================
"""

from typing import List

class Solution:
    def findRepeatedDnaSequences(self, s: str) -> List[str]:
        """
        Finds 10-letter-long repeated substrings using Bit Manipulation + Rolling Hash.
        Each nucleotide ('A', 'C', 'G', 'T') is mapped to a 2-bit integer:
          'A': 00 (0), 'C': 01 (1), 'G': 10 (2), 'T': 11 (3).
        A 10-letter window requires 20 bits, fitting neatly in a single integer.
        
        Time Complexity: O(n) where n = len(s)
        Space Complexity: O(n) for seen and repeated sets
        """
        L = 10
        n = len(s)
        if n <= L:
            return []

        mapping = {'A': 0, 'C': 1, 'G': 2, 'T': 3}
        bitmask = (1 << (2 * L)) - 1  # 20 bits: 0xFFFFF

        curr_hash = 0
        for i in range(L):
            curr_hash = (curr_hash << 2) | mapping[s[i]]

        seen = {curr_hash}
        repeated_hashes = set()
        result = []

        for i in range(L, n):
            # Shift left by 2 bits, add new nucleotide, keep lowest 20 bits
            curr_hash = ((curr_hash << 2) | mapping[s[i]]) & bitmask
            if curr_hash in seen:
                if curr_hash not in repeated_hashes:
                    repeated_hashes.add(curr_hash)
                    result.append(s[i - L + 1: i + 1])
            else:
                seen.add(curr_hash)

        return result


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: Standard case with 2 repeats
    s1 = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
    out1 = sorted(solver.findRepeatedDnaSequences(s1))
    exp1 = sorted(["AAAAACCCCC", "CCCCCAAAAA"])
    assert out1 == exp1, f"Test 1 failed: {out1} != {exp1}"
    print(f"Test 1 Passed: {s1[:15]}... -> {out1}")

    # Test 2: Monotonous repeating characters
    s2 = "AAAAAAAAAAAAA"
    out2 = solver.findRepeatedDnaSequences(s2)
    exp2 = ["AAAAAAAAAA"]
    assert out2 == exp2, f"Test 2 failed: {out2} != {exp2}"
    print(f"Test 2 Passed: {s2} -> {out2}")

    # Test 3: Short string (< 10)
    s3 = "ACGT"
    out3 = solver.findRepeatedDnaSequences(s3)
    assert out3 == [], f"Test 3 failed: {out3}"
    print(f"Test 3 Passed: '{s3}' -> []")

    # Test 4: Exactly 10 characters (cannot repeat)
    s4 = "AAAAAAAAAA"
    out4 = solver.findRepeatedDnaSequences(s4)
    assert out4 == [], f"Test 4 failed: {out4}"
    print(f"Test 4 Passed: '{s4}' -> []")

    # Test 5: Exactly 11 characters with single repeat
    s5 = "AAAAAAAAAAA"
    out5 = solver.findRepeatedDnaSequences(s5)
    assert out5 == ["AAAAAAAAAA"], f"Test 5 failed: {out5}"
    print(f"Test 5 Passed: '{s5}' -> {out5}")

    print("\nAll Repeated DNA Sequences tests passed successfully!")
