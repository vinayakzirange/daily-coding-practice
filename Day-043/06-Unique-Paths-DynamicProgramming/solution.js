/**
 * Problem: Unique Paths (LeetCode 62)
 * Difficulty: Medium
 * Topic: Math / Dynamic Programming / Combinatorics
 *
 * Description:
 * There is a robot on an m x n grid. The robot is initially located at the
 * top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right
 * corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right
 * at any point in time.
 *
 * Given the two integers m and n, return the number of possible unique paths
 * that the robot can take to reach the bottom-right corner.
 *
 * The test cases are generated so that the answer will be less than or equal to 2 * 10^9.
 *
 * Example 1:
 * Input: m = 3, n = 7
 * Output: 28
 *
 * Example 2:
 * Input: m = 3, n = 2
 * Output: 3
 * Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
 * 1. Right -> Down -> Down
 * 2. Down -> Down -> Right
 * 3. Down -> Right -> Down
 *
 * Constraints:
 * - 1 <= m, n <= 100
 *
 * Complexity Analysis:
 * - Time Complexity: O(m * n) filling the DP table.
 * - Space Complexity: O(n) space-optimized 1D rolling DP array.
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
    // 1D array representing paths to each column in the current row
    const dp = new Array(n).fill(1);

    for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
            // dp[c] was from row above, dp[c-1] is from current row to the left
            dp[c] = dp[c] + dp[c - 1];
        }
    }

    return dp[n - 1];
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { m: 3, n: 7, expected: 28 },
    { m: 3, n: 2, expected: 3 },
    { m: 1, n: 1, expected: 1 },
    { m: 1, n: 10, expected: 1 },
    { m: 10, n: 1, expected: 1 },
    { m: 7, n: 3, expected: 28 },
    { m: 10, n: 10, expected: 48620 },
    { m: 23, n: 12, expected: 193536720 },
];

testCases.forEach((tc, idx) => {
    const result = uniquePaths(tc.m, tc.n);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: m=${tc.m}, n=${tc.n}, got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: grid ${tc.m}x${tc.n} -> unique paths = ${result}`);
});

console.log("\nAll Unique Paths tests passed successfully!");
