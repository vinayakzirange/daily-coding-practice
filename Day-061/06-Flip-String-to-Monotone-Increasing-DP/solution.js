/**
 * LeetCode 926: Flip String to Monotone Increasing (Medium)
 * https://leetcode.com/problems/flip-string-to-monotone-increasing/
 *
 * A binary string is monotone increasing if it consists of some number of 0's (possibly none),
 * followed by some number of 1's (also possibly none).
 *
 * You are given a binary string s. You can flip s[i] changing a 0 to a 1 or a 1 to a 0.
 *
 * Return the minimum number of flips to make s monotone increasing.
 *
 * Example 1:
 * Input: s = "00110"
 * Output: 1
 * Explanation: We flip the last digit to get 00111.
 *
 * Example 2:
 * Input: s = "010110"
 * Output: 2
 * Explanation: We flip to get 011111, or 000111.
 *
 * Example 3:
 * Input: s = "00011000"
 * Output: 2
 * Explanation: We flip to get 00000000.
 *
 * Constraints:
 * - 1 <= s.length <= 10^5
 * - s[i] is either '0' or '1'.
 *
 * @param {string} s
 * @return {number}
 */
function minFlipsMonoIncr(s) {
    let onesCount = 0;
    let flipCount = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            onesCount++;
        } else {
            // Either flip this '0' to '1' (flipCount + 1),
            // or keep this '0' as 0 and flip all previous '1's to '0's (onesCount).
            flipCount = Math.min(flipCount + 1, onesCount);
        }
    }

    return flipCount;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    console.assert(minFlipsMonoIncr("00110") === 1, "Test 1 Failed");

    // Test 2: Example 2
    console.assert(minFlipsMonoIncr("010110") === 2, "Test 2 Failed");

    // Test 3: Example 3
    console.assert(minFlipsMonoIncr("00011000") === 2, "Test 3 Failed");

    // Test 4: Already monotone increasing
    console.assert(minFlipsMonoIncr("000111") === 0, "Test 4 Failed");

    // Test 5: All 1s
    console.assert(minFlipsMonoIncr("11111") === 0, "Test 5 Failed");

    // Test 6: Strictly decreasing "10"
    console.assert(minFlipsMonoIncr("10") === 1, "Test 6 Failed");

    console.log("All Flip String to Monotone Increasing tests passed successfully!");
}

runTests();

