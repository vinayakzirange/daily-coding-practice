// Problem: Longest Substring with At Least K Repeating Characters (LeetCode 395)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N * 26) = O(N)
// Space Complexity: O(N) call stack

function longestSubstring(s, k) {
    if (s.length < k) return 0;

    const count = {};
    for (const ch of s) {
        count[ch] = (count[ch] || 0) + 1;
    }

    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] < k) {
            const left = longestSubstring(s.substring(0, i), k);
            const right = longestSubstring(s.substring(i + 1), k);
            return Math.max(left, right);
        }
    }

    return s.length;
}

// Test cases
console.log("Output ('aaabb', k=3):", longestSubstring("aaabb", 3)); // 3 ("aaa")
console.log("Output ('ababbc', k=2):", longestSubstring("ababbc", 2)); // 5 ("ababb")
