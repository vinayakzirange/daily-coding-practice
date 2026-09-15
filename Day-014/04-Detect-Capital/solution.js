/**
 * Problem: Detect Capital
 * Topic: String / Case Rule Verification
 * Language: JavaScript
 *
 * Approach:
 * Check if string matches any of 3 valid usage rules:
 * 1. All uppercase ("USA")
 * 2. All lowercase ("leetcode")
 * 3. Only first letter uppercase ("Google")
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function detectCapitalUse(word) {
    if (word === word.toUpperCase()) return true;
    if (word === word.toLowerCase()) return true;
    if (word[0] === word[0].toUpperCase() && word.slice(1) === word.slice(1).toLowerCase()) return true;
    return false;
}

// Test cases
console.log("'USA' ->", detectCapitalUse("USA")); // true
console.log("'FlaG' ->", detectCapitalUse("FlaG")); // false
console.log("'leetcode' ->", detectCapitalUse("leetcode")); // true
console.log("'Google' ->", detectCapitalUse("Google")); // true
