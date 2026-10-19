"""
====================================================================
Problem: Perfect Squares (LeetCode 279)
Difficulty: Medium
Topic: Math, Dynamic Programming, Breadth-First Search
====================================================================

Given an integer n, return the least number of perfect square numbers
that sum to n.

A perfect square is an integer that is the square of an integer; in
other words, it is the product of some integer with itself. For
example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

Example 1:
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.

Example 2:
Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.

Constraints:
- 1 <= n <= 10^4
====================================================================
"""

import math

class Solution:
    def numSquares(self, n: int) -> int:
        """
        Calculates least number of perfect squares summing to n.
        Can be solved via Dynamic Programming / Legendre's Three-Square Theorem.
        By Lagrange's Four-Square Theorem, every natural number is sum of four squares:
          Ans is 4 iff n = 4^k * (8m + 7).
          Ans is 1 iff n is a perfect square.
          Ans is 2 iff n = a^2 + b^2.
          Otherwise, ans is 3.

        Time Complexity: O(sqrt(n)) using Legendre's Theorem (or O(n * sqrt(n)) DP)
        Space Complexity: O(1) auxiliary space
        """
        # Check if n is of the form 4^k * (8m + 7)
        temp = n
        while temp % 4 == 0:
            temp //= 4
        if temp % 8 == 7:
            return 4

        # Check if n is a perfect square (ans = 1)
        r = int(math.isqrt(n))
        if r * r == n:
            return 1

        # Check if n can be represented as sum of two squares (ans = 2)
        for i in range(1, r + 1):
            j_sq = n - i * i
            j = int(math.isqrt(j_sq))
            if j * j == j_sq:
                return 2

        # Otherwise by exclusion, ans = 3
        return 3


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: n = 12 (4 + 4 + 4) -> 3
    assert solver.numSquares(12) == 3, "Test 1 failed"
    print("Test 1 Passed: n=12 -> 3 (4 + 4 + 4)")

    # Test 2: n = 13 (4 + 9) -> 2
    assert solver.numSquares(13) == 2, "Test 2 failed"
    print("Test 2 Passed: n=13 -> 2 (4 + 9)")

    # Test 3: Perfect square: n = 16 -> 1
    assert solver.numSquares(16) == 1, "Test 3 failed"
    print("Test 3 Passed: n=16 -> 1 (16)")

    # Test 4: n = 1 -> 1
    assert solver.numSquares(1) == 1, "Test 4 failed"
    print("Test 4 Passed: n=1 -> 1")

    # Test 5: Form 4^k * (8m + 7): n = 7 -> 4
    assert solver.numSquares(7) == 4, "Test 5 failed"
    print("Test 5 Passed: n=7 -> 4 (4 + 1 + 1 + 1)")

    # Test 6: Form 4 * 7 = 28 -> 4
    assert solver.numSquares(28) == 4, "Test 6 failed"
    print("Test 6 Passed: n=28 -> 4")

    # Test 7: n = 9999
    res = solver.numSquares(9999)
    assert res == 4, f"Test 7 failed: {res}"
    print(f"Test 7 Passed: n=9999 -> {res}")

    print("\nAll Perfect Squares tests passed successfully!")
