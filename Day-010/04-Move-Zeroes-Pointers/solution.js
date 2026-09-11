/*
 * Problem Name: Move Zeroes
 * Problem Statement: Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * Note that you must do this in-place without making a copy of the array.
 * 
 * Approach: Two Pointers (lastNonZeroFoundAt index pointer).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function moveZeroes(nums) {
  let lastNonZeroFoundAt = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      let temp = nums[lastNonZeroFoundAt];
      nums[lastNonZeroFoundAt] = nums[i];
      nums[i] = temp;
      lastNonZeroFoundAt++;
    }
  }
}

let arr = [0, 1, 0, 3, 12];
moveZeroes(arr);
console.log("Moved Zeroes:", arr); // Expected: [1, 3, 12, 0, 0]
