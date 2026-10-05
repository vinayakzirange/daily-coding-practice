/**
 * Problem: Generate Parentheses (LeetCode 22)
 * Difficulty: Medium
 * Topic: String / Backtracking / Recursion / Combinations
 * 
 * Description:
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 * 
 * Example 1:
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 * 
 * Example 2:
 * Input: n = 1
 * Output: ["()"]
 * 
 * Constraints:
 *   * 1 <= n <= 8
 * 
 * Complexity:
 *   * Time Complexity: O(4^n / sqrt(n)) - Bound by the n-th Catalan number C_n = 1/(n+1) * (2n choose n).
 *   * Space Complexity: O(n) - Maximum depth of the recursion tree is 2n.
 */

/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
    const result = [];

    function backtrack(currentStr, openCount, closeCount) {
        // Base case: string length has reached 2 * n
        if (currentStr.length === 2 * n) {
            result.push(currentStr);
            return;
        }

        // We can add an open parenthesis if we haven't used all n
        if (openCount < n) {
            backtrack(currentStr + '(', openCount + 1, closeCount);
        }

        // We can add a close parenthesis only if there are unmatched open parentheses
        if (closeCount < openCount) {
            backtrack(currentStr + ')', openCount, closeCount + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        {
            n: 3,
            expected: ["((()))", "(()())", "(())()", "()(())", "()()()"]
        },
        {
            n: 1,
            expected: ["()"]
        },
        {
            n: 2,
            expected: ["(())", "()()"]
        }
    ];

    testCases.forEach((tc, idx) => {
        const result = generateParenthesis(tc.n);
        const sortedResult = [...result].sort();
        const sortedExpected = [...tc.expected].sort();
        const matches = JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);
        console.assert(matches, `Test ${idx + 1} Failed: got ${result}`);
        console.log(`Test ${idx + 1} Passed: n=${tc.n} -> ${result.length} combinations: ${JSON.stringify(result)}`);
    });

    console.log('\nAll Generate Parentheses tests passed successfully!');
}

runTests();
