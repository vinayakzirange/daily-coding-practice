/**
 * Problem: Longest Palindromic Substring
 * Topic: String / Expand Around Center
 * Language: JavaScript
 *
 * Approach:
 * Treat each index (and pair of adjacent indices) as potential palindrome center.
 * Expand outward while characters match. Track start index and maximum length found.
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */

function longestPalindrome(s) {
    if (!s || s.length < 1) return "";
    let start = 0, end = 0;

    function expand(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    for (let i = 0; i < s.length; i++) {
        const len1 = expand(i, i);
        const len2 = expand(i, i + 1);
        const maxLen = Math.max(len1, len2);

        if (maxLen > end - start) {
            start = i - Math.floor((maxLen - 1) / 2);
            end = i + Math.floor(maxLen / 2);
        }
    }

    return s.substring(start, end + 1);
}

// Test cases
console.log("'babad' ->", longestPalindrome("babad")); // "bab" or "aba"
console.log("'cbbd' ->", longestPalindrome("cbbd")); // "bb"
