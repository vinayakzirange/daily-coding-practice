/**
 * ====================================================================
 * Problem: Maximum Length of Pair Chain (LeetCode 646)
 * Difficulty: Medium
 * Topic: Array, Dynamic Programming, Greedy, Sorting
 * ====================================================================
 * 
 * You are given an array of n pairs pairs where pairs[i] = [left_i, right_i]
 * and left_i < right_i.
 * 
 * A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs
 * can be formed in this fashion.
 * 
 * Return the length longest chain which can be formed.
 * 
 * You do not need to use up all the given intervals. You can select
 * pairs in any order.
 * 
 * Example 1:
 * Input: pairs = [[1,2],[2,3],[3,4]]
 * Output: 2
 * Explanation: The longest chain is [1,2] -> [3,4].
 * 
 * Example 2:
 * Input: pairs = [[1,2],[7,8],[4,5]]
 * Output: 3
 * Explanation: The longest chain is [1,2] -> [4,5] -> [7,8].
 * 
 * Constraints:
 * - n == pairs.length
 * - 1 <= n <= 1000
 * - -1000 <= left_i < right_i <= 1000
 * ====================================================================
 */

/**
 * Greedy Interval Scheduling algorithm.
 * Sorts pairs by end time ascending to leave maximal room for subsequent pairs.
 * 
 * Complexity:
 * - Time: O(N log N) dominated by sorting
 * - Space: O(1) auxiliary space beyond sorting
 * 
 * @param {number[][]} pairs
 * @return {number}
 */
function findLongestChain(pairs) {
    // Sort by second element (end of interval) in ascending order
    pairs.sort((a, b) => a[1] - b[1]);

    let chainCount = 0;
    let currentEnd = -Infinity;

    for (const [start, end] of pairs) {
        if (start > currentEnd) {
            chainCount++;
            currentEnd = end;
        }
    }

    return chainCount;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [[1,2],[2,3],[3,4]] -> 2
    console.assert(
        findLongestChain([[1, 2], [2, 3], [3, 4]]) === 2,
        "Test 1 Failed: expected 2"
    );

    // Test 2: [[1,2],[7,8],[4,5]] -> 3
    console.assert(
        findLongestChain([[1, 2], [7, 8], [4, 5]]) === 3,
        "Test 2 Failed: expected 3"
    );

    // Test 3: Single pair -> 1
    console.assert(
        findLongestChain([[1, 2]]) === 1,
        "Test 3 Failed: expected 1"
    );

    // Test 4: Nested intervals [[1, 10], [2, 3], [4, 5]] -> 2 ([2, 3] -> [4, 5])
    console.assert(
        findLongestChain([[1, 10], [2, 3], [4, 5]]) === 2,
        "Test 4 Failed: expected 2"
    );

    // Test 5: Negative numbers [[-6, 9], [1, 6], [8, 10], [-1, 4], [-6, -2], [-8, 6], [-10, -5]]
    const res5 = findLongestChain([[-6, 9], [1, 6], [8, 10], [-1, 4], [-6, -2], [-8, 6], [-10, -5]]);
    console.assert(res5 === 3, `Test 5 Failed: expected 3, got ${res5}`);

    console.log("All Maximum Length of Pair Chain tests passed successfully!");
}

module.exports = { findLongestChain };
