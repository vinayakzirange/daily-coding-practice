/**
 * Problem: Minimum Size Subarray Sum (LeetCode 209)
 * Difficulty: Medium
 * Topic: Array / Binary Search / Sliding Window / Prefix Sum
 *
 * Description:
 * Given an array of positive integers nums and a positive integer target,
 * return the minimal length of a subarray whose sum is greater than or equal
 * to target. If there is no such subarray, return 0 instead.
 *
 * Example 1:
 * Input: target = 7, nums = [2,3,1,2,4,3]
 * Output: 2
 * Explanation: The subarray [4,3] has the minimal length under the problem constraint.
 *
 * Example 2:
 * Input: target = 4, nums = [1,4,4]
 * Output: 1
 *
 * Example 3:
 * Input: target = 11, nums = [1,1,1,1,1,1,1,1]
 * Output: 0
 *
 * Constraints:
 * - 1 <= target <= 10^9
 * - 1 <= nums.length <= 10^5
 * - 1 <= nums[i] <= 10^4
 *
 * Complexity Analysis:
 * - Time Complexity: O(n) each element is visited at most twice (by left and right pointers).
 * - Space Complexity: O(1) constant auxiliary memory.
 */

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
function minSubArrayLen(target, nums) {
    let minLength = Infinity;
    let windowSum = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        windowSum += nums[right];

        // Shrink window from the left as long as condition holds
        while (windowSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            windowSum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { target: 7, nums: [2, 3, 1, 2, 4, 3], expected: 2 },
    { target: 4, nums: [1, 4, 4], expected: 1 },
    { target: 11, nums: [1, 1, 1, 1, 1, 1, 1, 1], expected: 0 },
    { target: 15, nums: [1, 2, 3, 4, 5], expected: 5 },
    { target: 6, nums: [10, 2, 3], expected: 1 },
    { target: 213, nums: [12, 28, 83, 4, 25, 26, 25, 2, 25, 25, 25, 12], expected: 8 },
];

testCases.forEach((tc, idx) => {
    const result = minSubArrayLen(tc.target, tc.nums);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: target=${tc.target}, got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: target=${tc.target}, nums=[${tc.nums.slice(0, 5)}...] -> min length = ${result}`);
});

console.log("\nAll Minimum Size Subarray Sum tests passed successfully!");
