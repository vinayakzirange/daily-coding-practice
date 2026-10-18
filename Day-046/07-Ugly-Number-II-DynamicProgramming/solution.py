"""
====================================================================
Problem: Ugly Number II (LeetCode 264)
Difficulty: Medium
Topic: Hash Table, Math, Dynamic Programming, Heap (Priority Queue)
====================================================================

An ugly number is a positive integer whose prime factors are limited
to 2, 3, and 5.

Given an integer n, return the nth ugly number.

Example 1:
Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the
first 10 ugly numbers.

Example 2:
Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors
are limited to 2, 3, and 5.

Constraints:
- 1 <= n <= 1690
====================================================================
"""

class Solution:
    def nthUglyNumber(self, n: int) -> int:
        """
        Three-pointer dynamic programming approach.
        Every ugly number is formed by multiplying an earlier ugly number by 2, 3, or 5.
        We maintain pointers p2, p3, p5 pointing to indices in ugly_numbers array.
        Next ugly number is min(ugly[p2]*2, ugly[p3]*3, ugly[p5]*5).
        Advance all pointers whose generated candidate equals the minimum (deduplication).

        Time Complexity: O(n)
        Space Complexity: O(n) to store ugly numbers
        """
        ugly = [0] * n
        ugly[0] = 1

        p2 = p3 = p5 = 0

        for i in range(1, n):
            next2 = ugly[p2] * 2
            next3 = ugly[p3] * 3
            next5 = ugly[p5] * 5

            next_ugly = min(next2, next3, next5)
            ugly[i] = next_ugly

            if next_ugly == next2:
                p2 += 1
            if next_ugly == next3:
                p3 += 1
            if next_ugly == next5:
                p5 += 1

        return ugly[n - 1]


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: n = 10 -> 12
    assert solver.nthUglyNumber(10) == 12, "Test 1 failed"
    print("Test 1 Passed: n=10 -> 12")

    # Test 2: n = 1 -> 1
    assert solver.nthUglyNumber(1) == 1, "Test 2 failed"
    print("Test 2 Passed: n=1 -> 1")

    # Test 3: n = 11 -> 15
    assert solver.nthUglyNumber(11) == 15, "Test 3 failed"
    print("Test 3 Passed: n=11 -> 15")

    # Test 4: n = 14 -> 20
    assert solver.nthUglyNumber(14) == 20, "Test 4 failed"
    print("Test 4 Passed: n=14 -> 20")

    # Test 5: n = 15 -> 24
    assert solver.nthUglyNumber(15) == 24, "Test 5 failed"
    print("Test 5 Passed: n=15 -> 24")

    # Test 6: Upper bound n = 1690
    res_1690 = solver.nthUglyNumber(1690)
    assert res_1690 == 2123366400, f"Test 6 failed: {res_1690}"
    print(f"Test 6 Passed: n=1690 -> {res_1690}")

    print("\nAll Ugly Number II tests passed successfully!")
