/*
 * Problem Name: Palindromic Substrings
 * Problem Statement: Given a string s, return the number of palindromic substrings in it.
 * 
 * Approach: Expand Around Center. Expand both odd (center i) and even (center i, i+1) length centers.
 * 
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */

function countSubstrings(s) {
  let count = 0;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // Odd length
    expand(i, i + 1); // Even length
  }

  return count;
}

console.log("Palindromic Substrings in 'abc':", countSubstrings("abc")); // Expected: 3 ("a", "b", "c")
console.log("Palindromic Substrings in 'aaa':", countSubstrings("aaa")); // Expected: 6 ("a", "a", "a", "aa", "aa", "aaa")
