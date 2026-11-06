r"""
LeetCode 1052: Grumpy Bookstore Owner (Medium)
https://leetcode.com/problems/grumpy-bookstore-owner/

There is a bookstore owner that has a store open for n minutes. Every minute,
some number of customers enter the store. You are given an integer array customers of length n
where customers[i] is the number of the customer that enters the store at the start of the ith minute
and all these customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy. You are given a binary array grumpy where
grumpy[i] is 1 if the bookstore owner is grumpy during the ith minute, and is 0 otherwise.

When the bookstore owner is grumpy, the customers of that minute are not satisfied,
otherwise, they are satisfied.

The bookstore owner knows a secret technique to keep themselves not grumpy for minutes
consecutive minutes, but can only use it once.

Return the maximum number of customers that can be satisfied throughout the day.

Example 1:
Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes.
The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.

Example 2:
Input: customers = [1], grumpy = [0], minutes = 1
Output: 1

Constraints:
- n == customers.length == grumpy.length
- 1 <= minutes <= n <= 2 * 10^4
- 0 <= customers[i] <= 1000
- grumpy[i] is either 0 or 1.
"""

from typing import List


class Solution:
    def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:
        """
        Sliding Window with Baseline Customers:
        1. Calculate baseline satisfied customers: customers who enter when the owner
           is already not grumpy (grumpy[i] == 0).
        2. Use a sliding window of size `minutes` to find the maximum additional customers
           we can satisfy by activating the secret technique:
           Additional satisfied in window [i, i + minutes - 1] = sum(customers[j] * grumpy[j]).
        3. Total maximum satisfied = baseline + max_additional_satisfied.

        Time Complexity: O(N) where N is len(customers).
        Space Complexity: O(1) auxiliary space.
        """
        n = len(customers)

        # 1. Baseline satisfied customers without the secret technique
        baseline = sum(c for c, g in zip(customers, grumpy) if g == 0)

        # 2. Initial window of length `minutes`
        current_extra = sum(customers[i] * grumpy[i] for i in range(minutes))
        max_extra = current_extra

        # 3. Slide the window from minutes to n
        for i in range(minutes, n):
            current_extra += customers[i] * grumpy[i]
            current_extra -= customers[i - minutes] * grumpy[i - minutes]
            max_extra = max(max_extra, current_extra)

        return baseline + max_extra


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: Example 1
    cust1 = [1, 0, 1, 2, 1, 1, 7, 5]
    grump1 = [0, 1, 0, 1, 0, 1, 0, 1]
    assert sol.maxSatisfied(cust1, grump1, 3) == 16, "Test 1 Failed"

    # Test Case 2: Example 2
    assert sol.maxSatisfied([1], [0], 1) == 1, "Test 2 Failed"

    # Test Case 3: Owner is never grumpy -> answer is sum of all customers
    assert sol.maxSatisfied([5, 4, 3, 2, 1], [0, 0, 0, 0, 0], 2) == 15, "Test 3 Failed"

    # Test Case 4: Owner is always grumpy -> answer is max sum of window size `minutes`
    assert sol.maxSatisfied([2, 6, 6, 9], [1, 1, 1, 1], 2) == 15, "Test 4 Failed"

    # Test Case 5: Window equals entire array length
    assert sol.maxSatisfied([10, 20, 30], [1, 1, 1], 3) == 60, "Test 5 Failed"

    print("All Grumpy Bookstore Owner tests passed successfully!")

