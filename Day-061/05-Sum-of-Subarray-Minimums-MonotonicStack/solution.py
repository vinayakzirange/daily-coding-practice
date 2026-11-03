r"""
LeetCode 907: Sum of Subarray Minimums (Medium)
https://leetcode.com/problems/sum-of-subarray-minimums/

Given an array of integers arr, find the sum of min(b), where b ranges over
every (contiguous) subarray of arr. Since the answer may be large, return the
answer modulo 10^9 + 7.

Example 1:
Input: arr = [3,1,2,4]
Output: 17
Explanation:
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4].
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.

Example 2:
Input: arr = [11,81,94,43,3]
Output: 444

Constraints:
- 1 <= arr.length <= 3 * 10^4
- 1 <= arr[i] <= 3 * 10^4
"""

from typing import List


class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        """
        Monotonic Stack Contribution Technique:
        For each element arr[i], determine how many subarrays have arr[i] as their minimum.
        To avoid duplicate counting for identical values, define boundaries:
        - left[i]: distance to previous strictly smaller element (arr[k] < arr[i])
        - right[i]: distance to next smaller or equal element (arr[k] <= arr[i])

        The total number of subarrays where arr[i] is the minimum is left[i] * right[i].
        The total sum is sum(arr[i] * left[i] * right[i]) % (10^9 + 7).

        Time Complexity: O(N) where N is len(arr) - each element pushed/popped at most once.
        Space Complexity: O(N) for stacks and boundary arrays.
        """
        MOD = 10**9 + 7
        n = len(arr)
        left = [0] * n
        right = [0] * n

        # Find distance to previous strictly smaller element
        stack = []
        for i in range(n):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()
            left[i] = i - stack[-1] if stack else i + 1
            stack.append(i)

        # Find distance to next smaller or equal element
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] > arr[i]:
                stack.pop()
            right[i] = stack[-1] - i if stack else n - i
            stack.append(i)

        total_sum = sum(arr[i] * left[i] * right[i] for i in range(n)) % MOD
        return total_sum


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: [3, 1, 2, 4] -> 17
    assert sol.sumSubarrayMins([3, 1, 2, 4]) == 17, "Test 1 Failed"

    # Test Case 2: [11, 81, 94, 43, 3] -> 444
    assert sol.sumSubarrayMins([11, 81, 94, 43, 3]) == 444, "Test 2 Failed"

    # Test Case 3: single element
    assert sol.sumSubarrayMins([7]) == 7, "Test 3 Failed"

    # Test Case 4: identical elements [2, 2, 2]
    # subarrays: [2], [2], [2], [2,2], [2,2], [2,2,2] -> all min 2 -> 6 * 2 = 12
    assert sol.sumSubarrayMins([2, 2, 2]) == 12, "Test 4 Failed"

    # Test Case 5: strictly decreasing [5, 4, 3, 2, 1]
    # mins: 5,4,3,2,1 + 4,3,2,1 + 3,2,1 + 2,1 + 1 = 15 + 10 + 6 + 3 + 1 = 35
    assert sol.sumSubarrayMins([5, 4, 3, 2, 1]) == 35, "Test 5 Failed"

    print("All Sum of Subarray Minimums tests passed successfully!")

