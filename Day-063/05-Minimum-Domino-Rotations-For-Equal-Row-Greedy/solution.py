r"""
LeetCode 1007: Minimum Domino Rotations For Equal Row (Medium)
https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/

In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the ith domino.
(A domino may be rotated so tops[i] and bottoms[i] swap values).

Return the minimum number of rotations so that all the values in tops are the same,
or all the values in bottoms are the same.

If it cannot be done, return -1.

Example 1:
Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Output: 2
Explanation:
The first figure represents the dominoes as given by tops and bottoms: before we do any rotations.
If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2.

Example 2:
Input: tops = [3,5,1,2,3], bottoms = [3,6,3,3,4]
Output: -1
Explanation:
In this case, it is not possible to make every value in either row equal to 3.

Constraints:
- 2 <= tops.length <= 2 * 10^4
- bottoms.length == tops.length
- 1 <= tops[i], bottoms[i] <= 6
"""

from typing import List


class Solution:
    def minDominoRotations(self, tops: List[int], bottoms: List[int]) -> int:
        """
        Greedy Invariant Observation:
        If a solution exists where all dominos have the same value x, then x MUST
        be present on the first domino (i.e. x is either tops[0] or bottoms[0]).

        We can test target candidates tops[0] and bottoms[0]:
        For a given candidate target:
          - If for any domino neither tops[i] nor bottoms[i] equals target, target is invalid.
          - Otherwise, count how many rotations are needed to make tops all target (rotations_a)
            and bottoms all target (rotations_b).
          - The cost for this candidate is min(rotations_a, rotations_b).

        Time Complexity: O(N) where N is len(tops).
        Space Complexity: O(1).
        """
        def check(target: int) -> int:
            rotations_tops = 0
            rotations_bottoms = 0

            for t, b in zip(tops, bottoms):
                if t != target and b != target:
                    return -1
                if t != target:
                    rotations_tops += 1
                if b != target:
                    rotations_bottoms += 1

            return min(rotations_tops, rotations_bottoms)

        res = check(tops[0])
        if res != -1 or tops[0] == bottoms[0]:
            return res
        return check(bottoms[0])


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: Example 1
    assert sol.minDominoRotations([2, 1, 2, 4, 2, 2], [5, 2, 6, 2, 3, 2]) == 2, "Test 1 Failed"

    # Test Case 2: Example 2
    assert sol.minDominoRotations([3, 5, 1, 2, 3], [3, 6, 3, 3, 4]) == -1, "Test 2 Failed"

    # Test Case 3: Already identical rows
    assert sol.minDominoRotations([1, 1, 1], [2, 2, 2]) == 0, "Test 3 Failed"

    # Test Case 4: Target on bottoms[0]
    assert sol.minDominoRotations([1, 2, 3, 4], [5, 5, 5, 5]) == 0, "Test 4 Failed"

    # Test Case 5: 2 elements single rotation
    assert sol.minDominoRotations([1, 2], [2, 1]) == 1, "Test 5 Failed"

    print("All Minimum Domino Rotations For Equal Row tests passed successfully!")

