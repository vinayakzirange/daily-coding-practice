/**
 * Problem: Multiply Strings (LeetCode 43)
 * Difficulty: Medium
 * Topic: Math / String / Simulation
 *
 * Description:
 * Given two non-negative integers num1 and num2 represented as strings,
 * return the product of num1 and num2, also represented as a string.
 *
 * Note: You must not use any built-in BigInteger library or convert the inputs
 * to integer directly.
 *
 * Example 1:
 * Input: num1 = "2", num2 = "3"
 * Output: "6"
 *
 * Example 2:
 * Input: num1 = "123", num2 = "456"
 * Output: "56088"
 *
 * Constraints:
 * - 1 <= num1.length, num2.length <= 200
 * - num1 and num2 consist of digits only.
 * - Both num1 and num2 do not contain any leading zero, except the number 0 itself.
 *
 * Complexity Analysis:
 * - Time Complexity: O(m * n) where m = num1.length and n = num2.length.
 * - Space Complexity: O(m + n) for the product digits array.
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function multiply(num1, num2) {
    if (num1 === "0" || num2 === "0") {
        return "0";
    }

    const m = num1.length;
    const n = num2.length;
    // Maximum possible digits for product is m + n
    const pos = new Array(m + n).fill(0);

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const mul = (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);
            const p1 = i + j;
            const p2 = i + j + 1;

            const sum = mul + pos[p2];
            pos[p2] = sum % 10;
            pos[p1] += Math.floor(sum / 10);
        }
    }

    // Skip leading zeroes
    let start = 0;
    while (start < pos.length && pos[start] === 0) {
        start++;
    }

    return pos.slice(start).join("");
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { num1: "2", num2: "3", expected: "6" },
    { num1: "123", num2: "456", expected: "56088" },
    { num1: "0", num2: "52", expected: "0" },
    { num1: "999", num2: "999", expected: "998001" },
    { num1: "123456789", num2: "987654321", expected: "121932631112635269" },
    { num1: "1", num2: "1", expected: "1" }
];

testCases.forEach((tc, idx) => {
    const result = multiply(tc.num1, tc.num2);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: "${tc.num1}" * "${tc.num2}" -> got "${result}", expected "${tc.expected}"`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: "${tc.num1}" * "${tc.num2}" = "${result}"`);
});

console.log("\nAll Multiply Strings tests passed successfully!");
