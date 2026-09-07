/*
 * Problem Name: Longest Substring with At Most K Distinct Characters
 * Problem Statement: Given a string s and an integer k, return the length of the longest substring of s that contains at most k distinct characters.
 * 
 * Approach: Sliding Window + HashMap to track frequency of characters in current window.
 * Shrink window from left when Map size exceeds k.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */

function lengthOfLongestSubstringKDistinct(s, k) {
  if (k === 0 || !s) return 0;

  const map = new Map();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    map.set(char, (map.get(char) || 0) + 1);

    while (map.size > k) {
      const leftChar = s[left];
      map.set(leftChar, map.get(leftChar) - 1);
      if (map.get(leftChar) === 0) {
        map.delete(leftChar);
      }
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log("Max length with at most 2 distinct chars:", lengthOfLongestSubstringKDistinct("eceba", 2)); // Expected: 3 ("ece")
