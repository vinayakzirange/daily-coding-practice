/**
 * Problem: Find All Numbers Disappeared in an Array
 * Topic: Array / In-Place Marking
 * Language: JavaScript
 *
 * Approach:
 * Iterate through array, treat value as index: idx = Math.abs(nums[i]) - 1.
 * Mark nums[idx] as negative. In second pass, any positive nums[i] means (i + 1) was missing.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1) auxiliary (excluding output array)
 */

function findDisappearedNumbers(nums) {
    for (let i = 0; i < nums.length; i++) {
        const idx = Math.abs(nums[i]) - 1;
        if (nums[idx] > 0) {
            nums[idx] = -nums[idx];
        }
    }

    const result = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);
        }
    }
    return result;
}

// Test cases
console.log("[4,3,2,7,8,2,3,1] ->", findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5, 6]
console.log("[1,1] ->", findDisappearedNumbers([1, 1])); // [2]
