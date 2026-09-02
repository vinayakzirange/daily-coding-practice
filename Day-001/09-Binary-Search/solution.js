/*
 * Problem: Binary Search
 * Approach: Pointers for left and right bounds
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
function binarySearch(nums, target) {
  let l = 0, r = nums.length - 1;
  while(l <= r) {
    let mid = Math.floor((l + r) / 2);
    if(nums[mid] === target) return mid;
    else if(nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}
console.log(binarySearch([-1,0,3,5,9,12], 9)); // 4
