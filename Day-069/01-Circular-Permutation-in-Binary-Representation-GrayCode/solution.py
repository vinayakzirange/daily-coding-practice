"""
Problem: Circular Permutation in Binary Representation (LeetCode 1238)
Difficulty: Medium
Language: Python

Given 2 integers n and start. Your task is to return any permutation p of (0, 1, 2, ..., 2^n - 1) such that :
    - p[0] = start
    - p[i] and p[i+1] differ by only one bit in their binary representation.
    - p[0] and p[2^n - 1] must also differ by only one bit in their binary representation.

Example 1:
    Input: n = 2, start = 3
    Output: [3,2,0,1]
    Explanation: The binary representation of the permutation is (11,10,00,01). 
    All adjacent pairs differ by one bit. Also p[0] = 11 and p[3] = 01 differ by one bit.

Example 2:
    Input: n = 3, start = 2
    Output: [2,6,7,5,4,0,1,3]
    Explanation: The binary representation is (010,110,111,101,100,000,001,011).

Constraints:
    1 <= n <= 16
    0 <= start < 2^n
"""

from typing import List


class Solution:
    def circularPermutation(self, n: int, start: int) -> List[int]:
        """
        Generates circular 1-bit differing permutation using Gray Code XOR transformation.
        
        Formula:
            Standard Gray Code: G(i) = i ^ (i >> 1)
            XORing every element with `start` maps G(0) to `start` while strictly
            preserving the 1-bit Hamming distance between all adjacent elements.
            
        Complexity:
            Time: O(2^n) - Direct single-pass generation of 2^n elements.
            Space: O(2^n) - To store the output permutation.
        """
        total = 1 << n
        return [start ^ (i ^ (i >> 1)) for i in range(total)]


def is_valid_circular_permutation(p: List[int], n: int, start: int) -> bool:
    """Helper to validate permutation requirements."""
    if len(p) != (1 << n):
        return False
    if p[0] != start:
        return False
    if len(set(p)) != len(p):
        return False

    for i in range(len(p)):
        diff = p[i] ^ p[(i + 1) % len(p)]
        # Must differ by exactly 1 bit (diff is power of 2)
        if diff <= 0 or (diff & (diff - 1)) != 0:
            return False

    return True


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    p1 = sol.circularPermutation(2, 3)
    assert is_valid_circular_permutation(p1, 2, 3), f"Test 1 Failed: {p1}"

    # Test 2: Example 2
    p2 = sol.circularPermutation(3, 2)
    assert is_valid_circular_permutation(p2, 3, 2), f"Test 2 Failed: {p2}"

    # Test 3: n = 1, start = 0
    p3 = sol.circularPermutation(1, 0)
    assert is_valid_circular_permutation(p3, 1, 0), f"Test 3 Failed: {p3}"

    # Test 4: n = 1, start = 1
    p4 = sol.circularPermutation(1, 1)
    assert is_valid_circular_permutation(p4, 1, 1), f"Test 4 Failed: {p4}"

    # Test 5: n = 4, start = 7
    p5 = sol.circularPermutation(4, 7)
    assert is_valid_circular_permutation(p5, 4, 7), f"Test 5 Failed: {p5}"

    print("All Circular Permutation in Binary Representation tests passed successfully!")
