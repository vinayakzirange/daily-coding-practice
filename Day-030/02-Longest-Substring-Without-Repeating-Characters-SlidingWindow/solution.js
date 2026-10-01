// Problem: Longest Substring Without Repeating Characters (LeetCode 3)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(min(N, M))

function lengthOfLongestSubstring(s) {
    const set = new Set();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// Test cases
console.log("Output ('abcabcbb'):", lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log("Output ('bbbbb'):", lengthOfLongestSubstring("bbbbb")); // 1 ("b")
console.log("Output ('pwwkew'):", lengthOfLongestSubstring("pwwkew")); // 3 ("wke")
