/**
 * Problem: Non-overlapping Intervals
 * Topic: Greedy / Interval Scheduling
 * Language: Java
 *
 * Approach:
 * Sort intervals by end time ascending. Maintain end time of last selected non-overlapping interval.
 * If current interval start < prevEnd, increment removal count. Otherwise update prevEnd = current.end.
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */

import java.util.Arrays;

public class Solution {
    public static int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int removals = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < prevEnd) {
                removals++;
            } else {
                prevEnd = intervals[i][1];
            }
        }
        return removals;
    }

    public static void main(String[] args) {
        int[][] intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
        System.out.println("Removals needed -> " + eraseOverlapIntervals(intervals)); // 1 (remove [1,3])
    }
}
