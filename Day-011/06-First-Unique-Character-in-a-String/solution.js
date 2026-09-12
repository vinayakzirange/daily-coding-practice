/*
 * Problem Name: First Unique Character in a String
 * Problem Statement: Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
 * 
 * Approach: Frequency Map / Array scan. Count frequencies in first pass, return index of first char with frequency 1 in second pass.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1) (26 English lowercase characters)
 */

function firstUniqChar(s) {
  const count = {};

  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }

  return -1;
}

console.log("First unique char in 'leetcode':", firstUniqChar("leetcode")); // Expected: 0 ('l')
console.log("First unique char in 'loveleetcode':", firstUniqChar("loveleetcode")); // Expected: 2 ('v')
console.log("First unique char in 'aabb':", firstUniqChar("aabb")); // Expected: -1
