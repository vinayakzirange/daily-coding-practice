"""
====================================================================
Problem: Sum of Two Integers (LeetCode 371)
Difficulty: Medium
Topic: Math, Bit Manipulation
====================================================================

Given two integers a and b, return the sum of the two integers
without using the operators + and -.

Example 1:
Input: a = 1, b = 2
Output: 3

Example 2:
Input: a = 2, b = 3
Output: 5

Constraints:
- -1000 <= a, b <= 1000
====================================================================
"""

class Solution:
    def getSum(self, a: int, b: int) -> int:
        """
        Computes sum of a and b using bitwise operations:
        - Sum without carry: a ^ b
        - Carry: (a & b) << 1
        In Python, integers have arbitrary precision, so we mask to 32 bits (0xFFFFFFFF)
        and convert back to signed 32-bit integer.

        Time Complexity: O(1) bounded by 32 bits
        Space Complexity: O(1)
        """
        MASK = 0xFFFFFFFF
        MAX_INT = 0x7FFFFFFF

        while b != 0:
            # Carry bits shifted left
            carry = ((a & b) << 1) & MASK
            # Sum bits without carry
            a = (a ^ b) & MASK
            b = carry

        # If a is negative in 32-bit two's complement representation
        return a if a <= MAX_INT else ~(a ^ MASK)


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: Positive numbers
    assert solver.getSum(1, 2) == 3, "Test 1 failed"
    print("Test 1 Passed: 1 + 2 = 3")

    # Test 2: 2 + 3 = 5
    assert solver.getSum(2, 3) == 5, "Test 2 failed"
    print("Test 2 Passed: 2 + 3 = 5")

    # Test 3: Positive and negative: 5 + (-3) = 2
    assert solver.getSum(5, -3) == 2, "Test 3 failed"
    print("Test 3 Passed: 5 + (-3) = 2")

    # Test 4: Both negative: -4 + (-7) = -11
    assert solver.getSum(-4, -7) == -11, "Test 4 failed"
    print("Test 4 Passed: -4 + (-7) = -11")

    # Test 5: Adding zero: 0 + (-15) = -15
    assert solver.getSum(0, -15) == -15, "Test 5 failed"
    print("Test 5 Passed: 0 + (-15) = -15")

    # Test 6: Zero sum: 100 + (-100) = 0
    assert solver.getSum(100, -100) == 0, "Test 6 failed"
    print("Test 6 Passed: 100 + (-100) = 0")

    # Test 7: Extremes within constraints: -1000 + 1000 = 0
    assert solver.getSum(-1000, 1000) == 0, "Test 7 failed"
    print("Test 7 Passed: -1000 + 1000 = 0")

    print("\nAll Sum of Two Integers tests passed successfully!")
