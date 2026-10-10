"""
Problem: Combination Sum III (LeetCode 216)
Difficulty: Medium
Topic: Array / Backtracking / Combination

Description:
Find all valid combinations of k numbers that sum up to n such that the following
conditions are true:
  * Only numbers 1 through 9 are used.
  * Each number is used at most once.

Return a list of all possible valid combinations. The list must not contain the same
combination twice, and the combinations may be returned in any order.

Example 1:
Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.

Example 2:
Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.

Example 3:
Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations.
Using 4 different numbers in the range [1,9], the smallest possible sum is 1+2+3+4 = 10,
which is greater than 1.

Constraints:
  * 2 <= k <= 9
  * 1 <= n <= 60

Complexity:
  * Time Complexity: O(C(9, k) * k) - Bound by choosing k digits from 9.
  * Space Complexity: O(k) - Auxiliary space for the recursion stack and current combination path.
"""

from typing import List


class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        result = []
        path = []

        def backtrack(start: int, remain: int) -> None:
            # If path has reached size k
            if len(path) == k:
                if remain == 0:
                    result.append(list(path))
                return

            # Prune if remaining needed sum is negative
            if remain < 0:
                return

            for num in range(start, 10):
                # If the single number exceeds remaining sum, further numbers will too
                if num > remain:
                    break

                path.append(num)
                backtrack(num + 1, remain - num)
                path.pop()

        backtrack(1, n)
        return result


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        (3, 7, [[1, 2, 4]]),
        (3, 9, [[1, 2, 6], [1, 3, 5], [2, 3, 4]]),
        (4, 1, []),
        (2, 18, []),
        (9, 45, [[1, 2, 3, 4, 5, 6, 7, 8, 9]]),
    ]

    for idx, (k_val, n_val, expected) in enumerate(test_cases, 1):
        res = sol.combinationSum3(k_val, n_val)
        res_sorted = sorted([sorted(c) for c in res])
        exp_sorted = sorted([sorted(c) for c in expected])
        assert res_sorted == exp_sorted, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: k={k_val}, n={n_val} -> combinations = {res}")

    print("\nAll Combination Sum III tests passed successfully!")
