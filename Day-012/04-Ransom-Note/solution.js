/**
 * Problem: Ransom Note
 * Topic: HashMap / Frequency Array
 * Language: JavaScript
 *
 * Approach:
 * Count character frequencies in magazine using an array of size 26.
 * Iterate through ransomNote and decrement frequencies. If count < 0, return false.
 *
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */

function canConstruct(ransomNote, magazine) {
    const counts = new Array(26).fill(0);
    const codeA = 'a'.charCodeAt(0);

    for (let char of magazine) {
        counts[char.charCodeAt(0) - codeA]++;
    }

    for (let char of ransomNote) {
        const idx = char.charCodeAt(0) - codeA;
        if (--counts[idx] < 0) {
            return false;
        }
    }

    return true;
}

// Test cases
console.log("a, b ->", canConstruct("a", "b")); // false
console.log("aa, ab ->", canConstruct("aa", "ab")); // false
console.log("aa, aab ->", canConstruct("aa", "aab")); // true
