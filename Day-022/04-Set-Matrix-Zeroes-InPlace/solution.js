/**
 * Problem: Set Matrix Zeroes
 * Topic: 2D Grid / In-Place Flagging
 * Language: JavaScript
 *
 * Approach:
 * Use first row and first column of matrix as markers for row/column zero status.
 * Use a separate flag 'firstRowZero' to track if first row initially contained zero.
 * Iterate backwards to set cells to 0 based on markers.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(1)
 */

function setZeroes(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let firstRowZero = false;
    let firstColZero = false;

    for (let r = 0; r < rows; r++) {
        if (matrix[r][0] === 0) firstColZero = true;
    }
    for (let c = 0; c < cols; c++) {
        if (matrix[0][c] === 0) firstRowZero = true;
    }

    for (let r = 1; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
            if (matrix[r][c] === 0) {
                matrix[r][0] = 0;
                matrix[0][c] = 0;
            }
        }
    }

    for (let r = 1; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
            if (matrix[r][0] === 0 || matrix[0][c] === 0) {
                matrix[r][c] = 0;
            }
        }
    }

    if (firstColZero) {
        for (let r = 0; r < rows; r++) matrix[r][0] = 0;
    }
    if (firstRowZero) {
        for (let c = 0; c < cols; c++) matrix[0][c] = 0;
    }
    return matrix;
}

// Test cases
const grid = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];
console.log("Set Zeroes Result ->", setZeroes(grid));
