/**
 * ====================================================================
 * Problem: Compare Version Numbers (LeetCode 165)
 * Difficulty: Medium
 * Topic: Two Pointers, String
 * ====================================================================
 * 
 * Given two version strings, version1 and version2, compare them. A version
 * number consists of revisions separated by dots '.'. The value of the revision
 * is its integer conversion ignoring leading zeros.
 * 
 * To compare version numbers, compare their revision values in left-to-right order.
 * If one of the version strings has fewer revisions, treat the missing revision
 * values as 0.
 * 
 * Return the following:
 * - If version1 < version2, return -1.
 * - If version1 > version2, return 1.
 * - Otherwise, return 0.
 * 
 * Example 1:
 * Input: version1 = "1.2", version2 = "1.10"
 * Output: -1
 * Explanation: version1's second revision is "2" and version2's second revision is "10": 2 < 10, so version1 < version2.
 * 
 * Example 2:
 * Input: version1 = "1.01", version2 = "1.001"
 * Output: 0
 * Explanation: Ignoring leading zeroes, both "01" and "001" represent the same integer "1".
 * 
 * Example 3:
 * Input: version1 = "1.0", version2 = "1.0.0.0"
 * Output: 0
 * Explanation: version1 has fewer revisions, which should be treated as "0".
 * 
 * Constraints:
 * - 1 <= version1.length, version2.length <= 500
 * - version1 and version2 only contain digits and '.'.
 * - version1 and version2 are valid version numbers.
 * - All the given revisions in version1 and version2 can be stored in a 32-bit integer.
 * ====================================================================
 */

/**
 * Compares two revision version strings.
 * Uses two pointers without splitting the entire strings into large arrays.
 * 
 * Time Complexity: O(n + m) where n = version1.length, m = version2.length
 * Space Complexity: O(1) auxiliary space
 * 
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
function compareVersion(version1, version2) {
    const n = version1.length;
    const m = version2.length;
    let i = 0;
    let j = 0;

    while (i < n || j < m) {
        let num1 = 0;
        while (i < n && version1[i] !== '.') {
            num1 = num1 * 10 + (version1.charCodeAt(i) - 48);
            i++;
        }

        let num2 = 0;
        while (j < m && version2[j] !== '.') {
            num2 = num2 * 10 + (version2.charCodeAt(j) - 48);
            j++;
        }

        if (num1 < num2) return -1;
        if (num1 > num2) return 1;

        // Skip the '.' delimiter
        i++;
        j++;
    }

    return 0;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: 1.2 vs 1.10
    console.assert(compareVersion("1.2", "1.10") === -1, "Test 1 failed");
    console.log('Test 1 Passed: compareVersion("1.2", "1.10") = -1');

    // Test 2: 1.01 vs 1.001
    console.assert(compareVersion("1.01", "1.001") === 0, "Test 2 failed");
    console.log('Test 2 Passed: compareVersion("1.01", "1.001") = 0');

    // Test 3: 1.0 vs 1.0.0.0
    console.assert(compareVersion("1.0", "1.0.0.0") === 0, "Test 3 failed");
    console.log('Test 3 Passed: compareVersion("1.0", "1.0.0.0") = 0');

    // Test 4: 0.1 vs 1.1
    console.assert(compareVersion("0.1", "1.1") === -1, "Test 4 failed");
    console.log('Test 4 Passed: compareVersion("0.1", "1.1") = -1');

    // Test 5: 1.0.1 vs 1
    console.assert(compareVersion("1.0.1", "1") === 1, "Test 5 failed");
    console.log('Test 5 Passed: compareVersion("1.0.1", "1") = 1');

    // Test 6: 7.5.2.4 vs 7.5.3
    console.assert(compareVersion("7.5.2.4", "7.5.3") === -1, "Test 6 failed");
    console.log('Test 6 Passed: compareVersion("7.5.2.4", "7.5.3") = -1');

    console.log("\nAll Compare Version Numbers tests passed successfully!");
}

module.exports = { compareVersion };
