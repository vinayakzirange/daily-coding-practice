/*
 * Problem: Second Largest Element
 * Approach: Keep track of largest and second largest
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function secondLargest(nums) {
  let first = -Infinity, second = -Infinity;
  for(let n of nums) {
    if(n > first) { second = first; first = n; }
    else if(n > second && n < first) { second = n; }
  }
  return second === -Infinity ? null : second;
}
console.log(secondLargest([10, 5, 10])); // 5
