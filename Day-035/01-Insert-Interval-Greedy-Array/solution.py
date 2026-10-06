"""
Problem: Insert Interval (LeetCode 57)
Difficulty: Medium
Topic: Array / Intervals / Greedy / Simulation

Description:
You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi]
represent the start and the end of the ith interval and intervals is sorted in ascending
order by starti. You are also given an interval newInterval = [start, end] that represents
the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by
starti and intervals still does not have any overlapping intervals (merge overlapping intervals
if necessary).

Return intervals after the insertion.
Note that you don't need to modify intervals in-place. You can make a new array and return it.

Example 1:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Constraints:
  * 0 <= intervals.length <= 10^4
  * intervals[i].length == 2
  * 0 <= starti <= endi <= 10^5
  * intervals is sorted by starti in ascending order.
  * newInterval.length == 2
  * 0 <= start <= end <= 10^5

Complexity:
  * Time Complexity: O(n) - Single pass through the sorted intervals.
  * Space Complexity: O(n) - Result list to store the merged intervals.
"""

from typing import List


class Solution:
    def insert(
        self, intervals: List[List[int]], newInterval: List[int]
    ) -> List[List[int]]:
        result = []
        i = 0
        n = len(intervals)

        # Step 1: Add all intervals that come strictly before newInterval
        while i < n and intervals[i][1] < newInterval[0]:
            result.append(intervals[i])
            i += 1

        # Step 2: Merge all overlapping intervals with newInterval
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        result.append(newInterval)

        # Step 3: Add all remaining intervals that come strictly after newInterval
        while i < n:
            result.append(intervals[i])
            i += 1

        return result


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([[1, 3], [6, 9]], [2, 5], [[1, 5], [6, 9]]),
        ([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8], [[1, 2], [3, 10], [12, 16]]),
        ([], [5, 7], [[5, 7]]),
        ([[1, 5]], [2, 3], [[1, 5]]),
        ([[1, 5]], [6, 8], [[1, 5], [6, 8]]),
    ]

    for idx, (intervals, new_int, expected) in enumerate(test_cases, 1):
        result = sol.insert([list(x) for x in intervals], list(new_int))
        assert result == expected, f"Test {idx} failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: intervals={intervals}, new={new_int} -> {result}")

    print("\nAll Insert Interval tests passed successfully!")
