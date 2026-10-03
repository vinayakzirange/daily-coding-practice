"""
Problem: Non-overlapping Intervals
Topic: Greedy / Interval Scheduling
Language: Python

Approach:
Sort intervals by end time ascending. Maintain end time of last selected non-overlapping interval.
If current interval start < prevEnd, increment removal count. Otherwise update prevEnd = current.end.

Time Complexity: O(N log N)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def eraseOverlapIntervals(intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        intervals.sort(key=lambda x: x[1])
        removals = 0
        prev_end = intervals[0][1]

        for i in range(1, len(intervals)):
            if intervals[i][0] < prev_end:
                removals += 1
            else:
                prev_end = intervals[i][1]

        return removals

if __name__ == "__main__":
    intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
    print("Removals needed ->", Solution.eraseOverlapIntervals(intervals))  # 1
