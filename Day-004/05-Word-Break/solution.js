/*
 * Problem Name: Word Break
 * Problem Statement: Given a string s and a dictionary of strings wordDict, return true if s can be segmented 
 * into a space-separated sequence of one or more dictionary words.
 * 
 * Approach: 1D Dynamic Programming. dp[i] is true if s[0...i-1] can be segmented into dictionary words.
 * 
 * Time Complexity: O(N^2 * K) where N is length of s and K is max length of word in wordDict
 * Space Complexity: O(N)
 */

function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}

console.log("Can break 'leetcode':", wordBreak("leetcode", ["leet", "code"])); // Expected: true
console.log("Can break 'catsandog':", wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // Expected: false
