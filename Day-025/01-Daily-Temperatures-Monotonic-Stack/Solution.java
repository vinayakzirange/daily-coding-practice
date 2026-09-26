// Problem: Daily Temperatures (LeetCode 739)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(N)

import java.util.Arrays;
import java.util.Stack;

public class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] answer = new int[n];
        Stack<Integer> stack = new Stack<>();
        
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIndex = stack.pop();
                answer[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }
        
        return answer;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] temps = {73, 74, 75, 71, 69, 72, 76, 73};
        System.out.println("Output: " + Arrays.toString(sol.dailyTemperatures(temps)));
        // Output: [1, 1, 4, 2, 1, 1, 0, 0]
    }
}
