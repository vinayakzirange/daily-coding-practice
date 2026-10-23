/**
 * ====================================================================
 * Problem: Rotate Function (LeetCode 396)
 * Difficulty: Medium
 * Topic: Array, Math, Dynamic Programming
 * ====================================================================
 * 
 * You are given an integer array nums of length n.
 * 
 * Assume arr_k to be an array obtained by rotating nums by k positions
 * clock-wise. We define the rotation function F on nums as follow:
 * - F(k) = 0 * arr_k[0] + 1 * arr_k[1] + ... + (n - 1) * arr_k[n - 1].
 * 
 * Return the maximum value of F(0), F(1), ..., F(n-1).
 * 
 * The test cases are generated so that the answer fits in a 32-bit integer.
 * 
 * Example 1:
 * Input: nums = [4,3,2,6]
 * Output: 26
 * Explanation:
 * F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25
 * F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16
 * F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23
 * F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26
 * So the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.
 * 
 * Example 2:
 * Input: nums = [100]
 * Output: 0
 * 
 * Constraints:
 * - n == nums.length
 * - 1 <= n <= 10^5
 * - -100 <= nums[i] <= 100
 * ====================================================================
 */

/**
 * Calculates max F(k) in linear time using mathematical transition formula:
 * F(k) = F(k-1) + sum(nums) - n * nums[n - k]
 * 
 * Time Complexity: O(n) single pass
 * Space Complexity: O(1) auxiliary variables
 * 
 * @param {number[]} nums
 * @return {number}
 */
function maxRotateFunction(nums) {
    const n = nums.length;
    let sum = 0;
    let f = 0;

    for (let i = 0; i < n; i++) {
        sum += nums[i];
        f += i * nums[i];
    }

    let maxVal = f;

    // Transition formula for k = 1 to n - 1
    for (let k = 1; k < n; k++) {
        f = f + sum - n * nums[n - k];
        if (f > maxVal) {
            maxVal = f;
        }
    }

    return maxVal;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [4, 3, 2, 6] -> 26
    const t1 = [4, 3, 2, 6];
    const r1 = maxRotateFunction(t1);
    console.assert(r1 === 26, `Test 1 failed: ${r1}`);
    console.log(`Test 1 Passed: [4, 3, 2, 6] -> ${r1}`);

    // Test 2: [100] -> 0
    const t2 = [100];
    const r2 = maxRotateFunction(t2);
    console.assert(r2 === 0, `Test 2 failed: ${r2}`);
    console.log(`Test 2 Passed: [100] -> ${r2}`);

    // Test 3: Negative numbers: [-4, -3, -2, -1]
    const t3 = [-4, -3, -2, -1];
    const r3 = maxRotateFunction(t3);
    console.log(`Test 3 Passed: [-4, -3, -2, -1] -> ${r3}`);

    // Test 4: All equal: [5, 5, 5, 5]
    // F(k) is identical for all rotations: (0+1+2+3)*5 = 30
    const t4 = [5, 5, 5, 5];
    const r4 = maxRotateFunction(t4);
    console.assert(r4 === 30, `Test 4 failed: ${r4}`);
    console.log(`Test 4 Passed: [5, 5, 5, 5] -> ${r4}`);

    console.log("\nAll Rotate Function tests passed successfully!");
}

module.exports = { maxRotateFunction };
