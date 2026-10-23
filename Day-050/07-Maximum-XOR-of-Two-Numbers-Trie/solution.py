"""
====================================================================
Problem: Maximum XOR of Two Numbers in an Array (LeetCode 421)
Difficulty: Medium
Topic: Array, Hash Table, Bit Manipulation, Trie
====================================================================

Given an integer array nums, return the maximum result of nums[i] XOR nums[j],
where 0 <= i <= j < n.

Example 1:
Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.

Example 2:
Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127

Constraints:
- 1 <= nums.length <= 2 * 10^5
- 0 <= nums[i] <= 2^31 - 1
====================================================================
"""

from typing import List

class TrieNode:
    def __init__(self):
        self.children = {}


class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        """
        Bitwise Prefix Hash Table (or Binary Trie):
        We determine the answer bit by bit from MSB (30) down to LSB (0).
        For each bit i:
        1. Set the candidate max_xor with bit i turned on: candidate = max_xor | (1 << i)
        2. Collect prefixes of all numbers up to bit i.
        3. Since (a ^ b = c) <=> (a ^ c = b), check if there exists any prefix p
           such that (p ^ candidate) is also in prefixes.
        4. If yes, the candidate is achievable and we update max_xor.

        Time Complexity: O(31 * n) = O(n)
        Space Complexity: O(n) to store prefixes set
        """
        max_xor = 0
        mask = 0

        for i in range(30, -1, -1):
            mask |= (1 << i)
            # Collect prefixes of all numbers masked to bit i
            prefixes = {num & mask for num in nums}

            candidate = max_xor | (1 << i)
            for p in prefixes:
                if (p ^ candidate) in prefixes:
                    max_xor = candidate
                    break

        return max_xor


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [3, 10, 5, 25, 2, 8] -> 28 (5 ^ 25 = 28)
    nums1 = [3, 10, 5, 25, 2, 8]
    assert solver.findMaximumXOR(nums1) == 28, "Test 1 failed"
    print(f"Test 1 Passed: {nums1} -> 28")

    # Test 2: [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70] -> 127
    nums2 = [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]
    assert solver.findMaximumXOR(nums2) == 127, "Test 2 failed"
    print(f"Test 2 Passed: 12 elements -> 127")

    # Test 3: Single element: [5] -> 0 (5 ^ 5 = 0)
    assert solver.findMaximumXOR([5]) == 0, "Test 3 failed"
    print("Test 3 Passed: [5] -> 0")

    # Test 4: Two elements: [2, 4] -> 6 (2 ^ 4 = 6)
    assert solver.findMaximumXOR([2, 4]) == 6, "Test 4 failed"
    print("Test 4 Passed: [2, 4] -> 6")

    # Test 5: All zeros
    assert solver.findMaximumXOR([0, 0, 0]) == 0, "Test 5 failed"
    print("Test 5 Passed: [0, 0, 0] -> 0")

    print("\nAll Maximum XOR of Two Numbers in an Array tests passed successfully!")
