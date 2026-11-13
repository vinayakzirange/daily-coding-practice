/**
 * Problem: Reduce Array Size to The Half (LeetCode 1338)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * You are given an integer array arr. You can choose a set of integers and remove all the occurrences
 * of these integers in the array.
 * 
 * Return the minimum size of the set so that at least half of the integers of the array are removed.
 * 
 * Example 1:
 *  Input: arr = [3,3,3,3,5,5,5,2,2,7]
 *  Output: 2
 *  Explanation: Choosing {3,7} will make the new array [5,5,5,2,2] which has size 5 (i.e. equal to at least half the size of the old array 10).
 *               Possible sizes of set: {3,5} removes 7, size 2.
 *               Minimum set size is 2.
 * 
 * Example 2:
 *  Input: arr = [7,7,7,7,7,7]
 *  Output: 1
 *  Explanation: The only possible set you can choose is {7}. This will make the new array empty.
 * 
 * Constraints:
 *  2 <= arr.length <= 10^5
 *  arr.length is even.
 *  1 <= arr[i] <= 10^5
 */

/**
 * Finds minimum set size to remove at least half of the array elements using Greedy Frequency Sorting.
 * 
 * @param {number[]} arr
 * @return {number}
 * 
 * Complexity:
 *  Time: O(N * log(U)) where N = arr.length and U is count of unique integers.
 *  Space: O(U) for frequency map and sorted counts.
 */
function minSetSize(arr) {
    const counts = new Map();
    for (let i = 0; i < arr.length; i++) {
        counts.set(arr[i], (counts.get(arr[i]) || 0) + 1);
    }

    const freqs = Array.from(counts.values());
    freqs.sort((a, b) => b - a);

    const target = Math.ceil(arr.length / 2);
    let removed = 0;
    let setSize = 0;

    for (let i = 0; i < freqs.length; i++) {
        removed += freqs[i];
        setSize++;
        if (removed >= target) {
            break;
        }
    }

    return setSize;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(minSetSize([3, 3, 3, 3, 5, 5, 5, 2, 2, 7]), 2, "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(minSetSize([7, 7, 7, 7, 7, 7]), 1, "Test 2 Failed");

    // Test 3: All elements unique (must pick n/2 elements)
    assert.strictEqual(minSetSize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 5, "Test 3 Failed");

    // Test 4: One dominant element covering more than half
    assert.strictEqual(minSetSize([1, 1, 1, 1, 2, 3]), 1, "Test 4 Failed");

    // Test 5: Two elements each appearing half
    assert.strictEqual(minSetSize([10, 10, 20, 20]), 1, "Test 5 Failed");

    console.log("All Reduce Array Size to The Half tests passed successfully!");
}

runTests();
