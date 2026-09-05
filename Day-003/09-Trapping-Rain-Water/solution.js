/*
 * Problem Name: Trapping Rain Water
 * Problem Statement: Given n non-negative integers representing an elevation map where the width of each bar is 1,
 * compute how much water it can trap after raining.
 * 
 * Approach: Two Pointers (left & right). Maintain leftMax and rightMax boundaries.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}

console.log("Trapped Water:", trap([0,1,0,2,1,0,1,3,2,1,2,1])); // Expected: 6
