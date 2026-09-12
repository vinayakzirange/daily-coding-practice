/*
 * Problem Name: Word Pattern
 * Problem Statement: Given a pattern and a string s, find if s follows the same pattern.
 * Follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.
 * 
 * Approach: Two HashMaps mapping pattern char -> word and word -> pattern char.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function wordPattern(pattern, s) {
  const words = s.split(' ');
  if (pattern.length !== words.length) return false;

  const charToWord = new Map();
  const wordToChar = new Map();

  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i];
    const word = words[i];

    if (charToWord.has(ch) && charToWord.get(ch) !== word) return false;
    if (wordToChar.has(word) && wordToChar.get(word) !== ch) return false;

    charToWord.set(ch, word);
    wordToChar.set(word, ch);
  }

  return true;
}

console.log("Pattern 'abba' for 'dog cat cat dog':", wordPattern("abba", "dog cat cat dog")); // true
console.log("Pattern 'abba' for 'dog cat cat fish':", wordPattern("abba", "dog cat cat fish")); // false
