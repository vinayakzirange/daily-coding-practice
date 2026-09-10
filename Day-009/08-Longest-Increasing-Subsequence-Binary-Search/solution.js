/*
 * Problem Name: Longest Increasing Subsequence (Fast O(N log N) Approach)
 * Problem Statement: Given an integer array nums, return the length of the longest strictly increasing subsequence using O(N log N) algorithm.
 * 
 * Approach: Patience Sorting / Tail Array with Binary Search.
 * Maintain a tails array where tails[i] stores smallest tail of all increasing subsequences of length i + 1.
 * 
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

function lengthOfLISFast(nums) {
  if (!nums || nums.length === 0) return 0;
  const tails = [];

  for (let num of nums) {
    let left = 0, right = tails.length;

    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    tails[left] = num;
  }

  return tails.length;
}

console.log("LIS Fast Length:", lengthOfLISFast([10, 9, 2, 5, 3, 7, 101, 18])); // Expected: 4
