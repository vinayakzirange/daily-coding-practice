// Problem: Merge Intervals (LeetCode 56)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N log N)
// Space Complexity: O(N)

import java.util.*;

public class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> result = new ArrayList<>();
        int[] currentInterval = intervals[0];
        result.add(currentInterval);

        for (int[] interval : intervals) {
            int currentEnd = currentInterval[1];
            int nextStart = interval[0];
            int nextEnd = interval[1];

            if (currentEnd >= nextStart) {
                currentInterval[1] = Math.max(currentEnd, nextEnd);
            } else {
                currentInterval = interval;
                result.add(currentInterval);
            }
        }

        return result.toArray(new int[result.size()][]);
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] intervals = {{1,3},{2,6},{8,10},{15,18}};
        int[][] merged = sol.merge(intervals);
        System.out.println("Merged Intervals: " + Arrays.deepToString(merged));
        // Output: [[1, 6], [8, 10], [15, 18]]
    }
}
