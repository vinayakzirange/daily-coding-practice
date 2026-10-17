/**
 * Problem: Search a 2D Matrix (LeetCode 74)
 * Difficulty: Medium
 * Topic: Array / Binary Search / Matrix
 *
 * Description:
 * You are given an m x n integer matrix matrix with the following two properties:
 * - Each row is sorted in non-decreasing order.
 * - The first integer of each row is greater than the last integer of the previous row.
 *
 * Given an integer target, return true if target is in matrix or false otherwise.
 *
 * You must write a solution in O(log(m * n)) time complexity.
 *
 * Example 1:
 * Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 * Output: true
 *
 * Example 2:
 * Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
 * Output: false
 *
 * Constraints:
 * - m == matrix.length
 * - n == matrix[i].length
 * - 1 <= m, n <= 100
 * - -10^4 <= matrix[i][j], target <= 10^4
 *
 * Complexity Analysis:
 * - Time Complexity: O(log(m * n)) treating the matrix as a flattened 1D sorted array.
 * - Space Complexity: O(1) constant auxiliary memory.
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

    const rows = matrix.length;
    const cols = matrix[0].length;

    let left = 0;
    let right = rows * cols - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        // Map 1D index mid to 2D row and column
        const r = Math.floor(mid / cols);
        const c = mid % cols;
        const val = matrix[r][c];

        if (val === target) {
            return true;
        } else if (val < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    {
        matrix: [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60]
        ],
        target: 3,
        expected: true
    },
    {
        matrix: [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60]
        ],
        target: 13,
        expected: false
    },
    {
        matrix: [[1]],
        target: 1,
        expected: true
    },
    {
        matrix: [[1]],
        target: 2,
        expected: false
    },
    {
        matrix: [
            [1, 3]
        ],
        target: 3,
        expected: true
    },
    {
        matrix: [
            [1],
            [3]
        ],
        target: 2,
        expected: false
    }
];

testCases.forEach((tc, idx) => {
    const result = searchMatrix(tc.matrix, tc.target);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: target=${tc.target}, got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: grid ${tc.matrix.length}x${tc.matrix[0].length}, target=${tc.target} -> found = ${result}`);
});

console.log("\nAll Search a 2D Matrix tests passed successfully!");
