r"""
LeetCode 849: Maximize Distance to Closest Person (Medium)
https://leetcode.com/problems/maximize-distance-to-closest-person/

You are given an array representing a row of seats where seats[i] = 1 represents
a person sitting in the ith seat, and seats[i] = 0 represents that the ith seat is empty (0-indexed).

There is at least one empty seat, and at least one person sitting.

Alex wants to sit in the seat such that the distance between him and the closest person to him is maximized.

Return that maximum distance to the closest person.

Example 1:
Input: seats = [1,0,0,0,1,0,1]
Output: 2
Explanation:
If Alex sits in the second open seat (i.e. seats[2]), the number of seats to the closest person is 2.
If Alex sits in any other open seat, the closest person is only 1 seat away.
Thus, the maximum distance is 2.

Example 2:
Input: seats = [1,0,0,0]
Output: 3
Explanation:
If Alex sits in the last seat (i.e. seats[3]), the closest person is 3 seats away.
This is the maximum possible distance, so the answer is 3.

Example 3:
Input: seats = [0,1]
Output: 1

Constraints:
- 2 <= seats.length <= 2 * 10^4
- seats[i] is 0 or 1.
- At least one seat is empty.
- At least one seat is occupied.
"""

from typing import List


class Solution:
    def maxDistToClosest(self, seats: List[int]) -> int:
        """
        Two Pointers / Linear Scan:
        Consider three scenarios:
        1. Leading empty seats (before the first occupied seat):
           distance = first_occupied_index
        2. Trailing empty seats (after the last occupied seat):
           distance = (n - 1) - last_occupied_index
        3. Between two occupied seats at indices prev and curr:
           distance = (curr - prev) // 2

        Time Complexity: O(N) where N is the length of seats.
        Space Complexity: O(1)
        """
        n = len(seats)
        max_dist = 0
        prev_person = -1

        for i, val in enumerate(seats):
            if val == 1:
                if prev_person == -1:
                    # Case 1: leading empty seats
                    max_dist = i
                else:
                    # Case 3: between two occupied seats
                    max_dist = max(max_dist, (i - prev_person) // 2)
                prev_person = i

        # Case 2: trailing empty seats
        if prev_person != -1:
            max_dist = max(max_dist, (n - 1) - prev_person)

        return max_dist


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: middle seat best
    assert sol.maxDistToClosest([1, 0, 0, 0, 1, 0, 1]) == 2

    # Test Case 2: trailing seats best
    assert sol.maxDistToClosest([1, 0, 0, 0]) == 3

    # Test Case 3: leading seat best
    assert sol.maxDistToClosest([0, 1]) == 1

    # Test Case 4: leading empty seats with middle seats
    # [0, 0, 1, 0, 0, 0, 0, 1]
    # leading: 2, middle: (7 - 2) // 2 = 2, max = 2
    assert sol.maxDistToClosest([0, 0, 1, 0, 0, 0, 0, 1]) == 2

    # Test Case 5: large gap between people
    # [1, 0, 0, 0, 0, 0, 1] -> (6 - 0) // 2 = 3
    assert sol.maxDistToClosest([1, 0, 0, 0, 0, 0, 1]) == 3

    print("All Maximize Distance to Closest Person tests passed successfully!")
