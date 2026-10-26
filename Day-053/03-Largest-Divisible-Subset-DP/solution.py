r"""
====================================================================
Problem: Largest Divisible Subset (LeetCode 368)
Difficulty: Medium
Topic: Array, Math, Dynamic Programming, Sorting
====================================================================

Given a set of distinct positive integers nums, return the largest
subset answer such that every pair (answer[i], answer[j]) of elements
in this subset satisfies:
- answer[i] % answer[j] == 0, or
- answer[j] % answer[i] == 0

If there are multiple solutions, return any of them.

Example 1:
Input: nums = [1, 2, 3]
Output: [1, 2]
Explanation: [1, 3] is also accepted.

Example 2:
Input: nums = [1, 2, 4, 8]
Output: [1, 2, 4, 8]

Constraints:
- 1 <= nums.length <= 1000
- 1 <= nums[i] <= 2 * 10^9
- All the integers in nums are unique.
====================================================================
"""

from typing import List


class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        """
        Finds the largest divisible subset using dynamic programming.
        
        Complexity:
        - Time: O(n^2) where n is the length of nums
        - Space: O(n) for dp array and predecessor tracking
        """
        if not nums:
            return []

        nums.sort()
        n = len(nums)

        # dp[i] stores the length of largest divisible subset ending at nums[i]
        dp = [1] * n
        # parent[i] stores the predecessor index to reconstruct the subset
        parent = list(range(n))

        max_len = 1
        max_idx = 0

        for i in range(n):
            for j in range(i):
                if nums[i] % nums[j] == 0 and dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    parent[i] = j
            if dp[i] > max_len:
                max_len = dp[i]
                max_idx = i

        # Reconstruct the subset from max_idx
        result = []
        curr = max_idx
        while True:
            result.append(nums[curr])
            if parent[curr] == curr:
                break
            curr = parent[curr]

        result.reverse()
        return result


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: [1, 2, 3]
    res1 = sol.largestDivisibleSubset([1, 2, 3])
    assert res1 in [[1, 2], [1, 3], [2, 1], [3, 1]], f"Test 1 failed: {res1}"

    # Test 2: [1, 2, 4, 8]
    res2 = sol.largestDivisibleSubset([1, 2, 4, 8])
    assert res2 == [1, 2, 4, 8], f"Test 2 failed: {res2}"

    # Test 3: Single element
    res3 = sol.largestDivisibleSubset([42])
    assert res3 == [42], f"Test 3 failed: {res3}"

    # Test 4: Disjoint multiples [4, 8, 10, 240]
    res4 = sol.largestDivisibleSubset([4, 8, 10, 240])
    # 4 -> 8 -> 240 is length 3
    assert len(res4) == 3, f"Test 4 length failed: {res4}"
    for i in range(len(res4)):
        for j in range(i + 1, len(res4)):
            assert res4[j] % res4[i] == 0 or res4[i] % res4[j] == 0

    print("All Largest Divisible Subset tests passed successfully!")
