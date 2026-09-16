/**
 * Problem: To Lower Case
 * Topic: String / ASCII Character Conversion
 * Language: JavaScript
 *
 * Approach:
 * Iterate through characters. If char code is between 65 ('A') and 90 ('Z'),
 * convert to lowercase by adding 32: String.fromCharCode(charCode + 32).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function toLowerCase(s) {
    let result = '';
    for (let i = 0; i < s.length; i++) {
        const code = s.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            result += String.fromCharCode(code + 32);
        } else {
            result += s[i];
        }
    }
    return result;
}

// Test cases
console.log("'Hello' ->", toLowerCase("Hello")); // "hello"
console.log("'here' ->", toLowerCase("here")); // "here"
console.log("'LOVELY' ->", toLowerCase("LOVELY")); // "lovely"
