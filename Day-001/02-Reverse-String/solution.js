/*
 * Problem: Reverse String
 * Approach: Two pointers (in-place)
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++; right--;
  }
}
let arr = ['h','e','l','l','o'];
reverseString(arr);
console.log(arr); // ['o','l','l','e','h']
