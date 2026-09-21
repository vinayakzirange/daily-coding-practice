/**
 * Problem: Palindromic Substrings Count
 * Topic: String / Expand Around Center
 * Language: JavaScript
 *
 * Approach:
 * Treat each character (and adjacent character pair) as a palindrome center.
 * Expand outward while characters match, incrementing the total palindrome count.
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */

function countSubstrings(s) {
    let totalCount = 0;

    function expand(left, right) {
        let count = 0;
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            count++;
            left--;
            right++;
        }
        return count;
    }

    for (let i = 0; i < s.length; i++) {
        totalCount += expand(i, i);     // Odd length
        totalCount += expand(i, i + 1); // Even length
    }

    return totalCount;
}

// Test cases
console.log("'abc' ->", countSubstrings("abc")); // 3 ("a", "b", "c")
console.log("'aaa' ->", countSubstrings("aaa")); // 6 ("a", "a", "a", "aa", "aa", "aaa")
