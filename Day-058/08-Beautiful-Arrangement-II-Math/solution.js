/**
 * ====================================================================
 * Problem: Beautiful Arrangement II (LeetCode 667)
 * Difficulty: Medium
 * Topic: Array, Math
 * ====================================================================
 * 
 * Given two integers n and k, construct a list answer that contains n
 * different positive integers ranging from 1 to n such that the list
 * [|answer[1] - answer[0]|, |answer[2] - answer[1]|, ... , |answer[n - 1] - answer[n - 2]|]
 * has exactly k distinct integers.
 * 
 * Return the list answer. If there are multiple valid answers, return
 * any of them.
 * 
 * Example 1:
 * Input: n = 3, k = 1
 * Output: [1,2,3]
 * Explanation: The [1,2,3] has three different positive integers ranging
 * from 1 to 3, and the [1,1] has exactly 1 distinct integer: 1.
 * 
 * Example 2:
 * Input: n = 3, k = 2
 * Output: [1,3,2]
 * Explanation: The [1,3,2] has three different positive integers ranging
 * from 1 to 3, and the [2,1] has exactly 2 distinct integers: 1 and 2.
 * 
 * Constraints:
 * - 1 <= k < n <= 10^4
 * ====================================================================
 */

/**
 * Constructs an array with exactly k distinct differences using two pointers
 * alternating over the first k + 1 elements, followed by strictly increasing
 * elements up to n.
 * 
 * Complexity:
 * - Time: O(n) linear single pass construction
 * - Space: O(1) auxiliary space (excluding result array)
 * 
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
function constructArray(n, k) {
    const ans = [];
    let low = 1;
    let high = k + 1;

    // Alternate between low and high to generate k distinct differences: k, k-1, ..., 1
    while (low <= high) {
        ans.push(low++);
        if (low <= high) {
            ans.push(high--);
        }
    }

    // Append the remaining elements monotonically from k + 2 to n (all diffs = 1)
    for (let i = k + 2; i <= n; i++) {
        ans.push(i);
    }

    return ans;
}

// --- Test Suite ---
if (require.main === module) {
    function countDistinctDiffs(arr) {
        const diffs = new Set();
        for (let i = 1; i < arr.length; i++) {
            diffs.add(Math.abs(arr[i] - arr[i - 1]));
        }
        return diffs.size;
    }

    // Test 1: n = 3, k = 1
    const res1 = constructArray(3, 1);
    console.assert(countDistinctDiffs(res1) === 1, "Test 1 Failed: expected 1 distinct diff");

    // Test 2: n = 3, k = 2
    const res2 = constructArray(3, 2);
    console.assert(countDistinctDiffs(res2) === 2, "Test 2 Failed: expected 2 distinct diffs");

    // Test 3: n = 10, k = 4
    const res3 = constructArray(10, 4);
    console.assert(countDistinctDiffs(res3) === 4, "Test 3 Failed: expected 4 distinct diffs");
    console.assert(res3.length === 10, "Test 3 Failed: length must be 10");

    // Test 4: n = 5, k = 4 (maximum possible distinct differences)
    const res4 = constructArray(5, 4);
    console.assert(countDistinctDiffs(res4) === 4, "Test 4 Failed: expected 4 distinct diffs");

    console.log("All Beautiful Arrangement II tests passed successfully!");
}

module.exports = { constructArray };
