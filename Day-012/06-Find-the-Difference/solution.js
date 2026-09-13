/**
 * Problem: Find the Difference
 * Topic: Bit Manipulation / XOR
 * Language: JavaScript
 *
 * Approach:
 * XOR all characters in s and t. Matching characters cancel out (a ^ a = 0),
 * leaving the character code of the single extra character added to t.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function findTheDifference(s, t) {
    let charCode = 0;
    for (let i = 0; i < s.length; i++) {
        charCode ^= s.charCodeAt(i);
    }
    for (let i = 0; i < t.length; i++) {
        charCode ^= t.charCodeAt(i);
    }
    return String.fromCharCode(charCode);
}

// Test cases
console.log("abcd, abcde ->", findTheDifference("abcd", "abcde")); // "e"
console.log("", "y ->", findTheDifference("", "y")); // "y"
