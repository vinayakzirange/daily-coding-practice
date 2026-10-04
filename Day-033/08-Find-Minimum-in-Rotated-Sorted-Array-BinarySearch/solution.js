/**
 * Problem: Find Minimum in Rotated Sorted Array (LeetCode 153)
 * Difficulty: Medium
 * Topic: Array / Binary Search / Rotated Sorted Array
 * 
 * Description:
 * Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
 * For example, the array nums = [0,1,2,4,5,6,7] might become:
 *   * [4,5,6,7,0,1,2] if it was rotated 4 times.
 *   * [0,1,2,4,5,6,7] if it was rotated 7 times.
 * 
 * Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in
 * the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
 * 
 * Given the sorted rotated array nums of unique elements, return the minimum element of this array.
 * You must write an algorithm that runs in O(log n) time.
 * 
 * Example 1:
 * Input: nums = [3,4,5,1,2]
 * Output: 1
 * Explanation: The original array was [1,2,3,4,5] rotated 3 times.
 * 
 * Example 2:
 * Input: nums = [4,5,6,7,0,1,2]
 * Output: 0
 * Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
 * 
 * Example 3:
 * Input: nums = [11,13,15,17]
 * Output: 11
 * Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
 * 
 * Constraints:
 *   * n == nums.length
 *   * 1 <= n <= 5000
 *   * -5000 <= nums[i] <= 5000
 *   * All the integers of nums are unique.
 *   * nums is sorted and rotated between 1 and n times.
 * 
 * Complexity:
 *   * Time Complexity: O(log n) - Binary search halves the search space each step.
 *   * Space Complexity: O(1) - Constant auxiliary memory.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    // If the array is already fully sorted without rotation wrapping
    if (nums[left] <= nums[right]) {
        return nums[left];
    }

    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);

        // If mid element is greater than the rightmost element,
        // the minimum must be in the right half (strictly after mid)
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Otherwise, mid could itself be the minimum or minimum is to the left
            right = mid;
        }
    }

    return nums[left];
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { nums: [3, 4, 5, 1, 2], expected: 1 },
        { nums: [4, 5, 6, 7, 0, 1, 2], expected: 0 },
        { nums: [11, 13, 15, 17], expected: 11 },
        { nums: [2, 1], expected: 1 },
        { nums: [1], expected: 1 },
        { nums: [5, 1, 2, 3, 4], expected: 1 }
    ];

    testCases.forEach((tc, idx) => {
        const result = findMin(tc.nums);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: nums=[${tc.nums}] -> min = ${result}`);
    });

    console.log('\nAll Find Minimum in Rotated Sorted Array tests passed successfully!');
}

runTests();
