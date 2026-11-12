/**
 * Problem: Jump Game III (LeetCode 1306)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given an array of non-negative integers arr, you are initially positioned at start index of the array.
 * When you are at index i, you can jump to i + arr[i] or i - arr[i].
 * Check if you can reach any index with value 0.
 * Notice that you cannot jump outside of the array at any time.
 * 
 * Example 1:
 *  Input: arr = [4,2,3,0,3,1,2], start = 5
 *  Output: true
 *  Explanation: 
 *   All possible ways to reach at index 3 with value 0 are: 
 *   index 5 -> index 4 -> index 1 -> index 3 
 *   index 5 -> index 6 -> index 4 -> index 1 -> index 3 
 * 
 * Example 2:
 *  Input: arr = [4,2,3,0,3,1,2], start = 0
 *  Output: true
 *  Explanation: 
 *   One possible way is: index 0 -> index 4 -> index 1 -> index 3
 * 
 * Example 3:
 *  Input: arr = [3,0,2,1,2], start = 2
 *  Output: false
 *  Explanation: There is no way to reach at index 1 with value 0.
 * 
 * Constraints:
 *  1 <= arr.length <= 5 * 10^4
 *  0 <= arr[i] < arr.length
 *  0 <= start < arr.length
 */

/**
 * Determines if an index with value 0 is reachable using Breadth-First Search (BFS).
 * 
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 * 
 * Complexity:
 *  Time: O(N) - Visits each index at most once.
 *  Space: O(N) - BFS queue and visited tracking array.
 */
function canReach(arr, start) {
    const n = arr.length;
    const visited = new Uint8Array(n);
    const queue = [start];
    visited[start] = 1;
    let head = 0;

    while (head < queue.length) {
        const curr = queue[head++];

        if (arr[curr] === 0) {
            return true;
        }

        const jump = arr[curr];
        const nextIndices = [curr + jump, curr - jump];

        for (const next of nextIndices) {
            if (next >= 0 && next < n && visited[next] === 0) {
                visited[next] = 1;
                queue.push(next);
            }
        }
    }

    return false;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(canReach([4, 2, 3, 0, 3, 1, 2], 5), true, "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(canReach([4, 2, 3, 0, 3, 1, 2], 0), true, "Test 2 Failed");

    // Test 3: Example 3 (Unreachable 0)
    assert.strictEqual(canReach([3, 0, 2, 1, 2], 2), false, "Test 3 Failed");

    // Test 4: Start is already 0
    assert.strictEqual(canReach([0], 0), true, "Test 4 Failed");

    // Test 5: Infinite loop without 0
    assert.strictEqual(canReach([1, 1], 0), false, "Test 5 Failed");

    console.log("All Jump Game III tests passed successfully!");
}

runTests();
