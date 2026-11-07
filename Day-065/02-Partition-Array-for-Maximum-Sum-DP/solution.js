/**
 * LeetCode 1043: Partition Array for Maximum Sum (Medium)
 * https://leetcode.com/problems/partition-array-for-maximum-sum/
 *
 * Given an integer array arr, partition the array into (contiguous) subarrays
 * of length at most k. After partitioning, each subarray has their values changed
 * to become the maximum value of that subarray.
 *
 * Return the largest sum of the given array after partitioning.
 *
 * Example 1:
 * Input: arr = [1,15,7,9,2,5,10], k = 3
 * Output: 84
 * Explanation: arr becomes [15,15,15,9,10,10,10]
 *
 * Example 2:
 * Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
 * Output: 83
 *
 * Example 3:
 * Input: arr = [1], k = 1
 * Output: 1
 *
 * Constraints:
 * - 1 <= arr.length <= 500
 * - 0 <= arr[i] <= 10^9
 * - 1 <= k <= arr.length
 *
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
function maxSumAfterPartitioning(arr, k) {
    const n = arr.length;
    // dp[i] represents the maximum sum achievable for the prefix arr[0..i-1]
    const dp = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        let curMax = 0;
        // The last partition can have length j between 1 and min(k, i)
        for (let j = 1; j <= Math.min(k, i); j++) {
            curMax = Math.max(curMax, arr[i - j]);
            dp[i] = Math.max(dp[i], dp[i - j] + curMax * j);
        }
    }

    return dp[n];
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    console.assert(maxSumAfterPartitioning([1, 15, 7, 9, 2, 5, 10], 3) === 84, "Test 1 Failed");

    // Test 2: Example 2
    console.assert(maxSumAfterPartitioning([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4) === 83, "Test 2 Failed");

    // Test 3: Example 3 (single element)
    console.assert(maxSumAfterPartitioning([1], 1) === 1, "Test 3 Failed");

    // Test 4: k = 1 (no changes to array)
    console.assert(maxSumAfterPartitioning([2, 5, 3], 1) === 10, "Test 4 Failed");

    // Test 5: k >= arr.length (entire array can be replaced with max element)
    console.assert(maxSumAfterPartitioning([1, 2, 3, 4], 4) === 16, "Test 5 Failed");

    console.log("All Partition Array for Maximum Sum tests passed successfully!");
}

runTests();
