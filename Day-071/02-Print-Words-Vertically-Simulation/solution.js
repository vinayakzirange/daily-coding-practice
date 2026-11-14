/**
 * Problem: Print Words Vertically (LeetCode 1324)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given a string s. Return all the words vertically in the same order in which they appear in s.
 * Words are returned as a list of strings, complete with spaces when needed.
 * (Trailing spaces are not allowed).
 * 
 * Each word is composed of only uppercase English letters.
 * It's guaranteed that there is only one space between 2 words.
 * 
 * Example 1:
 *  Input: s = "HOW ARE YOU"
 *  Output: ["HAY","ORO","WEU"]
 *  Explanation: Each word is printed vertically:
 *   "HAY"
 *   "ORO"
 *   "WEU"
 * 
 * Example 2:
 *  Input: s = "TO BE OR NOT TO BE"
 *  Output: ["TBONTB","OEROOE","   T"]
 *  Explanation: Trailing spaces is not allowed. 
 *  "   T"
 * 
 * Example 3:
 *  Input: s = "CONTEST IS COMING"
 *  Output: ["CIC","OSO","N M","T I","E N","S G","T"]
 * 
 * Constraints:
 *  1 <= s.length <= 200
 *  s contains only upper case English letters and spaces.
 *  There is only one space between two words.
 */

/**
 * Transforms horizontal words into vertical column strings with trailing spaces trimmed.
 * 
 * @param {string} s
 * @return {string[]}
 * 
 * Complexity:
 *  Time: O(W * L) where W is the number of words and L is the maximum word length.
 *  Space: O(W * L) for storing and returning the formatted matrix output.
 */
function printVertically(s) {
    const words = s.split(' ');
    let maxLen = 0;
    for (const w of words) {
        if (w.length > maxLen) {
            maxLen = w.length;
        }
    }

    const result = [];

    for (let col = 0; col < maxLen; col++) {
        let colChars = [];

        for (let i = 0; i < words.length; i++) {
            const ch = col < words[i].length ? words[i][col] : ' ';
            colChars.push(ch);
        }

        // Trim trailing spaces from the right side of the column
        let colStr = colChars.join('').trimEnd();
        result.push(colStr);
    }

    return result;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const res1 = printVertically("HOW ARE YOU");
    assert.deepStrictEqual(res1, ["HAY", "ORO", "WEU"], `Test 1 Failed: ${JSON.stringify(res1)}`);

    // Test 2: Example 2
    const res2 = printVertically("TO BE OR NOT TO BE");
    assert.deepStrictEqual(res2, ["TBONTB", "OEROOE", "   T"], `Test 2 Failed: ${JSON.stringify(res2)}`);

    // Test 3: Example 3
    const res3 = printVertically("CONTEST IS COMING");
    assert.deepStrictEqual(res3, ["CIC", "OSO", "N M", "T I", "E N", "S G", "T"], `Test 3 Failed: ${JSON.stringify(res3)}`);

    // Test 4: Single word
    const res4 = printVertically("HELLO");
    assert.deepStrictEqual(res4, ["H", "E", "L", "L", "O"], "Test 4 Failed");

    // Test 5: Single letter words
    const res5 = printVertically("A B C");
    assert.deepStrictEqual(res5, ["ABC"], "Test 5 Failed");

    console.log("All Print Words Vertically tests passed successfully!");
}

runTests();
