// Problem: Longest Consecutive Sequence (LeetCode 128)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(N)

import java.util.HashSet;
import java.util.Set;

public class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            set.add(num);
        }

        int maxStreak = 0;

        for (int num : set) {
            // Check if num is the start of a sequence
            if (!set.contains(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (set.contains(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }

                maxStreak = Math.max(maxStreak, currentStreak);
            }
        }

        return maxStreak;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums1 = {100, 4, 200, 1, 3, 2};
        System.out.println("Output: " + sol.longestConsecutive(nums1)); // 4 ([1,2,3,4])

        int[] nums2 = {0, 3, 7, 2, 5, 8, 4, 6, 0, 1};
        System.out.println("Output: " + sol.longestConsecutive(nums2)); // 9 ([0,1,2,3,4,5,6,7,8])
    }
}
