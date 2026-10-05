"""
Problem: Subsets II (LeetCode 90)
Difficulty: Medium
Topic: Array / Backtracking / Bit Manipulation / Handling Duplicates

Description:
Given an integer array nums that may contain duplicates, return all possible subsets
(the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

Example 2:
Input: nums = [0]
Output: [[],[0]]

Constraints:
  * 1 <= nums.length <= 10
  * -10 <= nums[i] <= 10

Complexity:
  * Time Complexity: O(n * 2^n) - There are 2^n possible subsets, copying each takes O(n).
  * Space Complexity: O(n) - Auxiliary space for the recursion stack and current path.
"""

from typing import List


class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()  # Sort to bring duplicate elements adjacent
        result = []
        path = []

        def backtrack(start: int) -> None:
            result.append(list(path))

            for i in range(start, len(nums)):
                # If current element is duplicate of previous in the same decision level, skip
                if i > start and nums[i] == nums[i - 1]:
                    continue

                path.append(nums[i])
                backtrack(i + 1)
                path.pop()

        backtrack(0)
        return result


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([1, 2, 2], [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]),
        ([0], [[], [0]]),
        ([4, 4, 4, 1, 4], None),  # Check count of subsets for heavily duplicated array
    ]

    # Test 1
    res1 = sol.subsetsWithDup([1, 2, 2])
    res1_sorted = sorted([sorted(s) for s in res1])
    exp1_sorted = sorted([sorted(s) for s in [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]])
    assert res1_sorted == exp1_sorted, f"Test 1 Failed: got {res1}"
    print(f"Test 1 Passed: nums=[1, 2, 2] -> {len(res1)} unique subsets: {res1}")

    # Test 2
    res2 = sol.subsetsWithDup([0])
    res2_sorted = sorted([sorted(s) for s in res2])
    exp2_sorted = sorted([sorted(s) for s in [[], [0]]])
    assert res2_sorted == exp2_sorted, f"Test 2 Failed: got {res2}"
    print(f"Test 2 Passed: nums=[0] -> {len(res2)} unique subsets: {res2}")

    # Test 3
    res3 = sol.subsetsWithDup([4, 4, 4, 1, 4])
    # For four 4's and one 1: (4+1)*(1+1) = 5*2 = 10 unique subsets
    assert len(res3) == 10, f"Test 3 Failed: expected 10 subsets, got {len(res3)}"
    print(f"Test 3 Passed: nums=[4, 4, 4, 1, 4] -> 10 unique subsets generated without duplicates.")

    print("\nAll Subsets II tests passed successfully!")
