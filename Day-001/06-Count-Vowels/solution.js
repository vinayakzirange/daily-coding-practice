/*
 * Problem: Count Vowels
 * Approach: Iteration and Set lookup
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function countVowels(s) {
  let count = 0;
  const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
  for(let char of s) if(vowels.has(char)) count++;
  return count;
}
console.log(countVowels("Hello World")); // 3
