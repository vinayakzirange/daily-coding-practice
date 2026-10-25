r"""
====================================================================
Problem: Unique Binary Search Trees (LeetCode 96)
Difficulty: Medium
Topic: Math, Dynamic Programming, Tree, Binary Search Tree
====================================================================

Given an integer n, return the number of structurally unique BST's
(binary search trees) which have exactly n nodes of unique values
from 1 to n.

Example 1:
Input: n = 3
Output: 5
Explanation: The 5 unique BSTs are:
1         3     3      2      1
 \       /     /      / \      \
  3     2     1      1   3      2
 /     /       \                 \
2     1         2                 3

Example 2:
Input: n = 1
Output: 1

Constraints:
- 1 <= n <= 19
====================================================================
"""

class Solution:
    def numTrees(self, n: int) -> int:
        """
        Calculates the number of unique BSTs using Dynamic Programming / Catalan Numbers.
        G(n) is the number of unique BSTs of length n.
        F(i, n) is the number of unique BSTs where root is i (1 <= i <= n):
          F(i, n) = G(i - 1) * G(n - i)
        Therefore:
          G(n) = sum_{i=1}^n G(i - 1) * G(n - i)
        Base cases: G(0) = 1, G(1) = 1.

        Time Complexity: O(n^2)
        Space Complexity: O(n) for DP table
        """
        G = [0] * (n + 1)
        G[0] = 1
        G[1] = 1

        for length in range(2, n + 1):
            for root in range(1, length + 1):
                G[length] += G[root - 1] * G[length - root]

        return G[n]


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: n = 3 -> 5
    assert solver.numTrees(3) == 5, "Test 1 failed"
    print("Test 1 Passed: n=3 -> 5")

    # Test 2: n = 1 -> 1
    assert solver.numTrees(1) == 1, "Test 2 failed"
    print("Test 2 Passed: n=1 -> 1")

    # Test 3: n = 2 -> 2
    assert solver.numTrees(2) == 2, "Test 2 failed"
    print("Test 3 Passed: n=2 -> 2")

    # Test 4: n = 4 -> 14
    assert solver.numTrees(4) == 14, "Test 4 failed"
    print("Test 4 Passed: n=4 -> 14")

    # Test 5: n = 5 -> 42 (5th Catalan number)
    assert solver.numTrees(5) == 42, "Test 5 failed"
    print("Test 5 Passed: n=5 -> 42")

    # Test 6: Max constraint n = 19 -> 1767263190
    res19 = solver.numTrees(19)
    assert res19 == 1767263190, f"Test 6 failed: {res19}"
    print(f"Test 6 Passed: n=19 -> {res19}")

    print("\nAll Unique Binary Search Trees tests passed successfully!")
