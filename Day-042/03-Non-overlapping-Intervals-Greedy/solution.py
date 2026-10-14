"""
Problem: Non-overlapping Intervals (LeetCode 435)
Difficulty: Medium
Topic: Array / Dynamic Programming / Greedy / Sorting / Intervals

Description:
Given an array of intervals intervals where intervals[i] = [start_i, end_i],
return the minimum number of intervals you need to remove to make the rest of
the intervals non-overlapping.

Note that intervals which only touch at a point are non-overlapping.
For example, [1, 2] and [2, 3] are non-overlapping.

Example 1:
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

Example 2:
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.

Example 3:
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.

Constraints:
- 1 <= intervals.length <= 10^5
- intervals[i].length == 2
- -5 * 10^4 <= start_i < end_i <= 5 * 10^4

Complexity Analysis:
- Time Complexity: O(n log n) dominated by sorting intervals by end time.
- Space Complexity: O(1) or O(n) depending on Python's Timsort implementation.
"""

from typing import List


class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        # Greedy choice: Sort by end time to leave as much room as possible for future intervals
        intervals.sort(key=lambda x: x[1])

        non_overlapping_count = 0
        prev_end = float("-inf")

        for start, end in intervals:
            if start >= prev_end:
                # No overlap, keep this interval
                non_overlapping_count += 1
                prev_end = end

        # The minimum number of removals is total intervals minus max non-overlapping intervals
        return len(intervals) - non_overlapping_count


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([[1, 2], [2, 3], [3, 4], [1, 3]], 1),
        ([[1, 2], [1, 2], [1, 2]], 2),
        ([[1, 2], [2, 3]], 0),
        ([[1, 100], [11, 22], [1, 11], [2, 12]], 2),
        ([[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]], 2),
        ([[1, 2]], 0),
        ([[-52, 31], [-73, -26], [82, 97], [-65, -11], [-62, -49]], 3),
    ]

    for idx, (intervals, expected) in enumerate(test_cases, 1):
        res = sol.eraseOverlapIntervals(intervals)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: intervals count={len(intervals)} -> removals needed = {res}")

    print("\nAll Non-overlapping Intervals tests passed successfully!")
