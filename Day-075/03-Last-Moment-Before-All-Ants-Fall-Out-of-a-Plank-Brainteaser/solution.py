"""
Problem: Last Moment Before All Ants Fall Out of a Plank (LeetCode 1503)
Difficulty: Medium
Category: Brainteaser / Simulation / Math

Description:
We have a wooden plank of the length n units. Some ants are walking on the plank,
each ant moves with a speed of 1 unit per second. Some of the ants move to the
left, the other move to the right.

When two ants moving in two different directions meet at some point, they change
their directions and continue moving again. Assume changing directions does not
take any additional time.

When an ant reaches one end of the plank at time t, it falls out of the plank
immediately.

Given an integer n and two integer arrays left and right, the positions of the ants
moving to the left and the right, return the moment when the last ant(s) fall out of the plank.

Example 1:
    Input: n = 4, left = [4,3], right = [0,1]
    Output: 4
    Explanation: In the image above:
                 -The ant at index 0 moves to the right and falls out at time 4.
                 -The ant at index 1 moves to the right and falls out at time 3.
                 -The ant at index 3 moves to the left and falls out at time 3.
                 -The ant at index 4 moves to the left and falls out at time 4.
                 So the last ant falls out at time 4.

Example 2:
    Input: n = 7, left = [], right = [0,1,2,3,4,5,6,7]
    Output: 7

Example 3:
    Input: n = 7, left = [0,1,2,3,4,5,6,7], right = []
    Output: 7

Constraints:
    - 1 <= n <= 10^4
    - 0 <= left.length <= n + 1
    - 0 <= left[i] <= n
    - 0 <= right.length <= n + 1
    - 0 <= right[i] <= n
    - 1 <= left.length + right.length <= n + 1
    - All values of left and right are unique, and each value can appear only in left or right.
"""

from typing import List


class Solution:
    def getLastMoment(self, n: int, left: List[int], right: List[int]) -> int:
        """
        Determines the moment when the last ant falls off the plank.

        Classic Brainteaser Insight:
        When two identical ants collide and reverse directions, it is physically
        indistinguishable from the two ants simply passing through each other!
        Therefore, collisions have ZERO effect on the time taken for all ants to fall off:
        - An ant at position p moving left takes p seconds to fall off (falls off at 0).
        - An ant at position p moving right takes (n - p) seconds to fall off (falls off at n).

        The last moment is simply the maximum time any single ant takes.

        Time Complexity: O(len(left) + len(right))
        Space Complexity: O(1)
        """
        max_left_time = max(left) if left else 0
        max_right_time = max(n - pos for pos in right) if right else 0

        return max(max_left_time, max_right_time)


def run_tests():
    sol = Solution()

    # Test 1: Example 1
    assert sol.getLastMoment(4, [4, 3], [0, 1]) == 4, "Test 1 Failed"

    # Test 2: Example 2 (all moving right)
    assert sol.getLastMoment(7, [], [0, 1, 2, 3, 4, 5, 6, 7]) == 7, "Test 2 Failed"

    # Test 3: Example 3 (all moving left)
    assert sol.getLastMoment(7, [0, 1, 2, 3, 4, 5, 6, 7], []) == 7, "Test 3 Failed"

    # Test 4: Single ant moving left
    assert sol.getLastMoment(10, [6], []) == 6, "Test 4 Failed"

    # Test 5: Single ant moving right
    assert sol.getLastMoment(10, [], [3]) == 7, "Test 5 Failed"

    # Test 6: Head on collision in middle of plank n = 9: left=[5], right=[4]
    # At t = 4.5 they meet and bounce; time to fall is max(5, 9 - 4) = 5
    assert sol.getLastMoment(9, [5], [4]) == 5, "Test 6 Failed"

    print("All tests passed for 03-Last-Moment-Before-All-Ants-Fall-Out-of-a-Plank-Brainteaser!")


if __name__ == "__main__":
    run_tests()
