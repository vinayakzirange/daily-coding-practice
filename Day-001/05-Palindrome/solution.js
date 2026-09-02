/*
 * Problem: Valid Palindrome
 * Approach: Two pointers, skip non-alphanumeric
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let l = 0, r = s.length - 1;
  while(l < r) {
    if(s[l++] !== s[r--]) return false;
  }
  return true;
}
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
