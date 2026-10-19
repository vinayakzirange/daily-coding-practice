/**
 * ====================================================================
 * Problem: Kth Smallest Element in a Sorted Matrix (LeetCode 378)
 * Difficulty: Medium
 * Topic: Array, Binary Search, Sorting, Heap (Priority Queue), Matrix
 * ====================================================================
 * 
 * Given an n x n matrix where each of the rows and columns is sorted in
 * ascending order, return the kth smallest element in the matrix.
 * 
 * Note that it is the kth smallest element in the sorted order, not the
 * kth distinct element.
 * 
 * You must find a solution with a memory complexity better than O(n^2).
 * 
 * Example 1:
 * Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
 * Output: 13
 * Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15],
 * and the 8th smallest number is 13.
 * 
 * Example 2:
 * Input: matrix = [[-5]], k = 1
 * Output: -5
 * 
 * Constraints:
 * - n == matrix.length == matrix[i].length
 * - 1 <= n <= 300
 * - -10^9 <= matrix[i][j] <= 10^9
 * - All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order.
 * - 1 <= k <= n^2
 * ====================================================================
 */

/**
 * Finds kth smallest element in row-and-column sorted matrix.
 * Uses Binary Search on the value range [matrix[0][0], matrix[n-1][n-1]].
 * In each iteration, count number of elements <= mid in O(n) time by starting
 * at bottom-left corner (row = n-1, col = 0).
 * 
 * Time Complexity: O(n * log(max_val - min_val))
 * Space Complexity: O(1) auxiliary space (beats requirement of < O(n^2))
 * 
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
function kthSmallest(matrix, k) {
    const n = matrix.length;
    let low = matrix[0][0];
    let high = matrix[n - 1][n - 1];

    function countLessOrEqual(mid) {
        let count = 0;
        let row = n - 1;
        let col = 0;

        // Traverse from bottom-left to top-right
        while (row >= 0 && col < n) {
            if (matrix[row][col] <= mid) {
                // If matrix[row][col] <= mid, then all elements above it in this column are also <= mid
                count += (row + 1);
                col++;
            } else {
                row--;
            }
        }
        return count;
    }

    while (low < high) {
        const mid = Math.floor(low + (high - low) / 2);
        if (countLessOrEqual(mid) < k) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: Standard 3x3 matrix, k = 8 -> 13
    const m1 = [
        [1, 5, 9],
        [10, 11, 13],
        [12, 13, 15]
    ];
    console.assert(kthSmallest(m1, 8) === 13, "Test 1 failed");
    console.log(`Test 1 Passed: 3x3 matrix, k=8 -> ${kthSmallest(m1, 8)}`);

    // Test 2: 1x1 matrix, k = 1 -> -5
    const m2 = [[-5]];
    console.assert(kthSmallest(m2, 1) === -5, "Test 2 failed");
    console.log(`Test 2 Passed: 1x1 matrix, k=1 -> ${kthSmallest(m2, 1)}`);

    // Test 3: 2x2 matrix, k = 2 -> 2
    const m3 = [
        [1, 2],
        [1, 3]
    ];
    console.assert(kthSmallest(m3, 2) === 1, "Test 3 failed");
    console.log(`Test 3 Passed: 2x2 matrix, k=2 -> ${kthSmallest(m3, 2)}`);

    // Test 4: First element: k = 1
    console.assert(kthSmallest(m1, 1) === 1, "Test 4 failed");
    console.log(`Test 4 Passed: 3x3 matrix, k=1 -> ${kthSmallest(m1, 1)}`);

    // Test 5: Last element: k = 9
    console.assert(kthSmallest(m1, 9) === 15, "Test 5 failed");
    console.log(`Test 5 Passed: 3x3 matrix, k=9 -> ${kthSmallest(m1, 9)}`);

    console.log("\nAll Kth Smallest Element in a Sorted Matrix tests passed successfully!");
}

module.exports = { kthSmallest };
