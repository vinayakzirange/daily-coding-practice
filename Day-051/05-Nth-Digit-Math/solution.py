"""
====================================================================
Problem: Nth Digit (LeetCode 400)
Difficulty: Medium
Topic: Math, Binary Search
====================================================================

Given an integer n, return the nth digit of the infinite integer
sequence [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...].

Example 1:
Input: n = 3
Output: 3

Example 2:
Input: n = 11
Output: 0
Explanation: The 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...
is a 0, which is part of the number 10.

Constraints:
- 1 <= n <= 2^31 - 1
====================================================================
"""

class Solution:
    def findNthDigit(self, n: int) -> int:
        """
        Mathematical bucket analysis:
        1-digit numbers: 1 to 9 (9 numbers, 9 * 1 = 9 digits)
        2-digit numbers: 10 to 99 (90 numbers, 90 * 2 = 180 digits)
        3-digit numbers: 100 to 999 (900 numbers, 900 * 3 = 2700 digits)
        k-digit numbers: 9 * 10^(k-1) numbers, 9 * 10^(k-1) * k digits

        1. Subtract total digits per digit-length bucket until n falls within the current bucket.
        2. Identify the exact number: start_number + (n - 1) // digit_len.
        3. Identify the exact digit index: (n - 1) % digit_len.

        Time Complexity: O(log10(n))
        Space Complexity: O(1)
        """
        digit_len = 1
        count = 9
        start = 1

        while n > digit_len * count:
            n -= digit_len * count
            digit_len += 1
            count *= 10
            start *= 10

        # Find the specific number
        number = start + (n - 1) // digit_len
        # Find the specific digit within that number
        digit_idx = (n - 1) % digit_len

        return int(str(number)[digit_idx])


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: n = 3 -> 3
    assert solver.findNthDigit(3) == 3, "Test 1 failed"
    print("Test 1 Passed: n=3 -> 3")

    # Test 2: n = 11 -> 0
    assert solver.findNthDigit(11) == 0, "Test 2 failed"
    print("Test 2 Passed: n=11 -> 0 (from 10)")

    # Test 3: n = 12 -> 1
    assert solver.findNthDigit(12) == 1, "Test 3 failed"
    print("Test 3 Passed: n=12 -> 1 (from 11)")

    # Test 4: n = 1 -> 1
    assert solver.findNthDigit(1) == 1, "Test 4 failed"
    print("Test 4 Passed: n=1 -> 1")

    # Test 5: n = 9 -> 9
    assert solver.findNthDigit(9) == 9, "Test 5 failed"
    print("Test 5 Passed: n=9 -> 9")

    # Test 6: n = 10 -> 1
    assert solver.findNthDigit(10) == 1, "Test 6 failed"
    print("Test 6 Passed: n=10 -> 1 (from 10)")

    # Test 7: Large n: 1000000000
    res_large = solver.findNthDigit(1000000000)
    assert res_large == 1, f"Test 7 failed: {res_large}"
    print(f"Test 7 Passed: n=1,000,000,000 -> {res_large}")

    print("\nAll Nth Digit tests passed successfully!")
