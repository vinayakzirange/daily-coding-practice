/**
 * Problem: Search a 2D Matrix II (LeetCode 240)
 * Difficulty: Medium
 * Topic: 2D Matrix / Divide and Conquer / Binary Search / Staircase Search
 * 
 * Description:
 * Write an efficient algorithm that searches for a value target in an m x n integer matrix.
 * This matrix has the following properties:
 *   * Integers in each row are sorted in ascending from left to right.
 *   * Integers in each column are sorted in ascending from top to bottom.
 * 
 * Example 1:
 * Input: matrix = [
 *   [1,   4,  7, 11, 15],
 *   [2,   5,  8, 12, 19],
 *   [3,   6,  9, 16, 22],
 *   [10, 13, 14, 17, 24],
 *   [18, 21, 23, 26, 30]
 * ], target = 5
 * Output: true
 * 
 * Example 2:
 * Input: matrix = [
 *   [1,   4,  7, 11, 15],
 *   [2,   5,  8, 12, 19],
 *   [3,   6,  9, 16, 22],
 *   [10, 13, 14, 17, 24],
 *   [18, 21, 23, 26, 30]
 * ], target = 20
 * Output: false
 * 
 * Constraints:
 *   * m == matrix.length
 *   * n == matrix[i].length
 *   * 1 <= n, m <= 300
 *   * -10^9 <= matrix[i][j] <= 10^9
 *   * All the integers in each row are sorted in ascending order.
 *   * All the integers in each column are sorted in ascending order.
 *   * -10^9 <= target <= 10^9
 * 
 * Complexity:
 *   * Time Complexity: O(m + n) - In each step, we eliminate either one row or one column.
 *   * Space Complexity: O(1) - Constant auxiliary space.
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    const m = matrix.length;
    const n = matrix[0].length;

    // Start pointer from the top-right corner of the matrix
    let row = 0;
    let col = n - 1;

    while (row < m && col >= 0) {
        const val = matrix[row][col];

        if (val === target) {
            return true;
        } else if (val > target) {
            // Target is smaller than the smallest element in current column below row,
            // so eliminate the entire column
            col--;
        } else {
            // Target is larger than the largest element in current row before col,
            // so eliminate the current row
            row++;
        }
    }

    return false;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const matrix = [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
    ];

    const testCases = [
        { target: 5, expected: true },
        { target: 20, expected: false },
        { target: 1, expected: true },
        { target: 30, expected: true },
        { target: 0, expected: false },
        { target: 31, expected: false },
        { target: 14, expected: true }
    ];

    testCases.forEach((tc, idx) => {
        const result = searchMatrix(matrix, tc.target);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: target=${tc.target} -> found = ${result}`);
    });

    console.log('\nAll Search a 2D Matrix II tests passed successfully!');
}

runTests();
