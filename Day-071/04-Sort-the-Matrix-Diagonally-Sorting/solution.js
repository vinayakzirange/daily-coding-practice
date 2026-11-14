/**
 * Problem: Sort the Matrix Diagonally (LeetCode 1329)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row
 * or leftmost column and going in the bottom-right direction until reaching the matrix's end.
 * 
 * Given an m x n matrix mat of integers, sort each matrix diagonal in ascending order
 * and return the resulting matrix.
 * 
 * Example 1:
 *  Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
 *  Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
 * 
 * Example 2:
 *  Input: mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]
 *  Output: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]
 * 
 * Constraints:
 *  m == mat.length
 *  n == mat[i].length
 *  1 <= m, n <= 100
 *  1 <= mat[i][j] <= 100
 */

/**
 * Sorts each matrix diagonal in-place by grouping coordinates with equal (row - col).
 * 
 * @param {number[][]} mat
 * @return {number[][]}
 * 
 * Complexity:
 *  Time: O(M * N * log(min(M, N))) - Each diagonal of length at most min(M, N) is sorted.
 *  Space: O(M * N) - Hash Map storing elements of all diagonals.
 */
function diagonalSort(mat) {
    const m = mat.length;
    const n = mat[0].length;
    const diagonals = new Map();

    // Group elements by diagonal identifier (r - c)
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const key = r - c;
            if (!diagonals.has(key)) {
                diagonals.set(key, []);
            }
            diagonals.get(key).push(mat[r][c]);
        }
    }

    // Sort descending so pop() yields elements in ascending order
    for (const [key, values] of diagonals.entries()) {
        values.sort((a, b) => b - a);
    }

    // Reconstruct matrix by popping smallest elements
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            mat[r][c] = diagonals.get(r - c).pop();
        }
    }

    return mat;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const m1 = [
        [3, 3, 1, 1],
        [2, 2, 1, 2],
        [1, 1, 1, 2]
    ];
    const res1 = diagonalSort(m1);
    const expected1 = [
        [1, 1, 1, 1],
        [1, 2, 2, 2],
        [1, 2, 3, 3]
    ];
    assert.deepStrictEqual(res1, expected1, "Test 1 Failed");

    // Test 2: Single element
    const m2 = [[5]];
    assert.deepStrictEqual(diagonalSort(m2), [[5]], "Test 2 Failed");

    // Test 3: Single row
    const m3 = [[3, 2, 1]];
    assert.deepStrictEqual(diagonalSort(m3), [[3, 2, 1]], "Test 3 Failed");

    // Test 4: Single column
    const m4 = [[3], [2], [1]];
    assert.deepStrictEqual(diagonalSort(m4), [[3], [2], [1]], "Test 4 Failed");

    console.log("All Sort the Matrix Diagonally tests passed successfully!");
}

runTests();
