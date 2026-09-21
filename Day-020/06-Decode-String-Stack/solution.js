/**
 * Problem: Decode String
 * Topic: Stack / Nested Expression Parsing
 * Language: JavaScript
 *
 * Approach:
 * Use two stacks (or a single stack of tuples): numStack for multipliers k, and strStack for prefix strings.
 * On '[', push current multiplier and string onto stacks. On ']', pop multiplier k and append current string k times.
 *
 * Time Complexity: O(N) where N is output length
 * Space Complexity: O(N)
 */

function decodeString(s) {
    const numStack = [];
    const strStack = [];
    let currentStr = '';
    let currentNum = 0;

    for (let char of s) {
        if (char >= '0' && char <= '9') {
            currentNum = currentNum * 10 + parseInt(char);
        } else if (char === '[') {
            numStack.push(currentNum);
            strStack.push(currentStr);
            currentNum = 0;
            currentStr = '';
        } else if (char === ']') {
            const k = numStack.pop();
            const prevStr = strStack.pop();
            currentStr = prevStr + currentStr.repeat(k);
        } else {
            currentStr += char;
        }
    }
    return currentStr;
}

// Test cases
console.log("'3[a]2[bc]' ->", decodeString("3[a]2[bc]")); // "aaabcbc"
console.log("'3[a2[c]]' ->", decodeString("3[a2[c]]")); // "accaccacc"
