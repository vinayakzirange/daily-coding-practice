/**
 * Problem: 3Sum Closest (LeetCode 16)
 * Difficulty: Medium
 * Topic: Array / Two Pointers / Sorting
 *
 * Description:
 * Given an integer array nums of length n and an integer target, find three
 * integers in nums such that the sum is closest to target.
 *
 * Return the sum of the three integers.
 *
 * You may assume that each input would have exactly one solution.
 *
 * Example 1:
 * Input: nums = [-1,2,1,-4], target = 1
 * Output: 2
 * Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 *
 * Example 2:
 * Input: nums = [0,0,0], target = 1
 * Output: 0
 * Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
 *
 * Constraints:
 * - 3 <= nums.length <= 500
 * - -1000 <= nums[i] <= 1000
 * - -10^4 <= target <= 10^4
 *
 * Complexity Analysis:
 * - Time Complexity: O(n^2) where n is the length of nums.
 * - Space Complexity: O(1) auxiliary space (excluding sorting memory).
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b);
    let closestSum = nums[0] + nums[1] + nums[2];

    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const currentSum = nums[i] + nums[left] + nums[right];

            if (currentSum === target) {
                return currentSum; // Perfect match
            }

            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
            }

            if (currentSum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return closestSum;
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { nums: [-1, 2, 1, -4], target: 1, expected: 2 },
    { nums: [0, 0, 0], target: 1, expected: 0 },
    { nums: [1, 1, 1, 0], target: -100, expected: 2 },
    { nums: [0, 1, 2], target: 3, expected: 3 },
    { nums: [4, 0, 5, -5, 3, 3, 0, -4, -5], target: -2, expected: -2 },
    { nums: [1, 2, 4, 8, 16, 32, 64, 128], target: 82, expected: 82 },
];

testCases.forEach((tc, idx) => {
    const result = threeSumClosest([...tc.nums], tc.target);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: target=${tc.target}, got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: nums=[${tc.nums.slice(0, 5)}...], target=${tc.target} -> closest sum = ${result}`);
});

console.log("\nAll 3Sum Closest tests passed successfully!");
