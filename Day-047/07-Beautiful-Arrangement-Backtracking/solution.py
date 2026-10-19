"""
====================================================================
Problem: Beautiful Arrangement (LeetCode 526)
Difficulty: Medium
Topic: Array, Dynamic Programming, Backtracking, Bit Manipulation, Bitmask
====================================================================

Suppose you have n integers labeled 1 through n. A permutation of those
n integers perm (1-indexed) is considered a beautiful arrangement if for
every i (1 <= i <= n), either of the following is true:
- perm[i] is divisible by i.
- i is divisible by perm[i].

Given an integer n, return the number of the beautiful arrangements that
you can construct.

Example 1:
Input: n = 2
Output: 2
Explanation: 
The first beautiful arrangement is [1,2]:
    - perm[1]=1 is divisible by i=1
    - perm[2]=2 is divisible by i=2
The second beautiful arrangement is [2,1]:
    - perm[1]=2 is divisible by i=1
    - i=2 is divisible by perm[2]=1

Example 2:
Input: n = 1
Output: 1

Constraints:
- 1 <= n <= 15
====================================================================
"""

class Solution:
    def countArrangement(self, n: int) -> int:
        """
        Calculates number of beautiful arrangements using Backtracking with Bitmask DP.
        mask represents which numbers from 1 to n have been placed.
        At step pos (from 1 to n), we try placing every unplaced number num (1 to n)
        such that num % pos == 0 or pos % num == 0.

        Time Complexity: O(k) where k << n! (for n=15, explores only valid branches)
        Space Complexity: O(2^n) with memoization table
        """
        memo = {}

        def dfs(pos: int, mask: int) -> int:
            if pos > n:
                return 1

            state = (pos, mask)
            if state in memo:
                return memo[state]

            total = 0
            for num in range(1, n + 1):
                # If num is not yet used
                if not (mask & (1 << (num - 1))):
                    if num % pos == 0 or pos % num == 0:
                        total += dfs(pos + 1, mask | (1 << (num - 1)))

            memo[state] = total
            return total

        return dfs(1, 0)


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: n = 2 -> 2
    assert solver.countArrangement(2) == 2, "Test 1 failed"
    print("Test 1 Passed: n=2 -> 2")

    # Test 2: n = 1 -> 1
    assert solver.countArrangement(1) == 1, "Test 2 failed"
    print("Test 2 Passed: n=1 -> 1")

    # Test 3: n = 3 -> 3 ([1,2,3], [2,1,3], [3,2,1])
    assert solver.countArrangement(3) == 3, "Test 3 failed"
    print("Test 3 Passed: n=3 -> 3")

    # Test 4: n = 4 -> 8
    assert solver.countArrangement(4) == 8, "Test 4 failed"
    print("Test 4 Passed: n=4 -> 8")

    # Test 5: n = 5 -> 10
    assert solver.countArrangement(5) == 10, "Test 5 failed"
    print("Test 5 Passed: n=5 -> 10")

    # Test 6: Max constraint n = 15 -> 24679
    res15 = solver.countArrangement(15)
    assert res15 == 24679, f"Test 6 failed: {res15}"
    print(f"Test 6 Passed: n=15 -> {res15}")

    print("\nAll Beautiful Arrangement tests passed successfully!")
