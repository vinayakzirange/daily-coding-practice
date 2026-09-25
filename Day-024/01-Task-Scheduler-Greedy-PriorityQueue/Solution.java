// Problem: Task Scheduler (LeetCode 621)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N) where N is number of tasks
// Space Complexity: O(1) array of size 26

import java.util.Arrays;

public class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char c : tasks) {
            freq[c - 'A']++;
        }
        Arrays.sort(freq);
        int maxFreq = freq[25];
        int idleSlots = (maxFreq - 1) * n;
        
        for (int i = 24; i >= 0 && freq[i] > 0; i--) {
            idleSlots -= Math.min(maxFreq - 1, freq[i]);
        }
        
        return idleSlots > 0 ? tasks.length + idleSlots : tasks.length;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        char[] tasks1 = {'A','A','A','B','B','B'};
        System.out.println("Output (n=2): " + sol.leastInterval(tasks1, 2)); // 8
        
        char[] tasks2 = {'A','C','A','B','D','B'};
        System.out.println("Output (n=1): " + sol.leastInterval(tasks2, 1)); // 6
    }
}
