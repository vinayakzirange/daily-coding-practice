/**
 * ====================================================================
 * Problem: Complex Number Multiplication (LeetCode 537)
 * Difficulty: Medium
 * Topic: Math, String, Simulation
 * ====================================================================
 * 
 * A complex number can be represented as a string on the form "real+imaginaryi"
 * where:
 * - real is the real part and is an integer in the range [-100, 100].
 * - imaginary is the imaginary part and is an integer in the range [-100, 100].
 * - i^2 == -1.
 * 
 * Given two complex numbers num1 and num2 as strings, return a string of
 * the complex number that represents their multiplication.
 * 
 * Example 1:
 * Input: num1 = "1+1i", num2 = "1+1i"
 * Output: "0+2i"
 * Explanation: (1 + i) * (1 + i) = 1 + i^2 + 2 * i = 2 * i,
 * and you need convert it to the form of 0+2i.
 * 
 * Example 2:
 * Input: num1 = "1+-1i", num2 = "1+-1i"
 * Output: "0+-2i"
 * Explanation: (1 - i) * (1 - i) = 1 + i^2 - 2 * i = -2 * i,
 * and you need convert it to the form of 0+-2i.
 * 
 * Constraints:
 * - num1 and num2 are valid complex numbers.
 * ====================================================================
 */

/**
 * Multiplies two complex numbers:
 * (a + bi) * (c + di) = (ac - bd) + (ad + bc)i
 * 
 * Complexity:
 * - Time: O(1) fixed length string parsing and arithmetic
 * - Space: O(1)
 * 
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function complexNumberMultiply(num1, num2) {
    // Parse real and imaginary parts by removing trailing 'i' and splitting by '+'
    const [a, b] = num1.slice(0, -1).split("+").map(Number);
    const [c, d] = num2.slice(0, -1).split("+").map(Number);

    const realPart = a * c - b * d;
    const imagPart = a * d + b * c;

    return `${realPart}+${imagPart}i`;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: "1+1i" * "1+1i" -> "0+2i"
    console.assert(
        complexNumberMultiply("1+1i", "1+1i") === "0+2i",
        "Test 1 Failed: expected '0+2i'"
    );

    // Test 2: "1+-1i" * "1+-1i" -> "0+-2i"
    console.assert(
        complexNumberMultiply("1+-1i", "1+-1i") === "0+-2i",
        "Test 2 Failed: expected '0+-2i'"
    );

    // Test 3: "1+0i" * "1+0i" -> "1+0i"
    console.assert(
        complexNumberMultiply("1+0i", "1+0i") === "1+0i",
        "Test 3 Failed: expected '1+0i'"
    );

    // Test 4: "0+2i" * "0+-3i" -> (0 - (-6)) + (0)i = "6+0i"
    console.assert(
        complexNumberMultiply("0+2i", "0+-3i") === "6+0i",
        "Test 4 Failed: expected '6+0i'"
    );

    // Test 5: "3+-5i" * "-2+4i"
    // real: 3*(-2) - (-5)*4 = -6 - (-20) = 14
    // imag: 3*4 + (-5)*(-2) = 12 + 10 = 22
    console.assert(
        complexNumberMultiply("3+-5i", "-2+4i") === "14+22i",
        "Test 5 Failed: expected '14+22i'"
    );

    console.log("All Complex Number Multiplication tests passed successfully!");
}

module.exports = { complexNumberMultiply };
