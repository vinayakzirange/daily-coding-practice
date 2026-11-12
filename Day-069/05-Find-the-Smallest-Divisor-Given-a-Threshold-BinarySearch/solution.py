"""
Problem: Find the Smallest Divisor Given a Threshold (LeetCode 1283)
Difficulty: Medium
Language: Python

Given an array of integers nums and an integer threshold, we will choose a positive integer divisor,
divide all the array by it, and sum the division's result.
Find the smallest divisor such that the result mentioned above is less than or equal to threshold.

Each result of division is rounded to the nearest integer greater than or equal to that element.
(For example: 7/3 = 3 and 10/2 = 5).

The test cases are generated so that there will be an answer.

Example 1:
    Input: nums = [1,2,5,9], threshold = 6
    Output: 5
    Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1. 
                 If the divisor is 4 we get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2).

Example 2:
    Input: nums = [44,22,33,11,1], threshold = 5
    Output: 44

Constraints:
    1 <= nums.length <= 5 * 10^4
    1 <= nums[i] <= 10^6
    nums.length <= threshold <= 10^6
"""

from typing import List


class Solution:
    def smallestDivisor(self, nums: List[int], threshold: int) -> int:
        """
        Finds smallest divisor using Binary Search on the Answer.
        
        Complexity:
            Time: O(N * log(max(nums))) - Binary search over [1..10^6] with O(N) evaluation per step.
            Space: O(1) - Constant auxiliary space.
        """
        left = 1
        right = max(nums)
        ans = right

        while left <= right:
            mid = (left + right) // 2

            # Compute sum of ceil(num / mid) = (num + mid - 1) // mid
            total_sum = sum((num + mid - 1) // mid for num in nums)

            if total_sum <= threshold:
                ans = mid
                right = mid - 1  # Try finding an even smaller divisor
            else:
                left = mid + 1   # Divisor too small, sum exceeded threshold

        return ans


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.smallestDivisor([1, 2, 5, 9], 6) == 5, f"Test 1 Failed: {sol.smallestDivisor([1, 2, 5, 9], 6)}"

    # Test 2: Example 2
    assert sol.smallestDivisor([44, 22, 33, 11, 1], 5) == 44, "Test 2 Failed"

    # Test 3: Large threshold allows divisor 1
    assert sol.smallestDivisor([2, 3, 5, 7, 11], 100) == 1, "Test 3 Failed"

    # Test 4: Single element
    assert sol.smallestDivisor([19], 5) == 4, "Test 4 Failed"

    # Test 5: All elements identical
    # [5, 5, 5, 5], threshold = 4 -> divisor 5 gives 1+1+1+1 = 4
    assert sol.smallestDivisor([5, 5, 5, 5], 4) == 5, "Test 5 Failed"

    print("All Find the Smallest Divisor Given a Threshold tests passed successfully!")
