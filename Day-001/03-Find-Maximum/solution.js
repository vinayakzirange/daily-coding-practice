/*
 * Problem: Find Maximum
 * Approach: Linear scan
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function findMax(nums) {
  if (nums.length === 0) return null;
  let max = nums[0];
  for(let n of nums) if(n > max) max = n;
  return max;
}
console.log(findMax([3, 1, 4, 1, 5, 9])); // 9
