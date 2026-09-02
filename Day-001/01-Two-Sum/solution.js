/*
 * Problem: Two Sum
 * Approach: Hash Map to store complement and index
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
