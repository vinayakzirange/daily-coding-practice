// Problem: Longest Repeating Character Replacement (LeetCode 424)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1) - fixed 26 letters

function characterReplacement(s, k) {
    const count = new Array(26).fill(0);
    let left = 0;
    let maxFreq = 0;
    let maxLen = 0;
    const aCode = 'A'.charCodeAt(0);

    for (let right = 0; right < s.length; right++) {
        const charIdx = s.charCodeAt(right) - aCode;
        count[charIdx]++;
        maxFreq = Math.max(maxFreq, count[charIdx]);

        // If current window size minus max frequency char is greater than k, shrink window
        if ((right - left + 1) - maxFreq > k) {
            count[s.charCodeAt(left) - aCode]--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// Test cases
console.log("Output ('ABAB', k=2):", characterReplacement("ABAB", 2)); // 4
console.log("Output ('AABABBA', k=1):", characterReplacement("AABABBA", 1)); // 4
