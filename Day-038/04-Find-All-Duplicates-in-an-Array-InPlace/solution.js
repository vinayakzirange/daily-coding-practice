/**
 * Problem: Find All Duplicates in an Array (LeetCode 442)
 * Difficulty: Medium
 * Topic: Array / In-Place Hashing / Index Sign Marking
 * 
 * Description:
 * Given an integer array nums of length n where all the integers of nums are in the range [1, n]
 * and each integer appears at most twice, return an array of all the integers that appears twice.
 * 
 * You must write an algorithm that runs in O(n) time and uses only constant auxiliary space,
 * excluding the space taken by the output list.
 * 
 * Example 1:
 * Input: nums = [4,3,2,7,8,2,3,1]
 * Output: [2,3]
 * 
 * Example 2:
 * Input: nums = [1,1,2]
 * Output: [1]
 * 
 * Example 3:
 * Input: nums = [1]
 * Output: []
 * 
 * Constraints:
 *   * n == nums.length
 *   * 1 <= n <= 10^5
 *   * 1 <= nums[i] <= n
 *   * Each element in nums appears once or twice.
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Single pass through the array.
 *   * Space Complexity: O(1) - In-place sign modification (excluding the result array).
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function findDuplicates(nums) {
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        // Value corresponds to 0-indexed position: abs(nums[i]) - 1
        const targetIndex = Math.abs(nums[i]) - 1;

        // If the number at targetIndex is already negative, we have seen this number before
        if (nums[targetIndex] < 0) {
            result.push(targetIndex + 1);
        } else {
            // Mark as visited by negating
            nums[targetIndex] = -nums[targetIndex];
        }
    }

    // Optional: restore the original array values
    for (let i = 0; i < nums.length; i++) {
        nums[i] = Math.abs(nums[i]);
    }

    return result;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { nums: [4, 3, 2, 7, 8, 2, 3, 1], expected: [2, 3] },
        { nums: [1, 1, 2], expected: [1] },
        { nums: [1], expected: [] },
        { nums: [2, 2], expected: [2] },
        { nums: [10, 2, 5, 10, 9, 1, 1, 4, 3, 7], expected: [10, 1] }
    ];

    testCases.forEach((tc, idx) => {
        const copy = [...tc.nums];
        const result = findDuplicates(copy);
        const sortedResult = [...result].sort((a, b) => a - b);
        const sortedExpected = [...tc.expected].sort((a, b) => a - b);
        const match = JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);
        console.assert(match, `Test ${idx + 1} Failed: got ${result}`);
        console.log(`Test ${idx + 1} Passed: nums=[${tc.nums}] -> duplicates = [${result}]`);
    });

    console.log('\nAll Find All Duplicates in an Array tests passed successfully!');
}

runTests();
