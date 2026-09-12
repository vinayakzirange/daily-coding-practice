/*
 * Problem Name: Reverse Vowels of a String
 * Problem Statement: Given a string s, reverse only all the vowels in the string and return it.
 * Vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases.
 * 
 * Approach: Two Pointers starting at extremities (0 and s.length - 1).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N) string array conversion
 */

function reverseVowels(s) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  const chars = s.split('');
  let left = 0, right = chars.length - 1;

  while (left < right) {
    while (left < right && !vowels.has(chars[left])) left++;
    while (left < right && !vowels.has(chars[right])) right--;

    if (left < right) {
      let temp = chars[left];
      chars[left] = chars[right];
      chars[right] = temp;
      left++;
      right--;
    }
  }

  return chars.join('');
}

console.log("Reversed Vowels of 'hello':", reverseVowels("hello")); // Expected: "holle"
console.log("Reversed Vowels of 'leetcode':", reverseVowels("leetcode")); // Expected: "leotcede"
