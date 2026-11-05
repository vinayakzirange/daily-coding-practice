r"""
LeetCode 969: Pancake Sorting (Medium)
https://leetcode.com/problems/pancake-sorting/

Given an array of integers arr, sort the array by performing a series of pancake flips.

In one pancake flip we do the following steps:
- Choose an integer k where 1 <= k <= arr.length.
- Reverse the sub-array arr[0...k-1] (0-indexed).

Return an array of the k-values corresponding to a sequence of pancake flips that sort arr.
Any valid answer that sorts the array within 10 * arr.length flips will be judged as correct.

Example 1:
Input: arr = [3,2,4,1]
Output: [4,2,4,3]
Explanation:
We perform 4 pancake flips, with k values 4, 2, 4, and 3.
Starting state: arr = [3, 2, 4, 1]
After 1st flip (k = 4): arr = [1, 4, 2, 3]
After 2nd flip (k = 2): arr = [4, 1, 2, 3]
After 3rd flip (k = 4): arr = [3, 2, 1, 4]
After 4th flip (k = 3): arr = [1, 2, 3, 4], which is sorted.

Example 2:
Input: arr = [1,2,3]
Output: []
Explanation: The input is already sorted, so there is no need to flip anything.

Constraints:
- 1 <= arr.length <= 100
- 1 <= arr[i] <= arr.length
- All integers in arr are unique (i.e. arr is a permutation of integers from 1 to arr.length).
"""

from typing import List


class Solution:
    def pancakeSort(self, arr: List[int]) -> List[int]:
        """
        Greedy Placement Strategy:
        Iterate from target value val = len(arr) down to 1.
        For each val:
          1. Find current index of val.
          2. If it is already at the target index (val - 1), continue.
          3. If it is not at index 0, flip with k = index + 1 to bring it to index 0.
          4. Flip with k = val to send it to its final position (index val - 1).

        Total flips: at most 2 * N <= 200 flips (well within 10 * N limit).

        Time Complexity: O(N^2) where N is len(arr).
        Space Complexity: O(N) for storing the sequence of flips.
        """
        flips = []
        n = len(arr)

        for target in range(n, 1, -1):
            idx = arr.index(target)

            if idx == target - 1:
                continue

            if idx != 0:
                flips.append(idx + 1)
                arr[:idx + 1] = reversed(arr[:idx + 1])

            flips.append(target)
            arr[:target] = reversed(arr[:target])

        return flips


def apply_flips(arr: List[int], flips: List[int]) -> List[int]:
    a = list(arr)
    for k in flips:
        a[:k] = reversed(a[:k])
    return a


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: [3, 2, 4, 1]
    input1 = [3, 2, 4, 1]
    flips1 = sol.pancakeSort(list(input1))
    assert apply_flips(input1, flips1) == [1, 2, 3, 4], f"Test 1 Failed: {apply_flips(input1, flips1)}"
    assert len(flips1) <= 10 * len(input1)

    # Test Case 2: Already sorted [1, 2, 3] -> 0 flips
    input2 = [1, 2, 3]
    flips2 = sol.pancakeSort(list(input2))
    assert apply_flips(input2, flips2) == [1, 2, 3]
    assert len(flips2) == 0

    # Test Case 3: Reverse sorted [4, 3, 2, 1]
    input3 = [4, 3, 2, 1]
    flips3 = sol.pancakeSort(list(input3))
    assert apply_flips(input3, flips3) == [1, 2, 3, 4]

    # Test Case 4: Single element
    input4 = [1]
    flips4 = sol.pancakeSort(list(input4))
    assert apply_flips(input4, flips4) == [1]
    assert len(flips4) == 0

    print("All Pancake Sorting tests passed successfully!")

