"""
Problem: Count Number of Nice Subarrays (LeetCode 1248)
Difficulty: Medium
Language: Python

Given an array of integers nums and an integer k. A continuous subarray is called
nice if there are k odd numbers on it.

Return the number of nice sub-arrays.

Example 1:
    Input: nums = [1,1,2,1,1], k = 3
    Output: 2
    Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].

Example 2:
    Input: nums = [2,4,6], k = 1
    Output: 0
    Explanation: There are no odd numbers in the array, so no sub-arrays can have 1 odd number.

Example 3:
    Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
    Output: 16

Constraints:
    1 <= nums.length <= 50000
    1 <= nums[i] <= 10^5
    1 <= k <= nums.length
"""

from typing import List


class Solution:
    def numberOfSubarrays(self, nums: List[int], k: int) -> int:
        """
        Counts subarrays with exactly k odd numbers using the atMost(k) - atMost(k-1) Sliding Window technique.
        
        Complexity:
            Time: O(N) - Two passes of sliding window, each pointer moves at most N times.
            Space: O(1) - Constant auxiliary memory.
        """
        def atMost(goal: int) -> int:
            if goal < 0:
                return 0
            left = 0
            odd_count = 0
            subarrays = 0

            for right in range(len(nums)):
                odd_count += nums[right] % 2

                while odd_count > goal:
                    odd_count -= nums[left] % 2
                    left += 1

                subarrays += right - left + 1

            return subarrays

        return atMost(k) - atMost(k - 1)


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.numberOfSubarrays([1, 1, 2, 1, 1], 3) == 2, "Test 1 Failed"

    # Test 2: Example 2
    assert sol.numberOfSubarrays([2, 4, 6], 1) == 0, "Test 2 Failed"

    # Test 3: Example 3
    assert sol.numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2) == 16, "Test 3 Failed"

    # Test 4: All odd numbers
    # [1, 3, 5], k = 2 -> [1, 3], [3, 5] -> 2
    assert sol.numberOfSubarrays([1, 3, 5], 2) == 2, "Test 4 Failed"

    # Test 5: Single element odd matching k=1
    assert sol.numberOfSubarrays([7], 1) == 1, "Test 5 Failed"

    print("All Count Number of Nice Subarrays tests passed successfully!")
