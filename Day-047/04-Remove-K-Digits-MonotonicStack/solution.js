/**
 * ====================================================================
 * Problem: Remove K Digits (LeetCode 402)
 * Difficulty: Medium
 * Topic: String, Stack, Greedy, Monotonic Stack
 * ====================================================================
 * 
 * Given string num representing a non-negative integer num, and an integer k,
 * return the smallest possible integer after removing k digits from num.
 * 
 * Example 1:
 * Input: num = "1432219", k = 3
 * Output: "1219"
 * Explanation: Remove the three digits 4, 3, and 2 to form the new number
 * 1219 which is the smallest.
 * 
 * Example 2:
 * Input: num = "10200", k = 1
 * Output: "200"
 * Explanation: Remove the leading 1 and the number is 200. Note that the
 * output must not contain leading zeroes.
 * 
 * Example 3:
 * Input: num = "10", k = 2
 * Output: "0"
 * Explanation: Remove all the digits from the number and it is left with nothing
 * which is 0.
 * 
 * Constraints:
 * - 1 <= k <= num.length <= 10^5
 * - num consists of only digits.
 * - num does not have any leading zeros except for the zero itself.
 * ====================================================================
 */

/**
 * Removes k digits to obtain the smallest possible numerical value.
 * Uses a Monotonic Increasing Stack to greedily drop larger digits preceding smaller ones.
 * 
 * Time Complexity: O(n) where n = num.length
 * Space Complexity: O(n) for monotonic stack
 * 
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
function removeKdigits(num, k) {
    if (k >= num.length) {
        return "0";
    }

    const stack = [];

    for (let digit of num) {
        // While current digit is smaller than stack top and we still have removals left
        while (stack.length > 0 && k > 0 && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }

    // If removals still remaining, pop from tail (largest at the end)
    while (k > 0) {
        stack.pop();
        k--;
    }

    // Strip leading zeroes
    let startIdx = 0;
    while (startIdx < stack.length && stack[startIdx] === '0') {
        startIdx++;
    }

    const result = stack.slice(startIdx).join('');
    return result.length === 0 ? "0" : result;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: num = "1432219", k = 3 -> "1219"
    const t1 = removeKdigits("1432219", 3);
    console.assert(t1 === "1219", `Test 1 failed: ${t1}`);
    console.log(`Test 1 Passed: "1432219", k=3 -> "${t1}"`);

    // Test 2: num = "10200", k = 1 -> "200"
    const t2 = removeKdigits("10200", 1);
    console.assert(t2 === "200", `Test 2 failed: ${t2}`);
    console.log(`Test 2 Passed: "10200", k=1 -> "${t2}"`);

    // Test 3: num = "10", k = 2 -> "0"
    const t3 = removeKdigits("10", 2);
    console.assert(t3 === "0", `Test 3 failed: ${t3}`);
    console.log(`Test 3 Passed: "10", k=2 -> "${t3}"`);

    // Test 4: num = "9", k = 1 -> "0"
    const t4 = removeKdigits("9", 1);
    console.assert(t4 === "0", `Test 4 failed: ${t4}`);
    console.log(`Test 4 Passed: "9", k=1 -> "${t4}"`);

    // Test 5: Monotonically increasing: "123456", k = 3 -> "123"
    const t5 = removeKdigits("123456", 3);
    console.assert(t5 === "123", `Test 5 failed: ${t5}`);
    console.log(`Test 5 Passed: "123456", k=3 -> "${t5}"`);

    // Test 6: Monotonically decreasing: "654321", k = 3 -> "321"
    const t6 = removeKdigits("654321", 3);
    console.assert(t6 === "321", `Test 6 failed: ${t6}`);
    console.log(`Test 6 Passed: "654321", k=3 -> "${t6}"`);

    console.log("\nAll Remove K Digits tests passed successfully!");
}

module.exports = { removeKdigits };
