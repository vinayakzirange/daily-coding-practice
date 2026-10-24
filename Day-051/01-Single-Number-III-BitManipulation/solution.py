"""
====================================================================
Problem: Single Number III (LeetCode 260)
Difficulty: Medium
Topic: Array, Bit Manipulation
====================================================================

Given an integer array nums, in which exactly two elements appear only
once and all the other elements appear exactly twice. Find the two
elements that appear only once. You can return the answer in any order.

You must write an algorithm that runs in linear runtime complexity and
uses only constant extra space.

Example 1:
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
Explanation: [5, 3] is also a valid answer.

Example 2:
Input: nums = [-1,0]
Output: [-1,0]

Example 3:
Input: nums = [0,1]
Output: [1,0]

Constraints:
- 2 <= nums.length <= 3 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- Each integer in nums will appear twice, only two integers will appear once.
====================================================================
"""

from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        """
        Bit Manipulation (Two's Complement & XOR Partition):
        1. XOR of all elements yields xor_all = a ^ b (where a, b are the two unique elements).
        2. Since a != b, xor_all must have at least one set bit (e.g. diff_bit = xor_all & -xor_all).
        3. This set bit differentiates a and b (one has this bit 0, the other has 1).
        4. Partition elements into two groups based on diff_bit and XOR each group.

        Time Complexity: O(n) two passes
        Space Complexity: O(1) constant auxiliary space
        """
        xor_all = 0
        for num in nums:
            xor_all ^= num

        # Lowest set bit
        diff_bit = xor_all & (-xor_all)

        a = 0
        b = 0
        for num in nums:
            if num & diff_bit:
                a ^= num
            else:
                b ^= num

        return [a, b]


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [1, 2, 1, 3, 2, 5] -> [3, 5]
    res1 = sorted(solver.singleNumber([1, 2, 1, 3, 2, 5]))
    assert res1 == [3, 5], f"Test 1 failed: {res1}"
    print(f"Test 1 Passed: [1, 2, 1, 3, 2, 5] -> {res1}")

    # Test 2: [-1, 0] -> [-1, 0]
    res2 = sorted(solver.singleNumber([-1, 0]))
    assert res2 == [-1, 0], f"Test 2 failed: {res2}"
    print(f"Test 2 Passed: [-1, 0] -> {res2}")

    # Test 3: [0, 1] -> [0, 1]
    res3 = sorted(solver.singleNumber([0, 1]))
    assert res3 == [0, 1], f"Test 3 failed: {res3}"
    print(f"Test 3 Passed: [0, 1] -> {res3}")

    # Test 4: Larger numbers with negative values: [-100, 200, -100, 300, 400, 400] -> [200, 300]
    res4 = sorted(solver.singleNumber([-100, 200, -100, 300, 400, 400]))
    assert res4 == [200, 300], f"Test 4 failed: {res4}"
    print(f"Test 4 Passed: [-100, 200, -100, 300, 400, 400] -> {res4}")

    # Test 5: Boundary 32-bit values: [-2147483648, 1, 1, 2147483647]
    res5 = sorted(solver.singleNumber([-2147483648, 1, 1, 2147483647]))
    assert res5 == [-2147483648, 2147483647], f"Test 5 failed: {res5}"
    print(f"Test 5 Passed: 32-bit extremes -> {res5}")

    print("\nAll Single Number III tests passed successfully!")
