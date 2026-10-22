"""
====================================================================
Problem: Find Right Interval (LeetCode 436)
Difficulty: Medium
Topic: Array, Binary Search, Sorting
====================================================================

You are given an array of intervals, where intervals[i] = [start_i, end_i]
and each start_i is unique.

The right interval for an interval i is an interval j such that
start_j >= end_i and start_j is minimized. Note that i may equal j.

Return an array of right interval indices for each interval i. If no
right interval exists for interval i, then put -1 at index i.

Example 1:
Input: intervals = [[1,2]]
Output: [-1]
Explanation: There is only one interval in the collection, so it
cannot have a right interval.

Example 2:
Input: intervals = [[3,4],[2,3],[1,2]]
Output: [-1,0,1]
Explanation: There is no right interval for [3,4].
The right interval for [2,3] is [3,4] since start_0 = 3 is the smallest
start that is >= end_1 = 3.
The right interval for [1,2] is [2,3] since start_1 = 2 is the smallest
start that is >= end_2 = 2.

Example 3:
Input: intervals = [[1,4],[2,3],[3,4]]
Output: [-1,2,-1]

Constraints:
- 1 <= intervals.length <= 2 * 10^4
- intervals[i].length == 2
- -10^6 <= start_i <= end_i <= 10^6
- The start point of each interval is unique.
====================================================================
"""

import bisect
from typing import List

class Solution:
    def findRightInterval(self, intervals: List[List[int]]) -> List[int]:
        """
        Sort starts with their original indices and use Binary Search.
        For each interval [start, end], search for the smallest start_j >= end.

        Time Complexity: O(n log n) for sorting and n binary searches
        Space Complexity: O(n) to store sorted starts with indices
        """
        n = len(intervals)
        # Store (start_val, original_index) sorted by start_val
        sorted_starts = sorted((intervals[i][0], i) for i in range(n))
        starts_only = [item[0] for item in sorted_starts]

        result = [-1] * n

        for i in range(n):
            target_end = intervals[i][1]
            # Find the leftmost start >= target_end
            idx = bisect.bisect_left(starts_only, target_end)
            if idx < n:
                result[i] = sorted_starts[idx][1]

        return result


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: [[1, 2]] -> [-1]
    assert solver.findRightInterval([[1, 2]]) == [-1], "Test 1 failed"
    print("Test 1 Passed: [[1,2]] -> [-1]")

    # Test 2: [[3,4],[2,3],[1,2]] -> [-1, 0, 1]
    assert solver.findRightInterval([[3, 4], [2, 3], [1, 2]]) == [-1, 0, 1], "Test 2 failed"
    print("Test 2 Passed: [[3,4],[2,3],[1,2]] -> [-1, 0, 1]")

    # Test 3: [[1,4],[2,3],[3,4]] -> [-1, 2, -1]
    assert solver.findRightInterval([[1, 4], [2, 3], [3, 4]]) == [-1, 2, -1], "Test 3 failed"
    print("Test 3 Passed: [[1,4],[2,3],[3,4]] -> [-1, 2, -1]")

    # Test 4: Point interval [[1,1]] -> [0]
    assert solver.findRightInterval([[1, 1]]) == [0], "Test 4 failed"
    print("Test 4 Passed: [[1,1]] -> [0]")

    # Test 5: Multiple intervals with exact start == end matches
    inv5 = [[4, 5], [2, 3], [1, 2]]
    # [4,5] -> end=5 (no start >= 5) -> -1
    # [2,3] -> end=3 (start >= 3 is [4,5], idx 0) -> 0
    # [1,2] -> end=2 (start >= 2 is [2,3], idx 1) -> 1
    assert solver.findRightInterval(inv5) == [-1, 0, 1], "Test 5 failed"
    print(f"Test 5 Passed: {inv5} -> [-1, 0, 1]")

    print("\nAll Find Right Interval tests passed successfully!")
