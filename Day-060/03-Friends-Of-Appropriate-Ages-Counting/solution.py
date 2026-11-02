r"""
LeetCode 825: Friends Of Appropriate Ages (Medium)
https://leetcode.com/problems/friends-of-appropriate-ages/

There are n persons on a social media website. You are given an integer array ages
where ages[i] is the age of the ith person.

A person x will not send a friend request to a person y (x != y) if any of the following conditions is true:
- age[y] <= 0.5 * age[x] + 7
- age[y] > age[x]
- age[y] > 100 && age[x] < 100

Otherwise, x will send a friend request to y.

Note that if x sends a request to y, y will not necessarily send a request to x. Also, a person
cannot send a friend request to themselves.

Return the total number of friend requests made.

Example 1:
Input: ages = [16,16]
Output: 2
Explanation: 2 people friend request each other.

Example 2:
Input: ages = [16,17,18]
Output: 2
Explanation: Friend requests are made 17 -> 16, 18 -> 17.

Example 3:
Input: ages = [20,30,100,110,120]
Output: 3
Explanation: Friend requests are made 110 -> 100, 120 -> 110, 120 -> 100.

Constraints:
- n == ages.length
- 1 <= n <= 2 * 10^4
- 1 <= ages[i] <= 120
"""

from typing import List
from collections import Counter


class Solution:
    def numFriendRequests(self, ages: List[int]) -> int:
        """
        Condition simplification:
        Person x will send a friend request to y iff:
            0.5 * age[x] + 7 < age[y] <= age[x]
        (The condition age[y] > 100 and age[x] < 100 is redundant since age[y] <= age[x]).

        Notice that if age[x] <= 14:
            0.5 * 14 + 7 = 14, so no age[y] can satisfy age[y] > 14 and age[y] <= 14.
        Thus, only ages >= 15 can send requests.

        Since ages are bounded between 1 and 120, we can count the frequency of each age.
        For each pair of ages (A, B):
            - If valid:
                - If A == B: count[A] * (count[A] - 1)
                - If A != B: count[A] * count[B]

        Time Complexity: O(N + 120^2) = O(N)
        Space Complexity: O(1) (counter of at most 120 elements)
        """
        count = Counter(ages)
        total_requests = 0

        for a, count_a in count.items():
            if a < 15:
                continue
            for b, count_b in count.items():
                if 0.5 * a + 7 < b <= a:
                    if a == b:
                        total_requests += count_a * (count_a - 1)
                    else:
                        total_requests += count_a * count_b

        return total_requests


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1
    assert sol.numFriendRequests([16, 16]) == 2

    # Test Case 2
    assert sol.numFriendRequests([16, 17, 18]) == 2

    # Test Case 3
    assert sol.numFriendRequests([20, 30, 100, 110, 120]) == 3

    # Test Case 4: under 15 years old (no requests)
    assert sol.numFriendRequests([10, 12, 14]) == 0

    # Test Case 5: large cluster of same age
    # 5 people aged 20 -> 5 * 4 = 20 requests
    assert sol.numFriendRequests([20, 20, 20, 20, 20]) == 20

    print("All Friends Of Appropriate Ages tests passed successfully!")
