r"""
====================================================================
Problem: Split Array into Consecutive Subsequences (LeetCode 659)
Difficulty: Medium
Topic: Array, Hash Table, Greedy, Heap (Priority Queue)
====================================================================

You are given an integer array nums that is sorted in non-decreasing order.

Determine if it is possible to split nums into one or more subsequences
such that both of the following conditions are true:
1. Each subsequence is a consecutive increasing sequence (i.e. each integer
   is exactly 1 more than the previous integer).
2. All subsequences have a length of 3 or more.

Return true if you can split nums according to the above conditions,
or false otherwise.

A subsequence of an array is a new array that is formed from the original
array by deleting some (can be none) of the elements without disturbing
the relative positions of the remaining elements.

Example 1:
Input: nums = [1,2,3,3,4,5]
Output: true
Explanation: nums can be split into:
[1,2,3]
[3,4,5]

Example 2:
Input: nums = [1,2,3,3,4,4,5,5]
Output: true
Explanation: nums can be split into:
[1,2,3,4,5]
[3,4,5]

Example 3:
Input: nums = [1,2,3,4,4,5]
Output: false
Explanation: It is impossible to split nums into consecutive increasing
subsequences of length 3 or more.

Constraints:
- 1 <= nums.length <= 10^4
- -1000 <= nums[i] <= 1000
- nums is sorted in non-decreasing order.
====================================================================
"""

from collections import Counter
from typing import List


class Solution:
    def isPossible(self, nums: List[int]) -> bool:
        """
        Greedy approach prioritizing extending existing valid subsequences
        over starting new ones.

        Complexity:
        - Time: O(N) single pass through the array
        - Space: O(N) for frequency and subsequence tail hash maps
        """
        counts = Counter(nums)
        tails = Counter()  # tails[x] = count of valid subsequences ending at x

        for x in nums:
            if counts[x] == 0:
                continue

            counts[x] -= 1

            # Option 1: Append x to an existing subsequence ending at x - 1
            if tails[x - 1] > 0:
                tails[x - 1] -= 1
                tails[x] += 1
            # Option 2: Form a new subsequence of length 3 [x, x+1, x+2]
            elif counts[x + 1] > 0 and counts[x + 2] > 0:
                counts[x + 1] -= 1
                counts[x + 2] -= 1
                tails[x + 2] += 1
            # Cannot place x into any valid subsequence
            else:
                return False

        return True


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: [1,2,3,3,4,5] -> True
    assert sol.isPossible([1, 2, 3, 3, 4, 5]) is True, "Test 1 failed"

    # Test 2: [1,2,3,3,4,4,5,5] -> True
    assert sol.isPossible([1, 2, 3, 3, 4, 4, 5, 5]) is True, "Test 2 failed"

    # Test 3: [1,2,3,4,4,5] -> False
    assert sol.isPossible([1, 2, 3, 4, 4, 5]) is False, "Test 3 failed"

    # Test 4: Single valid triplet [10, 11, 12] -> True
    assert sol.isPossible([10, 11, 12]) is True, "Test 4 failed"

    # Test 5: Length less than 3 -> False
    assert sol.isPossible([1, 2]) is False, "Test 5 failed"

    print("All Split Array into Consecutive Subsequences tests passed successfully!")
