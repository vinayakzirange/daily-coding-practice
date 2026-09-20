/**
 * Problem: Letter Combinations of a Phone Number
 * Topic: Backtracking / Combination Mapping
 * Language: JavaScript
 *
 * Approach:
 * Map digit numbers 2-9 to their corresponding phone key characters.
 * Recursive backtracking iterates over mapped characters of current digit index,
 * appending letters to path.
 *
 * Time Complexity: O(4^N) where N is number of digits
 * Space Complexity: O(N) recursion stack
 */

function letterCombinations(digits) {
    if (!digits || digits.length === 0) return [];

    const phoneMap = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };

    const result = [];

    function backtrack(idx, currentPath) {
        if (idx === digits.length) {
            result.push(currentPath);
            return;
        }

        const letters = phoneMap[digits[idx]];
        for (let char of letters) {
            backtrack(idx + 1, currentPath + char);
        }
    }

    backtrack(0, '');
    return result;
}

// Test cases
console.log("'23' ->", letterCombinations("23")); // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log("'' ->", letterCombinations("")); // []
