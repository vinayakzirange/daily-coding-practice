/**
 * ====================================================================
 * Problem: Basic Calculator II (LeetCode 227)
 * Difficulty: Medium
 * Topic: Math, String, Stack
 * ====================================================================
 * 
 * Given a string s which represents an expression, evaluate this
 * expression and return its value. 
 * 
 * The integer division should truncate toward zero.
 * 
 * You may assume that the given expression is always valid. All
 * intermediate results will be in the range of [-2^31, 2^31 - 1].
 * 
 * Note: You are not allowed to use any built-in function which evaluates
 * strings as mathematical expressions, such as eval().
 * 
 * Example 1:
 * Input: s = "3+2*2"
 * Output: 7
 * 
 * Example 2:
 * Input: s = " 3/2 "
 * Output: 1
 * 
 * Example 3:
 * Input: s = " 3+5 / 2 "
 * Output: 5
 * 
 * Constraints:
 * - 1 <= s.length <= 3 * 10^5
 * - s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces.
 * - s represents a valid expression.
 * - All the integers in the expression are non-negative integers in the range [0, 2^31 - 1].
 * - The answer is guaranteed to fit in a 32-bit integer.
 * ====================================================================
 */

/**
 * Evaluates arithmetic expression containing +, -, *, / with operator precedence.
 * Implemented using O(1) space accumulation or Stack.
 * 
 * Time Complexity: O(n) where n = s.length
 * Space Complexity: O(n) using stack to store deferred addition operands
 * 
 * @param {string} s
 * @return {number}
 */
function calculate(s) {
    const stack = [];
    let currentNumber = 0;
    let operation = '+';

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char >= '0' && char <= '9') {
            currentNumber = currentNumber * 10 + (char.charCodeAt(0) - 48);
        }

        // If char is an operator or it is the last character
        if ((char !== ' ' && (char < '0' || char > '9')) || i === s.length - 1) {
            if (operation === '-') {
                stack.push(-currentNumber);
            } else if (operation === '+') {
                stack.push(currentNumber);
            } else if (operation === '*') {
                const prev = stack.pop();
                stack.push(prev * currentNumber);
            } else if (operation === '/') {
                const prev = stack.pop();
                // Truncate towards zero
                stack.push(Math.trunc(prev / currentNumber));
            }

            operation = char;
            currentNumber = 0;
        }
    }

    let result = 0;
    for (let num of stack) {
        result += num;
    }
    return result;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: 3+2*2
    const t1 = "3+2*2";
    console.assert(calculate(t1) === 7, "Test 1 failed");
    console.log(`Test 1 Passed: "${t1}" = ${calculate(t1)}`);

    // Test 2: 3/2
    const t2 = " 3/2 ";
    console.assert(calculate(t2) === 1, "Test 2 failed");
    console.log(`Test 2 Passed: "${t2}" = ${calculate(t2)}`);

    // Test 3: 3+5 / 2
    const t3 = " 3+5 / 2 ";
    console.assert(calculate(t3) === 5, "Test 3 failed");
    console.log(`Test 3 Passed: "${t3}" = ${calculate(t3)}`);

    // Test 4: Truncation with negative: 14-3/2
    const t4 = "14-3/2";
    console.assert(calculate(t4) === 13, "Test 4 failed");
    console.log(`Test 4 Passed: "${t4}" = ${calculate(t4)}`);

    // Test 5: Consecutive operations: 1*2-3/4+5*6-7*8+9/10
    const t5 = "1*2-3/4+5*6-7*8+9/10";
    // 2 - 0 + 30 - 56 + 0 = -24
    console.assert(calculate(t5) === -24, "Test 5 failed");
    console.log(`Test 5 Passed: "${t5}" = ${calculate(t5)}`);

    // Test 6: Single number
    const t6 = "42";
    console.assert(calculate(t6) === 42, "Test 6 failed");
    console.log(`Test 6 Passed: "${t6}" = ${calculate(t6)}`);

    console.log("\nAll Basic Calculator II tests passed successfully!");
}

module.exports = { calculate };
