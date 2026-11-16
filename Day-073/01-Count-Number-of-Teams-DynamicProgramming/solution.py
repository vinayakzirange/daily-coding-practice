"""
Problem: Count Number of Teams (LeetCode 1395)
Difficulty: Medium
Category: Array / Dynamic Programming / Counting

Description:
There are n soldiers standing in a line. Each soldier is assigned a unique rating value.

You have to form a team of 3 soldiers amongst them under the following rules:
- Choose 3 soldiers with index (i, j, k) with 0 <= i < j < k < n.
- A team is valid if:
  - (rating[i] < rating[j] < rating[k]) OR
  - (rating[i] > rating[j] > rating[k]).

Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).

Example 1:
    Input: rating = [2,5,3,4,1]
    Output: 3
    Explanation: We can form three teams given the conditions:
                 (2,3,4), (5,4,1), (5,3,1).

Example 2:
    Input: rating = [2,1,3]
    Output: 0
    Explanation: We can't form any team given the conditions.

Example 3:
    Input: rating = [1,2,3,4]
    Output: 4
    Explanation: Teams are (1,2,3), (1,2,4), (1,3,4), (2,3,4).

Constraints:
    - n == rating.length
    - 3 <= n <= 1000
    - 1 <= rating[i] <= 10^5
    - All the integers in rating are unique.
"""

from typing import List


class Solution:
    def numTeams(self, rating: List[int]) -> int:
        """
        Counts valid teams of 3 soldiers by treating each soldier j as the middle soldier.

        For each middle index j:
            - left_less: count of soldiers before j with rating < rating[j]
            - left_greater: count of soldiers before j with rating > rating[j]
            - right_less: count of soldiers after j with rating < rating[j]
            - right_greater: count of soldiers after j with rating > rating[j]

        Total teams with j as middle:
            (left_less * right_greater) + (left_greater * right_less)

        Time Complexity: O(n^2)
        Space Complexity: O(1)
        """
        n = len(rating)
        total_teams = 0

        for j in range(1, n - 1):
            mid_val = rating[j]

            left_less = 0
            left_greater = 0
            for i in range(j):
                if rating[i] < mid_val:
                    left_less += 1
                elif rating[i] > mid_val:
                    left_greater += 1

            right_less = 0
            right_greater = 0
            for k in range(j + 1, n):
                if rating[k] < mid_val:
                    right_less += 1
                elif rating[k] > mid_val:
                    right_greater += 1

            total_teams += (left_less * right_greater) + (left_greater * right_less)

        return total_teams


def run_tests():
    sol = Solution()

    # Test 1: Example 1
    assert sol.numTeams([2, 5, 3, 4, 1]) == 3, "Test 1 Failed"

    # Test 2: Example 2 (no valid teams)
    assert sol.numTeams([2, 1, 3]) == 0, "Test 2 Failed"

    # Test 3: Example 3 (strictly increasing)
    assert sol.numTeams([1, 2, 3, 4]) == 4, "Test 3 Failed"

    # Test 4: Strictly decreasing: 5 elements -> C(5, 3) = 10
    assert sol.numTeams([5, 4, 3, 2, 1]) == 10, "Test 4 Failed"

    # Test 5: Length 3 valid increasing
    assert sol.numTeams([1, 2, 3]) == 1, "Test 5 Failed"

    # Test 6: Length 3 valid decreasing
    assert sol.numTeams([3, 2, 1]) == 1, "Test 6 Failed"

    print("All tests passed for 01-Count-Number-of-Teams-DynamicProgramming!")


if __name__ == "__main__":
    run_tests()
