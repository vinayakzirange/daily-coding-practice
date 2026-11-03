r"""
LeetCode 881: Boats to Save People (Medium)
https://leetcode.com/problems/boats-to-save-people/

You are given an array people where people[i] is the weight of the ith person,
and an infinite number of boats where each boat can carry a maximum weight of limit.
Each boat carries at most two people at the same time, provided the sum of the
weight of those people is at most limit.

Return the minimum number of boats to carry every given person.

Example 1:
Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)

Example 2:
Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)

Example 3:
Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)

Constraints:
- 1 <= people.length <= 5 * 10^4
- 1 <= people[i] <= limit <= 3 * 10^4
"""

from typing import List


class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        """
        Greedy Two-Pointer Approach:
        Sort the people array in ascending order of weights.
        Pair the heaviest person remaining (right pointer) with the lightest
        person remaining (left pointer) if their combined weight <= limit.
        If they can pair up, advance the left pointer.
        In either case, the heaviest person must take a boat, so decrement right pointer.

        Time Complexity: O(N log N) for sorting people of length N.
        Space Complexity: O(1) auxiliary space (or O(N) depending on Python sort).
        """
        people.sort()
        left = 0
        right = len(people) - 1
        boats = 0

        while left <= right:
            if people[left] + people[right] <= limit:
                left += 1
            right -= 1
            boats += 1

        return boats


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: [1, 2], limit = 3 -> 1
    assert sol.numRescueBoats([1, 2], 3) == 1, "Test 1 Failed"

    # Test Case 2: [3, 2, 2, 1], limit = 3 -> 3
    assert sol.numRescueBoats([3, 2, 2, 1], 3) == 3, "Test 2 Failed"

    # Test Case 3: [3, 5, 3, 4], limit = 5 -> 4
    assert sol.numRescueBoats([3, 5, 3, 4], 5) == 4, "Test 3 Failed"

    # Test Case 4: single person
    assert sol.numRescueBoats([5], 5) == 1, "Test 4 Failed"

    # Test Case 5: all people pairable
    assert sol.numRescueBoats([2, 2, 2, 2], 4) == 2, "Test 5 Failed"

    print("All Boats to Save People tests passed successfully!")
