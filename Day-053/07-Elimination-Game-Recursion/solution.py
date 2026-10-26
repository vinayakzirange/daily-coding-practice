r"""
====================================================================
Problem: Elimination Game (LeetCode 390)
Difficulty: Medium
Topic: Math, Recursion
====================================================================

You have a list arr of all integers in the range [1, n] sorted in a
strictly increasing order. Apply the following algorithm on arr:
- Starting from left to right, remove the first number and every other
  number even after that, until you reach the end of the list.
- Repeat the previous step, but this time from right to left, remove the
  rightmost number and every other number from the remaining numbers.
- Keep repeating the steps alternatively, from left to right and right
  to left, until a single number remains.

Given the integer n, return the last number that remains in arr.

Example 1:
Input: n = 9
Output: 6
Explanation:
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
arr = [2, 4, 6, 8]
arr = [2, 6]
arr = [6]

Example 2:
Input: n = 1
Output: 1

Constraints:
- 1 <= n <= 10^9
====================================================================
"""


class Solution:
    def lastRemaining(self, n: int) -> int:
        """
        Calculates the last remaining number by tracking the head element.
        
        Complexity:
        - Time: O(log n) as remaining elements are halved each round
        - Space: O(1) auxiliary space
        """
        head = 1
        step = 1
        remaining = n
        left_to_right = True

        while remaining > 1:
            # Head shifts if moving left-to-right OR if moving right-to-left with odd remaining count
            if left_to_right or remaining % 2 == 1:
                head += step

            remaining //= 2
            step *= 2
            left_to_right = not left_to_right

        return head


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: n = 9 -> 6
    assert sol.lastRemaining(9) == 6, f"Test 1 failed: {sol.lastRemaining(9)}"

    # Test 2: n = 1 -> 1
    assert sol.lastRemaining(1) == 1, f"Test 2 failed: {sol.lastRemaining(1)}"

    # Test 3: n = 8
    # [1, 2, 3, 4, 5, 6, 7, 8] -> [2, 4, 6, 8] -> [2, 6] -> [6]
    assert sol.lastRemaining(8) == 6, f"Test 3 failed: {sol.lastRemaining(8)}"

    # Test 4: n = 24
    assert sol.lastRemaining(24) == 14, f"Test 4 failed: {sol.lastRemaining(24)}"

    # Test 5: Large n = 10^9 (must complete in O(log n))
    res_large = sol.lastRemaining(10**9)
    assert isinstance(res_large, int) and res_large > 0, "Test 5 failed"

    print("All Elimination Game tests passed successfully!")
