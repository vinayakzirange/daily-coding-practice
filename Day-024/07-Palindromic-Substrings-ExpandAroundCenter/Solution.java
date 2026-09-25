// Problem: Palindromic Substrings (LeetCode 647)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N^2)
// Space Complexity: O(1)

public class Solution {
    private int count = 0;

    public int countSubstrings(String s) {
        if (s == null || s.length() == 0) return 0;
        
        for (int i = 0; i < s.length(); i++) {
            expandAroundCenter(s, i, i);     // Odd length
            expandAroundCenter(s, i, i + 1); // Even length
        }
        
        return count;
    }

    private void expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            count++;
            left--;
            right++;
        }
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println("Output ('abc'): " + sol.countSubstrings("abc")); // 3
        
        Solution sol2 = new Solution();
        System.out.println("Output ('aaa'): " + sol2.countSubstrings("aaa")); // 6
    }
}
