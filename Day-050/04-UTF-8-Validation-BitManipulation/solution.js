/**
 * ====================================================================
 * Problem: UTF-8 Validation (LeetCode 393)
 * Difficulty: Medium
 * Topic: Array, Bit Manipulation
 * ====================================================================
 * 
 * Given an integer array data representing the data, return whether it
 * is a valid UTF-8 encoding (i.e. it translates to a sequence of valid
 * UTF-8 encoded characters).
 * 
 * A character in UTF8 can be from 1 to 4 bytes long, subjected to the
 * following rules:
 * 1. For a 1-byte character, the first bit is a 0, followed by its Unicode code.
 * 2. For an n-bytes character, the first n bits are all one's, the n + 1 bit
 *    is 0, followed by n - 1 bytes with the most significant 2 bits being 10.
 * 
 * This is how the UTF-8 encoding would work:
 *      Number of Bytes   |        UTF-8 Octet Sequence
 *                        |              (binary)
 *    --------------------+---------------------------------------------
 *             1          | 0xxxxxxx
 *             2          | 110xxxxx 10xxxxxx
 *             3          | 1110xxxx 10xxxxxx 10xxxxxx
 *             4          | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 * 
 * Note: The input is an array of integers. Only the least significant 8
 * bits of each integer are used to store the data. This means each integer
 * represents only 1 byte of data.
 * 
 * Example 1:
 * Input: data = [197,130,1]
 * Output: true
 * Explanation: data represents the octet sequence: 11000101 10000010 00000001.
 * It is a valid 2-byte character followed by a 1-byte character.
 * 
 * Example 2:
 * Input: data = [235,140,4]
 * Output: false
 * Explanation: data represented the octet sequence: 11101011 10001100 00000100.
 * The first 3 bits are all one's and the 4th bit is 0, meaning it is a 3-byte
 * character. The next byte is a continuation byte which starts with 10 and that's
 * okay. The third byte starts with 00 which is NOT a continuation byte (must start with 10).
 * 
 * Constraints:
 * - 1 <= data.length <= 2 * 10^4
 * - 0 <= data[i] <= 255
 * ====================================================================
 */

/**
 * Validates UTF-8 octet sequences using Bit Manipulation.
 * 
 * Time Complexity: O(n) single pass
 * Space Complexity: O(1) auxiliary variables
 * 
 * @param {number[]} data
 * @return {boolean}
 */
function validUtf8(data) {
    let remainingBytes = 0;

    for (let byte of data) {
        // Keep only least significant 8 bits
        byte = byte & 0xFF;

        if (remainingBytes === 0) {
            // Check leading byte
            if ((byte >> 7) === 0b0) {
                // 1-byte character: 0xxxxxxx
                remainingBytes = 0;
            } else if ((byte >> 5) === 0b110) {
                // 2-byte character: 110xxxxx
                remainingBytes = 1;
            } else if ((byte >> 4) === 0b1110) {
                // 3-byte character: 1110xxxx
                remainingBytes = 2;
            } else if ((byte >> 3) === 0b11110) {
                // 4-byte character: 11110xxx
                remainingBytes = 3;
            } else {
                // Invalid start pattern
                return false;
            }
        } else {
            // Continuation byte must start with 10xxxxxx
            if ((byte >> 6) !== 0b10) {
                return false;
            }
            remainingBytes--;
        }
    }

    return remainingBytes === 0;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [197, 130, 1] -> true (2-byte + 1-byte)
    const t1 = [197, 130, 1];
    console.assert(validUtf8(t1) === true, "Test 1 failed");
    console.log(`Test 1 Passed: [197, 130, 1] -> true`);

    // Test 2: [235, 140, 4] -> false (3rd byte invalid continuation)
    const t2 = [235, 140, 4];
    console.assert(validUtf8(t2) === false, "Test 2 failed");
    console.log(`Test 2 Passed: [235, 140, 4] -> false`);

    // Test 3: Single valid 1-byte
    console.assert(validUtf8([0]) === true, "Test 3 failed");
    console.log(`Test 3 Passed: [0] -> true`);

    // Test 4: Incomplete multi-byte sequence
    console.assert(validUtf8([235, 140]) === false, "Test 4 failed");
    console.log(`Test 4 Passed: incomplete sequence -> false`);

    // Test 5: 4-byte sequence valid: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    // 0b11110000 = 240, 0b10000000 = 128
    const t5 = [240, 128, 128, 128];
    console.assert(validUtf8(t5) === true, "Test 5 failed");
    console.log(`Test 5 Passed: [240, 128, 128, 128] -> true`);

    console.log("\nAll UTF-8 Validation tests passed successfully!");
}

module.exports = { validUtf8 };
