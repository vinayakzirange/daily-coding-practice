r"""
LeetCode 930: Binary Subarrays With Sum (Medium)
https://leetcode.com/problems/binary-subarrays-with-sum/

Given a binary array nums and an integer goal, return the number of non-empty
subarrays with a sum equal to goal.

A subarray is a contiguous part of the array.

Example 1:
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded below:
- [1,0,1]
- [1,0,1,0]
- [0,1,0,1]
- [1,0,1]

Example 2:
Input: nums = [0,0,0,0,0], goal = 0
Output: 15

Constraints:
- 1 <= nums.length <= 3 * 10^4
- nums[i] is either 0 or 1.
- 0 <= goal <= nums.length
"""

from typing import List
from collections import defaultdict


class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        """
        Prefix Sum with Frequency Hash Map:
        A subarray nums[i..j] has sum == goal iff:
            prefix_sum[j] - prefix_sum[i-1] == goal
            => prefix_sum[i-1] == prefix_sum[j] - goal

        We iterate through nums, tracking the cumulative prefix sum.
        At each index j, the number of valid starting indices i is the count of
        previous prefix sums equal to (curr_sum - goal).

        Time Complexity: O(N) where N is len(nums).
        Space Complexity: O(N) to store prefix sum frequencies.
        """
        prefix_counts = defaultdict(int)
        prefix_counts[0] = 1  # Base case: empty prefix has sum 0
        curr_sum = 0
        total_subarrays = 0

        for num in nums:
            curr_sum += num
            target = curr_sum - goal
            total_subarrays += prefix_counts[target]
            prefix_counts[curr_sum] += 1

        return total_subarrays


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: [1, 0, 1, 0, 1], goal = 2 -> 4
    assert sol.numSubarraysWithSum([1, 0, 1, 0, 1], 2) == 4, "Test 1 Failed"

    # Test Case 2: [0, 0, 0, 0, 0], goal = 0 -> 15
    assert sol.numSubarraysWithSum([0, 0, 0, 0, 0], 0) == 15, "Test 2 Failed"

    # Test Case 3: single 1, goal 1
    assert sol.numSubarraysWithSum([1], 1) == 1, "Test 3 Failed"

    # Test Case 4: single 0, goal 1
    assert sol.numSubarraysWithSum([0], 1) == 0, "Test 4 Failed"

    # Test Case 5: all 1s, goal 2
    # [1, 1, 1, 1], subarrays of len 2: [1,1] at (0,1), (1,2), (2,3) -> 3
    assert sol.numSubarraysWithSum([1, 1, 1, 1], 2) == 3, "Test 5 Failed"

    print("All Binary Subarrays With Sum tests passed successfully!")

