/**
 * Problem: Rotate Image (LeetCode 48)
 * Difficulty: Medium
 * Topic: Array / Math / Matrix / In-Place
 *
 * Description:
 * You are given an n x n 2D matrix representing an image, rotate the image
 * by 90 degrees (clockwise).
 *
 * You have to rotate the image in-place, which means you have to modify the
 * input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
 *
 * Example 1:
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [[7,4,1],[8,5,2],[9,6,3]]
 *
 * Example 2:
 * Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
 * Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 *
 * Constraints:
 * - n == matrix.length == matrix[i].length
 * - 1 <= n <= 20
 * - -1000 <= matrix[i][j] <= 1000
 *
 * Complexity Analysis:
 * - Time Complexity: O(n^2) visiting each cell a constant number of times.
 * - Space Complexity: O(1) strictly in-place transformation without auxiliary memory.
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix) {
    const n = matrix.length;

    // Step 1: Transpose the matrix across the main diagonal
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // Step 2: Reverse each row horizontally
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

// ==========================================
// Test Cases & Verification
// ==========================================
function matricesEqual(m1, m2) {
    if (m1.length !== m2.length) return false;
    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m1[i].length; j++) {
            if (m1[i][j] !== m2[i][j]) return false;
        }
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
        expected: [
            [7, 4, 1],
            [8, 5, 2],
            [9, 6, 3]
        ]
    },
    {
        matrix: [
            [5, 1, 9, 11],
            [2, 4, 8, 10],
            [13, 3, 6, 7],
            [15, 14, 12, 16]
        ],
        expected: [
            [15, 13, 2, 5],
            [14, 3, 4, 1],
            [12, 6, 8, 9],
            [16, 7, 10, 11]
        ]
    },
    {
        matrix: [[1]],
        expected: [[1]]
    },
    {
        matrix: [
            [1, 2],
            [3, 4]
        ],
        expected: [
            [3, 1],
            [4, 2]
        ]
    }
];

testCases.forEach((tc, idx) => {
    const copy = tc.matrix.map(row => [...row]);
    rotate(copy);
    if (!matricesEqual(copy, tc.expected)) {
        console.error(`Test ${idx + 1} Failed: got ${JSON.stringify(copy)}, expected ${JSON.stringify(tc.expected)}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: ${tc.matrix.length}x${tc.matrix.length} matrix rotated clockwise`);
});

console.log("\nAll Rotate Image tests passed successfully!");
