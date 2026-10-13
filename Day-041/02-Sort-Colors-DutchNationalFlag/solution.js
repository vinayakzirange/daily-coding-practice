/**
 * Problem: Sort Colors (LeetCode 75)
 * Difficulty: Medium
 * Topic: Array / Two Pointers / Sorting / Dutch National Flag Algorithm
 *
 * Description:
 * Given an array nums with n objects colored red, white, or blue, sort them
 * in-place so that objects of the same color are adjacent, with the colors in
 * the order red, white, and blue.
 *
 * We will use the integers 0, 1, and 2 to represent the color red, white,
 * and blue, respectively.
 *
 * You must solve this problem without using the library's sort function.
 *
 * Example 1:
 * Input: nums = [2,0,2,1,1,0]
 * Output: [0,0,1,1,2,2]
 *
 * Example 2:
 * Input: nums = [2,0,1]
 * Output: [0,1,2]
 *
 * Constraints:
 * - n == nums.length
 * - 1 <= n <= 300
 * - nums[i] is either 0, 1, or 2.
 *
 * Follow-up: Could you come up with a one-pass algorithm using only constant extra space?
 *
 * Complexity Analysis:
 * - Time Complexity: O(n) single-pass with 3-way partitioning.
 * - Space Complexity: O(1) strictly in-place modification.
 */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function sortColors(nums) {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap 0 to the low region
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // 1 is in correct middle region
            mid++;
        } else {
            // Swap 2 to the high region (do not increment mid yet, must evaluate swapped value)
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}

// ==========================================
// Test Cases & Verification
// ==========================================
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testCases = [
    { input: [2, 0, 2, 1, 1, 0], expected: [0, 0, 1, 1, 2, 2] },
    { input: [2, 0, 1], expected: [0, 1, 2] },
    { input: [0], expected: [0] },
    { input: [1], expected: [1] },
    { input: [2], expected: [2] },
    { input: [2, 2, 1, 1, 0, 0], expected: [0, 0, 1, 1, 2, 2] },
    { input: [1, 2, 0], expected: [0, 1, 2] },
    { input: [0, 1, 2, 0, 1, 2], expected: [0, 0, 1, 1, 2, 2] }
];

testCases.forEach((tc, idx) => {
    const arr = [...tc.input];
    sortColors(arr);
    if (!arraysEqual(arr, tc.expected)) {
        console.error(`Test ${idx + 1} Failed: got [${arr}], expected [${tc.expected}]`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: input=[${tc.input}] -> sorted=[${arr}]`);
});

console.log("\nAll Sort Colors tests passed successfully!");
