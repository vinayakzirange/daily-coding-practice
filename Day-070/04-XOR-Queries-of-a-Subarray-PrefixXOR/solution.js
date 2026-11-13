/**
 * Problem: XOR Queries of a Subarray (LeetCode 1310)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * You are given an array arr of positive integers. You are also given the array queries
 * where queries[i] = [left_i, right_i].
 * 
 * For each query i compute the XOR of elements from left_i to right_i
 * (that is, arr[left_i] ^ arr[left_i + 1] ^ ... ^ arr[right_i]).
 * 
 * Return an array containing the result for the given queries.
 * 
 * Example 1:
 *  Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
 *  Output: [2,7,14,8]
 *  Explanation: 
 *   The binary representation of the elements in the array are:
 *   1 = 0001 
 *   3 = 0011 
 *   4 = 0100 
 *   8 = 1000 
 *   The XOR queries results are:
 *   [0,1] = 1 ^ 3 = 2 
 *   [1,2] = 3 ^ 4 = 7 
 *   [0,3] = 1 ^ 3 ^ 4 ^ 8 = 14 
 *   [3,3] = 8
 * 
 * Example 2:
 *  Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
 *  Output: [8,0,4,4]
 * 
 * Constraints:
 *  1 <= arr.length, queries.length <= 3 * 10^4
 *  1 <= arr[i] <= 10^9
 *  queries[i].length == 2
 *  0 <= left_i <= right_i < arr.length
 */

/**
 * Answers range XOR queries in O(1) time each using Prefix XOR Array.
 * 
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 * 
 * Complexity:
 *  Time: O(N + Q) - O(N) to build the prefix XOR array, and O(1) per query for Q queries.
 *  Space: O(N) - Prefix XOR lookup table.
 */
function xorQueries(arr, queries) {
    const n = arr.length;
    const prefix = new Int32Array(n + 1);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] ^ arr[i];
    }

    const result = new Array(queries.length);
    for (let q = 0; q < queries.length; q++) {
        const [left, right] = queries[q];
        result[q] = prefix[right + 1] ^ prefix[left];
    }

    return result;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const res1 = xorQueries([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]]);
    assert.deepStrictEqual(res1, [2, 7, 14, 8], `Test 1 Failed: ${JSON.stringify(res1)}`);

    // Test 2: Example 2
    const res2 = xorQueries([4, 8, 2, 10], [[2, 3], [1, 3], [0, 0], [0, 3]]);
    assert.deepStrictEqual(res2, [8, 0, 4, 4], `Test 2 Failed: ${JSON.stringify(res2)}`);

    // Test 3: Single element array
    const res3 = xorQueries([7], [[0, 0]]);
    assert.deepStrictEqual(res3, [7], "Test 3 Failed");

    // Test 4: Full range identical values (x ^ x = 0)
    const res4 = xorQueries([5, 5], [[0, 1]]);
    assert.deepStrictEqual(res4, [0], "Test 4 Failed");

    console.log("All XOR Queries of a Subarray tests passed successfully!");
}

runTests();
