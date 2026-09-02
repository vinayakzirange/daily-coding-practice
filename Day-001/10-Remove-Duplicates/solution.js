/*
 * Problem: Remove Duplicates
 * Approach: Two pointers (slow and fast)
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function removeDuplicates(nums) {
  if(nums.length === 0) return 0;
  let i = 0;
  for(let j = 1; j < nums.length; j++) {
    if(nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}
let arr = [1,1,2];
let len = removeDuplicates(arr);
console.log(arr.slice(0, len)); // [1, 2]
