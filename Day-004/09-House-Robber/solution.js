/*
 * Problem Name: House Robber
 * Problem Statement: You are a professional robber planning to rob houses along a street. 
 * Adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
 * Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
 * 
 * Approach: 1D Dynamic Programming. dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]).
 * Optimized to O(1) space using two variables (prev1, prev2).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function rob(nums) {
  if (!nums || nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (let num of nums) {
    let temp = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = temp;
  }

  return prev1;
}

console.log("Max robbed money from [1,2,3,1]:", rob([1, 2, 3, 1])); // Expected: 4 (1 + 3)
console.log("Max robbed money from [2,7,9,3,1]:", rob([2, 7, 9, 3, 1])); // Expected: 12 (2 + 9 + 1)
