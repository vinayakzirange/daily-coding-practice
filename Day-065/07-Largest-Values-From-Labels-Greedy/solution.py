r"""
LeetCode 1090: Largest Values From Labels (Medium)
https://leetcode.com/problems/largest-values-from-labels/

You are given n items, each with a value values[i] and a label labels[i]. You are also given two integers:
numWanted and useLimit.

Choose a subset of items s such that:
- The number of items in s is at most numWanted.
- For each label L, the number of items in s with label L is at most useLimit.

Return the maximum possible sum of the items in s.

Example 1:
Input: values = [5,4,3,2,1], labels = [1,1,2,2,3], numWanted = 3, useLimit = 1
Output: 9
Explanation: The subset chosen is the first, third, and fifth items with values [5, 3, 1].

Example 2:
Input: values = [5,4,3,2,1], labels = [1,3,3,3,2], numWanted = 3, useLimit = 2
Output: 12
Explanation: The subset chosen is the first, second, and third items with values [5, 4, 3].

Example 3:
Input: values = [9,8,8,7,6], labels = [0,0,0,1,1], numWanted = 3, useLimit = 1
Output: 16
Explanation: The subset chosen is the first and fourth items with values [9, 7].

Constraints:
- n == values.length == labels.length
- 1 <= n <= 2 * 10^4
- 0 <= values[i], labels[i] <= 2 * 10^4
- 1 <= numWanted, useLimit <= n
"""

from typing import List
from collections import defaultdict


class Solution:
    def largestValsFromLabels(self, values: List[int], labels: List[int], numWanted: int, useLimit: int) -> int:
        """
        Greedy Selection with Frequency Constraints:
        1. Pair each item as (value, label).
        2. Sort items descending by value to prioritize highest-value elements.
        3. Maintain a hash map tracking how many items of each label have been chosen.
        4. Greedily select items: if label count < useLimit and chosen items < numWanted,
           include the item in the subset.

        Time Complexity: O(N log N) for sorting pairs.
        Space Complexity: O(N) for storing pairs and label usage counts.
        """
        items = sorted(zip(values, labels), key=lambda x: x[0], reverse=True)

        label_counts = defaultdict(int)
        total_val = 0
        items_chosen = 0

        for val, lab in items:
            if items_chosen == numWanted:
                break
            if label_counts[lab] < useLimit:
                label_counts[lab] += 1
                total_val += val
                items_chosen += 1

        return total_val


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: Example 1 -> 9
    assert sol.largestValsFromLabels([5, 4, 3, 2, 1], [1, 1, 2, 2, 3], 3, 1) == 9, "Test 1 Failed"

    # Test Case 2: Example 2 -> 12
    assert sol.largestValsFromLabels([5, 4, 3, 2, 1], [1, 3, 3, 3, 2], 3, 2) == 12, "Test 2 Failed"

    # Test Case 3: Example 3 -> 16
    assert sol.largestValsFromLabels([9, 8, 8, 7, 6], [0, 0, 0, 1, 1], 3, 1) == 16, "Test 3 Failed"

    # Test Case 4: numWanted = 0
    assert sol.largestValsFromLabels([10, 20], [1, 2], 0, 1) == 0, "Test 4 Failed"

    # Test Case 5: all items can be taken
    assert sol.largestValsFromLabels([1, 2, 3], [1, 1, 1], 3, 3) == 6, "Test 5 Failed"

    print("All Largest Values From Labels tests passed successfully!")
