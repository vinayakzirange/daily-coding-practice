/*
 * Problem Name: Letter Combinations of a Phone Number
 * Problem Statement: Given a string containing digits from 2-9 inclusive, return all possible letter combinations 
 * that the number could represent.
 * 
 * Approach: Backtracking / Recursion. Map digits to letters and recursively build combinations.
 * 
 * Time Complexity: O(4^N) where N is length of digits string
 * Space Complexity: O(N) recursion stack
 */

function letterCombinations(digits) {
  if (!digits || digits.length === 0) return [];

  const phoneMap = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
  };

  const result = [];

  function backtrack(index, currentString) {
    if (index === digits.length) {
      result.push(currentString);
      return;
    }

    const letters = phoneMap[digits[index]];
    for (let char of letters) {
      backtrack(index + 1, currentString + char);
    }
  }

  backtrack(0, "");
  return result;
}

console.log("Combinations for '23':", letterCombinations("23"));
// Expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
