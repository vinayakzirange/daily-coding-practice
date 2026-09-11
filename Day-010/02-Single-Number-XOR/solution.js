/*
 * Problem Name: Single Number
 * Problem Statement: Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
 * You must implement a solution with a linear runtime complexity O(n) and use only constant extra space O(1).
 * 
 * Approach: Bitwise XOR operation. n ^ n = 0 and n ^ 0 = n.
 * XORing all elements together cancels out all duplicate numbers leaving the single number.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
}

console.log("Single Number in [2, 2, 1]:", singleNumber([2, 2, 1])); // Expected: 1
console.log("Single Number in [4, 1, 2, 1, 2]:", singleNumber([4, 1, 2, 1, 2])); // Expected: 4
