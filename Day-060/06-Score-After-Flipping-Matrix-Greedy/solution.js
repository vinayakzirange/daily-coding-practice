/**
 * LeetCode 861: Score After Flipping Matrix (Medium)
 * https://leetcode.com/problems/score-after-flipping-matrix/
 *
 * You are given an m x n binary matrix grid.
 *
 * A move consists of choosing any row or column and toggling each value in that row
 * or column (i.e., changing all 0's to 1's, and all 1's to 0's).
 *
 * Every row of the matrix is interpreted as a binary number, and the score of
 * the matrix is the sum of these numbers.
 *
 * Return the highest possible score after making any number of moves (including zero moves).
 *
 * Example 1:
 * Input: grid = [[0,0,1,1],[1,0,1,0],[1,1,0,0]]
 * Output: 39
 * Explanation:
 * 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39
 *
 * Example 2:
 * Input: grid = [[0]]
 * Output: 1
 *
 * Constraints:
 * - m == grid.length
 * - n == grid[i].length
 * - 1 <= m, n <= 20
 * - grid[i][j] is either 0 or 1.
 *
 * @param {number[][]} grid
 * @return {number}
 */
function matrixScore(grid) {
    const m = grid.length;
    const n = grid[0].length;

    // Column 0: We want all rows to have 1 in column 0 (most significant bit).
    // Thus, column 0 contributes m * (1 << (n - 1)).
    let totalScore = m * (1 << (n - 1));

    // For each subsequent column c (from 1 to n - 1):
    // If grid[r][0] was 0, row r would be flipped.
    // Under that row flip, grid[r][c] becomes 1 iff grid[r][c] === grid[r][0].
    for (let c = 1; c < n; c++) {
        let sameCount = 0;
        for (let r = 0; r < m; r++) {
            if (grid[r][c] === grid[r][0]) {
                sameCount++;
            }
        }
        // Greedily choose whether to flip column c:
        // Maximize the number of 1s in this column: max(sameCount, m - sameCount)
        const maxOnes = Math.max(sameCount, m - sameCount);
        totalScore += maxOnes * (1 << (n - 1 - c));
    }

    return totalScore;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    const grid1 = [
        [0, 0, 1, 1],
        [1, 0, 1, 0],
        [1, 1, 0, 0]
    ];
    console.assert(matrixScore(grid1) === 39, `Test 1 Failed: got ${matrixScore(grid1)}, expected 39`);

    // Test 2: Single 0 element
    const grid2 = [[0]];
    console.assert(matrixScore(grid2) === 1, `Test 2 Failed: got ${matrixScore(grid2)}, expected 1`);

    // Test 3: Already all 1s
    const grid3 = [
        [1, 1],
        [1, 1]
    ];
    console.assert(matrixScore(grid3) === 6, `Test 3 Failed: got ${matrixScore(grid3)}, expected 6`);

    // Test 4: All 0s
    const grid4 = [
        [0, 0],
        [0, 0]
    ];
    // Flipping rows gives [[1, 1], [1, 1]] -> 3 + 3 = 6
    console.assert(matrixScore(grid4) === 6, `Test 4 Failed: got ${matrixScore(grid4)}, expected 6`);

    console.log("All Score After Flipping Matrix tests passed successfully!");
}

runTests();
