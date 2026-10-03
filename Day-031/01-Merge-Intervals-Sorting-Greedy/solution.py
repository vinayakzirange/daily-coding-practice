"""
Problem: Merge Intervals (LeetCode 56)
Language: Python
Difficulty: Medium
Time Complexity: O(N log N)
Space Complexity: O(N)
"""

from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if len(intervals) <= 1:
            return intervals

        intervals.sort(key=lambda x: x[0])
        result = [intervals[0]]

        for interval in intervals[1:]:
            curr_end = result[-1][1]
            next_start = interval[0]
            next_end = interval[1]

            if curr_end >= next_start:
                result[-1][1] = max(curr_end, next_end)
            else:
                result.append(interval)

        return result

if __name__ == "__main__":
    sol = Solution()
    intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
    print("Merged Intervals:", sol.merge(intervals))
    # Output: [[1, 6], [8, 10], [15, 18]]
