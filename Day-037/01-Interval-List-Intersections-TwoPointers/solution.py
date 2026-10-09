"""
Problem: Interval List Intersections (LeetCode 986)
Difficulty: Medium
Topic: Array / Two Pointers / Intervals

Description:
You are given two lists of closed intervals, firstList and secondList, where:
firstList[i] = [starti, endi] and secondList[j] = [startj, endj].
Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.
The intersection of two closed intervals is a set of real numbers that is either empty, 
or can be represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].

Example 1:
Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

Example 2:
Input: firstList = [[1,3],[5,9]], secondList = []
Output: []

Constraints:
  * 0 <= firstList.length, secondList.length <= 1000
  * firstList[i].length == secondList[j].length == 2
  * 0 <= starti < endi <= 10^9
  * endi < starti+1
  * 0 <= startj < endj <= 10^9
  * endj < startj+1

Complexity:
  * Time Complexity: O(M + N) where M and N are lengths of firstList and secondList.
  * Space Complexity: O(1) auxiliary space (ignoring output array).
"""

from typing import List


class Solution:
    def intervalIntersection(
        self, firstList: List[List[int]], secondList: List[List[int]]
    ) -> List[List[int]]:
        result = []
        i, j = 0, 0

        while i < len(firstList) and j < len(secondList):
            start1, end1 = firstList[i]
            start2, end2 = secondList[j]

            # Intersection start is max of starts, end is min of ends
            lo = max(start1, start2)
            hi = min(end1, end2)

            if lo <= hi:
                result.append([lo, hi])

            # Remove interval with the smaller end point
            if end1 < end2:
                i += 1
            else:
                j += 1

        return result


if __name__ == "__main__":
    sol = Solution()

    # Test 1
    f1 = [[0, 2], [5, 10], [13, 23], [24, 25]]
    s1 = [[1, 5], [8, 12], [15, 24], [25, 26]]
    expected1 = [[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]]
    res1 = sol.intervalIntersection(f1, s1)
    print(f"Test 1: {res1} | Pass: {res1 == expected1}")

    # Test 2
    f2 = [[1, 3], [5, 9]]
    s2 = []
    expected2 = []
    res2 = sol.intervalIntersection(f2, s2)
    print(f"Test 2: {res2} | Pass: {res2 == expected2}")

    # Test 3
    f3 = [[1, 7]]
    s3 = [[3, 10]]
    expected3 = [[3, 7]]
    res3 = sol.intervalIntersection(f3, s3)
    print(f"Test 3: {res3} | Pass: {res3 == expected3}")
