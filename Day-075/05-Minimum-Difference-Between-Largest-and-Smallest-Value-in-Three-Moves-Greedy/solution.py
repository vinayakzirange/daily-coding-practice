"""
Problem: Minimum Difference Between Largest and Smallest Value in Three Moves (LeetCode 1509)
Difficulty: Medium
Category: Array / Greedy / Sorting

Description:
You are given an integer array nums.

In one move, you can choose one element of nums and change it to any value.

Return the minimum difference between the largest and smallest value of nums
after performing at most three moves.

Example 1:
    Input: nums = [5,3,2,4]
    Output: 0
    Explanation: We can make at most 3 moves.
                 In the first move, change 2 to 3. nums becomes [5,3,3,4].
                 In the second move, change 4 to 3. nums becomes [5,3,3,3].
                 In the third move, change 5 to 3. nums becomes [3,3,3,3].
                 The difference between the largest and smallest value is 3 - 3 = 0.

Example 2:
    Input: nums = [1,5,0,10,14]
    Output: 1
    Explanation: We can make at most 3 moves.
                 In the first move, change 5 to 0. nums becomes [1,0,0,10,14].
                 In the second move, change 10 to 0. nums becomes [1,0,0,0,14].
                 In the third move, change 14 to 1. nums becomes [1,0,0,0,1].
                 The difference between the largest and smallest value is 1 - 0 = 1.

Example 3:
    Input: nums = [3,100,20]
    Output: 0

Constraints:
    - 1 <= nums.length <= 10^5
    - -10^9 <= nums[i] <= 10^9
"""

from typing import List


class Solution:
    def minDifference(self, nums: List[int]) -> int:
        """
        Finds the minimum difference between max and min values after at most 3 moves.

        Simple Greedy Insight:
        - If len(nums) <= 4, we can change all but one element to match that element, giving diff 0.
        - Otherwise, after sorting nums, each move should greedily eliminate an extreme value
          (either the smallest or largest).
        - With 3 moves, there are exactly 4 possible choices:
            1. Remove 3 largest: diff is nums[-4] - nums[0]
            2. Remove 2 largest, 1 smallest: diff is nums[-3] - nums[1]
            3. Remove 1 largest, 2 smallest: diff is nums[-2] - nums[2]
            4. Remove 3 smallest: diff is nums[-1] - nums[3]

        Time Complexity: O(n log n)
        Space Complexity: O(1) auxiliary
        """
        if len(nums) <= 4:
            return 0

        nums.sort()

        return min(
            nums[-4] - nums[0],
            nums[-3] - nums[1],
            nums[-2] - nums[2],
            nums[-1] - nums[3]
        )


def run_tests():
    sol = Solution()

    # Test 1: Example 1 (4 elements -> 0)
    assert sol.minDifference([5, 3, 2, 4]) == 0, "Test 1 Failed"

    # Test 2: Example 2
    assert sol.minDifference([1, 5, 0, 10, 14]) == 1, "Test 2 Failed"

    # Test 3: Example 3 (3 elements -> 0)
    assert sol.minDifference([3, 100, 20]) == 0, "Test 3 Failed"

    # Test 4: Single element
    assert sol.minDifference([10]) == 0, "Test 4 Failed"

    # Test 5: Six elements: [6, 6, 0, 1, 1, 4, 6]
    assert sol.minDifference([6, 6, 0, 1, 1, 4, 6]) == 2, "Test 5 Failed"

    print("All tests passed for 05-Minimum-Difference-Between-Largest-and-Smallest-Value-in-Three-Moves-Greedy!")


if __name__ == "__main__":
    run_tests()
