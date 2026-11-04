/**
 * LeetCode 921: Minimum Add to Make Parentheses Valid (Medium)
 * https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/
 *
 * A parentheses string is valid if and only if:
 * 1. It is the empty string,
 * 2. It can be written as AB (A concatenated with B), where A and B are valid strings, or
 * 3. It can be written as (A), where A is a valid string.
 *
 * You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.
 * Return the minimum number of moves required to make s valid.
 *
 * Example 1:
 * Input: s = "())"
 * Output: 1
 *
 * Example 2:
 * Input: s = "((("
 * Output: 3
 *
 * Constraints:
 * - 1 <= s.length <= 1000
 * - s[i] is either '(' or ')'.
 *
 * @param {string} s
 * @return {number}
 */
function minAddToMakeValid(s) {
    let openCount = 0;
    let addCount = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            openCount++;
        } else {
            if (openCount > 0) {
                openCount--;
            } else {
                addCount++;
            }
        }
    }

    return openCount + addCount;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    console.assert(minAddToMakeValid("())") === 1, "Test 1 Failed");

    // Test 2: Example 2
    console.assert(minAddToMakeValid("(((") === 3, "Test 2 Failed");

    // Test 3: Already valid
    console.assert(minAddToMakeValid("()") === 0, "Test 3 Failed");
    console.assert(minAddToMakeValid("()()") === 0, "Test 3b Failed");
    console.assert(minAddToMakeValid("(())") === 0, "Test 3c Failed");

    // Test 4: All closing parentheses
    console.assert(minAddToMakeValid(")))") === 3, "Test 4 Failed");

    // Test 5: Mixed unmatched
    console.assert(minAddToMakeValid("()))((") === 4, "Test 5 Failed");

    console.log("All Minimum Add to Make Parentheses Valid tests passed successfully!");
}

runTests();

