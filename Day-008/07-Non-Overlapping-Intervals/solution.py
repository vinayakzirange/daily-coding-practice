"""
Problem Name: Non-overlapping Intervals
Problem Statement: Given an array of intervals intervals where intervals[i] = [starti, endi],
return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Approach: Greedy algorithm. Sort intervals by end time. Always keep interval with earliest end time.

Time Complexity: O(N log N) for sorting
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def eraseOverlapIntervals(intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        intervals.sort(key=lambda x: x[1])
        remove_count = 0
        prev_end = intervals[0][1]

        for i in range(1, len(intervals)):
            if intervals[i][0] < prev_end:
                remove_count += 1
            else:
                prev_end = intervals[i][1]

        return remove_count

if __name__ == "__main__":
    intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
    print("Min intervals to remove:", Solution.eraseOverlapIntervals(intervals))  # Expected: 1
