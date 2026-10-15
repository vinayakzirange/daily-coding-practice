/**
 * Problem: Spiral Matrix (LeetCode 54)
 * Difficulty: Medium
 * Topic: Array / Matrix / Simulation
 *
 * Description:
 * Given an m x n matrix, return all elements of the matrix in spiral order.
 *
 * Example 1:
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [1,2,3,6,9,8,7,4,5]
 *
 * Example 2:
 * Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 *
 * Constraints:
 * - m == matrix.length
 * - n == matrix[i].length
 * - 1 <= m, n <= 10
 * - -100 <= matrix[i][j] <= 100
 *
 * Complexity Analysis:
 * - Time Complexity: O(m * n) visiting every element exactly once.
 * - Space Complexity: O(1) constant extra space (excluding the output array).
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return [];
    }

    const result = [];
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // 1. Traverse Right along the top boundary
        for (let c = left; c <= right; c++) {
            result.push(matrix[top][c]);
        }
        top++;

        // 2. Traverse Down along the right boundary
        for (let r = top; r <= bottom; r++) {
            result.push(matrix[r][right]);
        }
        right--;

        // 3. Traverse Left along the bottom boundary (if still within bounds)
        if (top <= bottom) {
            for (let c = right; c >= left; c--) {
                result.push(matrix[bottom][c]);
            }
            bottom--;
        }

        // 4. Traverse Up along the left boundary (if still within bounds)
        if (left <= right) {
            for (let r = bottom; r >= top; r--) {
                result.push(matrix[r][left]);
            }
            left++;
        }
    }

    return result;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testCases = [
    {
        matrix: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ],
        expected: [1, 2, 3, 6, 9, 8, 7, 4, 5]
    },
    {
        matrix: [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12]
        ],
        expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
    },
    {
        matrix: [[1]],
        expected: [1]
    },
    {
        matrix: [[1, 2, 3]],
        expected: [1, 2, 3]
    },
    {
        matrix: [[1], [2], [3]],
        expected: [1, 2, 3]
    },
    {
        matrix: [
            [2, 5, 8],
            [4, 0, -1]
        ],
        expected: [2, 5, 8, -1, 0, 4]
    }
];

testCases.forEach((tc, idx) => {
    const result = spiralOrder(tc.matrix);
    if (!arraysEqual(result, tc.expected)) {
        console.error(`Test ${idx + 1} Failed: got [${result}], expected [${tc.expected}]`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: grid ${tc.matrix.length}x${tc.matrix[0].length} -> spiral length = ${result.length}`);
});

console.log("\nAll Spiral Matrix tests passed successfully!");
