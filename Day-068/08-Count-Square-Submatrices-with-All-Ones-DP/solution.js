/**
 * Problem: Count Square Submatrices with All Ones (LeetCode 1277)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.
 * 
 * Example 1:
 *  Input: matrix =
 *  [
 *    [0,1,1,1],
 *    [1,1,1,1],
 *    [0,1,1,1]
 *  ]
 *  Output: 15
 *  Explanation: 
 *   There are 10 squares of side 1.
 *   There are 4 squares of side 2.
 *   There is 1 square of side 3.
 *   Total number of squares = 10 + 4 + 1 = 15.
 * 
 * Example 2:
 *  Input: matrix = 
 *  [
 *    [1,0,1],
 *    [1,1,0],
 *    [1,1,0]
 *  ]
 *  Output: 7
 *  Explanation: 
 *   There are 6 squares of side 1.  
 *   There is 1 square of side 2. 
 *   Total number of squares = 6 + 1 = 7.
 * 
 * Constraints:
 *  1 <= arr.length <= 300
 *  1 <= arr[0].length <= 300
 *  0 <= arr[i][j] <= 1
 */

/**
 * Counts all square submatrices containing only 1s using 2D Dynamic Programming.
 * 
 * @param {number[][]} matrix
 * @return {number}
 * 
 * Complexity:
 *  Time: O(m * n) - Single pass over the entire matrix.
 *  Space: O(m * n) - DP table storing maximum side length ending at each cell.
 */
function countSquares(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    const dp = Array.from({ length: m }, () => new Int32Array(n));
    let totalSquares = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                if (i === 0 || j === 0) {
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                }
                totalSquares += dp[i][j];
            }
        }
    }

    return totalSquares;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const m1 = [
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 1, 1, 1]
    ];
    assert.strictEqual(countSquares(m1), 15, "Test 1 Failed");

    // Test 2: Example 2
    const m2 = [
        [1, 0, 1],
        [1, 1, 0],
        [1, 1, 0]
    ];
    assert.strictEqual(countSquares(m2), 7, "Test 2 Failed");

    // Test 3: All zeros
    const m3 = [
        [0, 0],
        [0, 0]
    ];
    assert.strictEqual(countSquares(m3), 0, "Test 3 Failed");

    // Test 4: Single 1
    const m4 = [[1]];
    assert.strictEqual(countSquares(m4), 1, "Test 4 Failed");

    // Test 5: 2x2 all ones
    // 4 squares of size 1 + 1 square of size 2 = 5
    const m5 = [
        [1, 1],
        [1, 1]
    ];
    assert.strictEqual(countSquares(m5), 5, "Test 5 Failed");

    console.log("All Count Square Submatrices with All Ones tests passed successfully!");
}

runTests();
