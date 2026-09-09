/*
 * Problem Name: Decode String
 * Problem Statement: Given an encoded string s, return its decoded string.
 * The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.
 * 
 * Approach: Stack data structure for counts and strings.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function decodeString(s) {
  const countStack = [];
  const stringStack = [];
  let currentString = "";
  let currentNum = 0;

  for (let char of s) {
    if (!isNaN(char)) {
      currentNum = currentNum * 10 + parseInt(char, 10);
    } else if (char === '[') {
      countStack.push(currentNum);
      stringStack.push(currentString);
      currentNum = 0;
      currentString = "";
    } else if (char === ']') {
      let k = countStack.pop();
      let prevString = stringStack.pop();
      currentString = prevString + currentString.repeat(k);
    } else {
      currentString += char;
    }
  }

  return currentString;
}

console.log("Decoded '3[a]2[bc]':", decodeString("3[a]2[bc]")); // Expected: "aaabcbc"
console.log("Decoded '3[a2[c]]':", decodeString("3[a2[c]]"));   // Expected: "accaccacc"
