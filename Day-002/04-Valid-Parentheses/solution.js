/*
 * Problem Name: Valid Parentheses
 * Problem Statement: Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 * 
 * Approach: Use a Stack data structure. Push matching closing brackets onto the stack when an open bracket is seen,
 * and pop & compare when a closing bracket is encountered.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };

  for (let char of s) {
    if (map[char]) {
      stack.push(map[char]);
    } else {
      if (stack.pop() !== char) return false;
    }
  }

  return stack.length === 0;
}

console.log(isValid("()[]{}")); // true
console.log(isValid("(]"));     // false
