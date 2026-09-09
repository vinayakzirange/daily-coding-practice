/*
 * Problem Name: Non-overlapping Intervals
 * Problem Statement: Given an array of intervals intervals where intervals[i] = [starti, endi], 
 * return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
 * 
 * Approach: Greedy algorithm. Sort intervals by end time. Always keep interval with earliest end time.
 * 
 * Time Complexity: O(N log N) for sorting
 * Space Complexity: O(1)
 */

import java.util.Arrays;

public class Solution {
    public static int eraseOverlapIntervals(int[][] intervals) {
        if (intervals == null || intervals.length == 0) return 0;

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int removeCount = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < prevEnd) {
                removeCount++; // Overlap found, remove current
            } else {
                prevEnd = intervals[i][1]; // No overlap, update end
            }
        }

        return removeCount;
    }

    public static void main(String[] args) {
        int[][] intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
        System.out.println("Min intervals to remove: " + eraseOverlapIntervals(intervals)); // Expected: 1
    }
}
