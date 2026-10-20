/**
 * ====================================================================
 * Problem: String Compression (LeetCode 443)
 * Difficulty: Medium
 * Topic: Two Pointers, String
 * ====================================================================
 * 
 * Given an array of characters chars, compress it using the following
 * algorithm:
 * 
 * Begin with an empty string s. For each group of consecutive repeating
 * characters in chars:
 * - If the group's length is 1, append the character to s.
 * - Otherwise, append the character followed by the group's length.
 * 
 * The compressed string s should not be returned separately, but instead,
 * be stored in the input character array chars. Note that group lengths
 * that are 10 or longer will be split into multiple characters in chars.
 * 
 * After you are done modifying the input array, return the new length of
 * the array.
 * 
 * You must write an algorithm that uses only constant extra space.
 * 
 * Example 1:
 * Input: chars = ["a","a","b","b","c","c","c"]
 * Output: Return 6, and the first 6 characters of chars should be: ["a","2","b","2","c","3"]
 * Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
 * 
 * Example 2:
 * Input: chars = ["a"]
 * Output: Return 1, and the first character should be: ["a"]
 * Explanation: The only group is "a", which remains uncompressed since its length is 1.
 * 
 * Example 3:
 * Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
 * Output: Return 4, and the first 4 characters of chars should be: ["a","b","1","2"].
 * Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
 * 
 * Constraints:
 * - 1 <= chars.length <= 2000
 * - chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.
 * ====================================================================
 */

/**
 * In-place string compression using read and write two pointers.
 * 
 * Time Complexity: O(n) where n = chars.length
 * Space Complexity: O(1) auxiliary space (in-place modification)
 * 
 * @param {character[]} chars
 * @return {number}
 */
function compress(chars) {
    let write = 0;
    let read = 0;
    const n = chars.length;

    while (read < n) {
        const currentChar = chars[read];
        let count = 0;

        // Count occurrences of currentChar
        while (read < n && chars[read] === currentChar) {
            read++;
            count++;
        }

        // Write the character
        chars[write++] = currentChar;

        // If count > 1, write each digit of the count
        if (count > 1) {
            const countStr = count.toString();
            for (let digit of countStr) {
                chars[write++] = digit;
            }
        }
    }

    return write;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: ["a","a","b","b","c","c","c"] -> 6 ["a","2","b","2","c","3"]
    const c1 = ["a", "a", "b", "b", "c", "c", "c"];
    const len1 = compress(c1);
    console.assert(len1 === 6, "Test 1 failed length");
    console.assert(c1.slice(0, len1).join('') === "a2b2c3", "Test 1 failed content");
    console.log(`Test 1 Passed: ["a","a","b","b","c","c","c"] -> ${len1} (${c1.slice(0, len1).join('')})`);

    // Test 2: Single character ["a"] -> 1 ["a"]
    const c2 = ["a"];
    const len2 = compress(c2);
    console.assert(len2 === 1 && c2[0] === "a", "Test 2 failed");
    console.log(`Test 2 Passed: ["a"] -> ${len2} (${c2.slice(0, len2).join('')})`);

    // Test 3: Long repeated run ["a","b","b","b","b","b","b","b","b","b","b","b","b"] -> 4 ["a","b","1","2"]
    const c3 = ["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"];
    const len3 = compress(c3);
    console.assert(len3 === 4, "Test 3 failed length");
    console.assert(c3.slice(0, len3).join('') === "ab12", "Test 3 failed content");
    console.log(`Test 3 Passed: 12 'b's -> ${len3} (${c3.slice(0, len3).join('')})`);

    // Test 4: All distinct characters
    const c4 = ["a", "b", "c", "d"];
    const len4 = compress(c4);
    console.assert(len4 === 4 && c4.slice(0, len4).join('') === "abcd", "Test 4 failed");
    console.log(`Test 4 Passed: ["a","b","c","d"] -> ${len4} (${c4.slice(0, len4).join('')})`);

    console.log("\nAll String Compression tests passed successfully!");
}

module.exports = { compress };
