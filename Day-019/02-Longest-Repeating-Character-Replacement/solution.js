/**
 * Problem: Longest Repeating Character Replacement
 * Topic: Sliding Window / HashMap Frequency
 * Language: JavaScript
 *
 * Approach:
 * Maintain sliding window [left, right] and frequency map of characters in window.
 * Track max frequency of a single character in current window (maxCount).
 * Window is valid if (windowLength - maxCount <= k). Shrink window from left if invalid.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1) (since uppercase English letters size is 26)
 */

function characterReplacement(s, k) {
    const counts = new Array(26).fill(0);
    const codeA = 'A'.charCodeAt(0);
    let left = 0;
    let maxCount = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const idx = s.charCodeAt(right) - codeA;
        counts[idx]++;
        if (counts[idx] > maxCount) maxCount = counts[idx];

        while ((right - left + 1) - maxCount > k) {
            counts[s.charCodeAt(left) - codeA]--;
            left++;
        }

        if (right - left + 1 > maxLen) {
            maxLen = right - left + 1;
        }
    }
    return maxLen;
}

// Test cases
console.log("'ABAB', k=2 ->", characterReplacement("ABAB", 2)); // 4
console.log("'AABABBA', k=1 ->", characterReplacement("AABABBA", 1)); // 4
