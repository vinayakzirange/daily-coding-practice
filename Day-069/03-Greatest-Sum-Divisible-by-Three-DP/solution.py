"""
Problem: Greatest Sum Divisible by Three (LeetCode 1262)
Difficulty: Medium
Language: Python

Given an integer array nums, return the maximum possible sum of elements
of the array such that it is divisible by three.

Example 1:
    Input: nums = [3,6,5,1,8]
    Output: 18
    Explanation: Pick numbers 3, 6, 1, 8; their sum is 18 (maximum sum divisible by 3).

Example 2:
    Input: nums = [4]
    Output: 0
    Explanation: Since 4 is not divisible by 3, do not pick any number.

Example 3:
    Input: nums = [1,2,3,4,4]
    Output: 12
    Explanation: Pick numbers 1, 3, 4, 4; their sum is 12 (maximum sum divisible by 3).

Constraints:
    1 <= nums.length <= 4 * 10^4
    1 <= nums[i] <= 10^4
"""

from typing import List


class Solution:
    def maxSumDivThree(self, nums: List[int]) -> int:
        """
        Calculates the maximum sum divisible by three using 3-state Dynamic Programming.
        
        Complexity:
            Time: O(N) - Single pass over nums with constant 3-state transitions.
            Space: O(1) - Constant auxiliary space for remainder state table [0, 1, 2].
        """
        # dp[r] stores maximum sum whose remainder modulo 3 is r
        dp = [0, float('-inf'), float('-inf')]

        for x in nums:
            next_dp = list(dp)
            for r in range(3):
                new_r = (r + x) % 3
                if dp[r] + x > next_dp[new_r]:
                    next_dp[new_r] = dp[r] + x
            dp = next_dp

        return int(dp[0])


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.maxSumDivThree([3, 6, 5, 1, 8]) == 18, f"Test 1 Failed: {sol.maxSumDivThree([3, 6, 5, 1, 8])}"

    # Test 2: Example 2
    assert sol.maxSumDivThree([4]) == 0, f"Test 2 Failed: {sol.maxSumDivThree([4])}"

    # Test 3: Example 3
    assert sol.maxSumDivThree([1, 2, 3, 4, 4]) == 12, f"Test 3 Failed: {sol.maxSumDivThree([1, 2, 3, 4, 4])}"

    # Test 4: All numbers divisible by 3
    assert sol.maxSumDivThree([3, 6, 9, 12]) == 30, "Test 4 Failed"

    # Test 5: Pair of remainders 1 and 2 cancel out
    assert sol.maxSumDivThree([1, 2]) == 3, "Test 5 Failed"

    # Test 6: Three remainders of 1 cancel out
    assert sol.maxSumDivThree([1, 1, 1]) == 3, "Test 6 Failed"

    print("All Greatest Sum Divisible by Three tests passed successfully!")
