/**
 * Problem: Search in Rotated Sorted Array (LeetCode 33)
 * Difficulty: Medium
 * Topic: Array / Binary Search
 *
 * Description:
 * There is an integer array nums sorted in ascending order (with distinct values).
 * Prior to being passed to your function, nums is possibly rotated at an unknown
 * pivot index k (1 <= k < nums.length).
 *
 * Given the array nums after the possible rotation and an integer target,
 * return the index of target if it is in nums, or -1 if it is not in nums.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * Example 1:
 * Input: nums = [4,5,6,7,0,1,2], target = 0
 * Output: 4
 *
 * Example 2:
 * Input: nums = [4,5,6,7,0,1,2], target = 3
 * Output: -1
 *
 * Example 3:
 * Input: nums = [1], target = 0
 * Output: -1
 *
 * Constraints:
 * - 1 <= nums.length <= 5000
 * - -10^4 <= nums[i] <= 10^4
 * - All values of nums are unique.
 * - nums is an ascending array that is possibly rotated.
 * - -10^4 <= target <= 10^4
 *
 * Complexity Analysis:
 * - Time Complexity: O(log n) dividing the search range in half each step.
 * - Space Complexity: O(1) iterative binary search with constant auxiliary space.
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is normally sorted
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1; // Target lies within sorted left half
            } else {
                left = mid + 1;  // Target lies in right half
            }
        } else {
            // Right half is normally sorted
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;  // Target lies within sorted right half
            } else {
                right = mid - 1; // Target lies in left half
            }
        }
    }

    return -1;
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4 },
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 },
    { nums: [1], target: 0, expected: -1 },
    { nums: [1], target: 1, expected: 0 },
    { nums: [3, 1], target: 1, expected: 1 },
    { nums: [5, 1, 3], target: 5, expected: 0 },
    { nums: [6, 7, 8, 1, 2, 3, 4, 5], target: 8, expected: 2 },
    { nums: [6, 7, 8, 1, 2, 3, 4, 5], target: 2, expected: 4 }
];

testCases.forEach((tc, idx) => {
    const result = search(tc.nums, tc.target);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: target=${tc.target}, got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: target=${tc.target} -> found at index ${result}`);
});

console.log("\nAll Search in Rotated Sorted Array tests passed successfully!");
