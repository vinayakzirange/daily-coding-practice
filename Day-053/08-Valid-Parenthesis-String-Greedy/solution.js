/**
 * ====================================================================
 * Problem: Valid Parenthesis String (LeetCode 678)
 * Difficulty: Medium
 * Topic: String, Dynamic Programming, Stack, Greedy
 * ====================================================================
 * 
 * Given a string s containing only three types of characters: '(', ')'
 * and '*', return true if s is valid.
 * 
 * The following rules define a valid string:
 * - Any left parenthesis '(' must have a corresponding right parenthesis ')'.
 * - Any right parenthesis ')' must have a corresponding left parenthesis '('.
 * - Left parenthesis '(' must go before the corresponding right parenthesis ')'.
 * - '*' could be treated as a single right parenthesis ')' or a single
 *   left parenthesis '(' or an empty string "".
 * 
 * Example 1:
 * Input: s = "()"
 * Output: true
 * 
 * Example 2:
 * Input: s = "(*)"
 * Output: true
 * 
 * Example 3:
 * Input: s = "(*))"
 * Output: true
 * 
 * Constraints:
 * - 1 <= s.length <= 100
 * - s[i] is '(', ')' or '*'.
 * ====================================================================
 */

/**
 * Greedy range tracking algorithm.
 * Tracks the possible range of open parentheses [cmin, cmax].
 * 
 * Complexity:
 * - Time: O(n) single pass
 * - Space: O(1) auxiliary space
 * 
 * @param {string} s
 * @return {boolean}
 */
function checkValidString(s) {
    let cmin = 0; // Minimum possible open '(' count
    let cmax = 0; // Maximum possible open '(' count

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char === '(') {
            cmin++;
            cmax++;
        } else if (char === ')') {
            cmin--;
            cmax--;
        } else if (char === '*') {
            cmin--; // '*' acts as ')'
            cmax++; // '*' acts as '('
        }

        // If cmax < 0, there are more ')' than '(' even if all '*' were '('
        if (cmax < 0) {
            return false;
        }

        // cmin cannot be less than 0 (we can choose '*' as empty string or match)
        cmin = Math.max(cmin, 0);
    }

    // String is valid if it's possible to have 0 open parentheses at the end
    return cmin === 0;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: "()"
    console.assert(checkValidString("()") === true, "Test 1 Failed");

    // Test 2: "(*)"
    console.assert(checkValidString("(*)") === true, "Test 2 Failed");

    // Test 3: "(*))"
    console.assert(checkValidString("(*))") === true, "Test 3 Failed");

    // Test 4: ")("
    console.assert(checkValidString(")(") === false, "Test 4 Failed");

    // Test 5: "(((**)(" (cannot balance remaining open bracket)
    console.assert(checkValidString("(((**)(") === false, "Test 5 Failed");

    // Test 6: "(())((())()()(*)(*()(())())())()()((()())((()))(*"
    console.assert(checkValidString("(())((())()()(*)(*()(())())())()()((()())((()))(*") === false, "Test 6 Failed");

    // Test 7: "**((*"
    console.assert(checkValidString("**((*") === false, "Test 7 Failed");

    console.log("All Valid Parenthesis String tests passed successfully!");
}

module.exports = { checkValidString };
