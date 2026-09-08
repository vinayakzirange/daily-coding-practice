/*
 * Problem Name: Longest Repeating Character Replacement
 * Problem Statement: You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character.
 * You can perform this operation at most k times. Return the length of the longest substring containing the same letter.
 * 
 * Approach: Sliding Window maintaining frequency map of chars and maxFrequency in current window.
 * Window is valid if (windowLength - maxFrequency <= k).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1) (26 uppercase characters max)
 */

function characterReplacement(s, k) {
  const count = {};
  let left = 0;
  let maxFrequency = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    count[char] = (count[char] || 0) + 1;
    maxFrequency = Math.max(maxFrequency, count[char]);

    while ((right - left + 1) - maxFrequency > k) {
      count[s[left]]--;
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log("Max length for 'ABAB' with k=2:", characterReplacement("ABAB", 2)); // Expected: 4
console.log("Max length for 'AABABBA' with k=1:", characterReplacement("AABABBA", 1)); // Expected: 4
