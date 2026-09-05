/*
 * Problem Name: Container With Most Water
 * Problem Statement: You are given an integer array height of length n. Find two lines that together with the x-axis 
 * form a container, such that the container contains the most water. Return the maximum amount of water a container can store.
 * 
 * Approach: Two Pointers starting at extremities (0 and n - 1). Always move the pointer with the smaller height.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    let width = right - left;
    let currentHeight = Math.min(height[left], height[right]);
    let currentWater = width * currentHeight;
    maxWater = Math.max(maxWater, currentWater);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

console.log("Max Water Container:", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Expected: 49
