/**
 * Problem: Minimum Remove to Make Valid Parentheses (LeetCode 1249)
 * Difficulty: Medium
 * Topic: String / Stack / Greedy
 * 
 * Description:
 * Given a string s of '(' , ')' and lowercase English characters.
 * 
 * Your task is to remove the minimum number of parentheses ( '(' or ')', 
 * in any positions ) so that the resulting parentheses string is valid and return any valid string.
 * 
 * Formally, a parentheses string is valid if and only if:
 * 1. It is the empty string, contains only lowercase characters, or
 * 2. It can be written as AB (A concatenated with B), where A and B are valid strings, or
 * 3. It can be written as (A), where A is a valid string.
 * 
 * Example 1:
 * Input: s = "lee(t(c)o)de)"
 * Output: "lee(t(c)o)de"
 * Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
 * 
 * Example 2:
 * Input: s = "a)b(c)d"
 * Output: "ab(c)d"
 * 
 * Example 3:
 * Input: s = "))(("
 * Output: ""
 * Explanation: An empty string is also valid.
 * 
 * Constraints:
 *   * 1 <= s.length <= 10^5
 *   * s[i] is either '(' , ')', or lowercase English letter.
 * 
 * Complexity:
 *   * Time Complexity: O(n) where n is the length of string s.
 *   * Space Complexity: O(n) for the stack and indices set.
 */

/**
 * @param {string} s
 * @return {string}
 */
function minRemoveToMakeValid(s) {
    const stack = []; // Stores indices of unmatched '('
    const toRemove = new Set(); // Indices of invalid '(' and ')'

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else if (s[i] === ')') {
            if (stack.length > 0) {
                stack.pop(); // Matched pair found
            } else {
                toRemove.add(i); // Unmatched ')' must be removed
            }
        }
    }

    // Any remaining '(' in stack has no matching ')'
    while (stack.length > 0) {
        toRemove.add(stack.pop());
    }

    // Build the result string excluding marked indices
    const result = [];
    for (let i = 0; i < s.length; i++) {
        if (!toRemove.has(i)) {
            result.push(s[i]);
        }
    }

    return result.join('');
}

// Driver & Verification Tests
function runTests() {
    console.log("=== Running Minimum Remove to Make Valid Parentheses Tests ===");

    const t1 = "lee(t(c)o)de)";
    const res1 = minRemoveToMakeValid(t1);
    console.log(`Test 1: "${t1}" -> "${res1}" | Pass: ${res1 === "lee(t(c)o)de"}`);

    const t2 = "a)b(c)d";
    const res2 = minRemoveToMakeValid(t2);
    console.log(`Test 2: "${t2}" -> "${res2}" | Pass: ${res2 === "ab(c)d"}`);

    const t3 = "))((";
    const res3 = minRemoveToMakeValid(t3);
    console.log(`Test 3: "${t3}" -> "${res3}" | Pass: ${res3 === ""}`);

    const t4 = "(a(b(c)d)";
    const res4 = minRemoveToMakeValid(t4);
    console.log(`Test 4: "${t4}" -> "${res4}" | Pass: ${res4 === "a(b(c)d)" || res4 === "(ab(c)d)" || res4 === "(a(bc)d)"}`);
}

runTests();
