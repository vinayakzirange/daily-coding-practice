/**
 * ====================================================================
 * Problem: Max Chunks To Make Sorted (LeetCode 769)
 * Difficulty: Medium
 * Topic: Array, Stack, Greedy, Monotonic Stack
 * ====================================================================
 * 
 * You are given an integer array arr of length n that represents a
 * permutation of the integers in the range [0, n - 1].
 * 
 * We split arr into some number of chunks (i.e., partitions), and
 * individually sort each chunk. After concatenating them, the result
 * should equal the sorted array.
 * 
 * Return the largest number of chunks we can make to sort the array.
 * 
 * Example 1:
 * Input: arr = [4,3,2,1,0]
 * Output: 1
 * Explanation:
 * Splitting into two or more chunks will not return the required result.
 * For example, splitting into [4, 3], [2, 1, 0] will result in [3, 4, 0, 1, 2],
 * which isn't sorted.
 * 
 * Example 2:
 * Input: arr = [1,0,2,3,4]
 * Output: 4
 * Explanation:
 * We can split them into two chunks, such as [1, 0], [2, 3, 4].
 * However, splitting into [1, 0], [2], [3], [4] is the highest number of chunks possible.
 * 
 * Constraints:
 * - n == arr.length
 * - 1 <= n <= 10
 * - 0 <= arr[i] < n
 * - All the elements of arr are unique.
 * ====================================================================
 */

/**
 * Greedy prefix maximum tracking.
 * When max(arr[0...i]) === i, all values in range [0, i] are contained
 * in the current prefix, meaning this boundary can safely end a chunk.
 * 
 * Complexity:
 * - Time: O(N) single pass
 * - Space: O(1) auxiliary space
 * 
 * @param {number[]} arr
 * @return {number}
 */
function maxChunksToSorted(arr) {
    let chunks = 0;
    let maxSeen = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > maxSeen) {
            maxSeen = arr[i];
        }

        // If maximum seen so far equals index i, a chunk can end here
        if (maxSeen === i) {
            chunks++;
        }
    }

    return chunks;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [4,3,2,1,0] -> 1
    console.assert(
        maxChunksToSorted([4, 3, 2, 1, 0]) === 1,
        "Test 1 Failed: expected 1"
    );

    // Test 2: [1,0,2,3,4] -> 4 ([1,0], [2], [3], [4])
    console.assert(
        maxChunksToSorted([1, 0, 2, 3, 4]) === 4,
        "Test 2 Failed: expected 4"
    );

    // Test 3: Already sorted [0, 1, 2, 3] -> 4
    console.assert(
        maxChunksToSorted([0, 1, 2, 3]) === 4,
        "Test 3 Failed: expected 4"
    );

    // Test 4: [2, 0, 1] -> 1
    console.assert(
        maxChunksToSorted([2, 0, 1]) === 1,
        "Test 4 Failed: expected 1"
    );

    // Test 5: Single element [0] -> 1
    console.assert(
        maxChunksToSorted([0]) === 1,
        "Test 5 Failed: expected 1"
    );

    console.log("All Max Chunks To Make Sorted tests passed successfully!");
}

module.exports = { maxChunksToSorted };
