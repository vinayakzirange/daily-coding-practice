"""
Problem: Permutations II (LeetCode 47)
Difficulty: Medium
Topic: Array / Backtracking / Duplicate Handling

Description:
Given a collection of numbers, nums, that might contain duplicates, return all
possible unique permutations in any order.

Example 1:
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]

Example 2:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Constraints:
  * 1 <= nums.length <= 8
  * -10 <= nums[i] <= 10

Complexity:
  * Time Complexity: O(n * n!) - Bound by the number of unique permutations.
  * Space Complexity: O(n) - Auxiliary space for the current permutation path and frequency map.
"""

from collections import Counter
from typing import List


class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        results = []
        counts = Counter(nums)
        n = len(nums)
        path = []

        def backtrack():
            if len(path) == n:
                results.append(list(path))
                return

            for num in counts:
                if counts[num] > 0:
                    counts[num] -= 1
                    path.append(num)
                    backtrack()
                    path.pop()
                    counts[num] += 1

        backtrack()
        return results


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([1, 1, 2], [[1, 1, 2], [1, 2, 1], [2, 1, 1]]),
        ([1, 2, 3], [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]),
        ([1], [[1]]),
        ([2, 2, 2], [[2, 2, 2]]),
    ]

    for idx, (nums, expected) in enumerate(test_cases, 1):
        result = sol.permuteUnique(nums)
        sorted_res = sorted(result)
        sorted_exp = sorted(expected)
        assert sorted_res == sorted_exp, f"Test {idx} failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: nums={nums} -> {len(result)} unique permutations: {result}")

    print("\nAll Permutations II tests passed successfully!")
