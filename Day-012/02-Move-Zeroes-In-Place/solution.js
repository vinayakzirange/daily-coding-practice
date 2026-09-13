/**
 * Problem: Move Zeroes In-Place
 * Topic: Two Pointers / Array
 * Language: JavaScript
 *
 * Approach:
 * Maintain a 'insertPos' pointer for non-zero elements. Iterate through array,
 * placing non-zero values at insertPos and incrementing it. Fill remaining indices with 0.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function moveZeroes(nums) {
    let insertPos = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[insertPos++] = nums[i];
        }
    }
    while (insertPos < nums.length) {
        nums[insertPos++] = 0;
    }
    return nums;
}

// Test cases
console.log("[0, 1, 0, 3, 12] ->", moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log("[0] ->", moveZeroes([0])); // [0]
