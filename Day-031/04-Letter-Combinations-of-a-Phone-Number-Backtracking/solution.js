// Problem: Letter Combinations of a Phone Number (LeetCode 17)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(3^N * 4^M)
// Space Complexity: O(N) recursion stack

function letterCombinations(digits) {
    if (!digits || digits.length === 0) return [];

    const phoneMap = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };

    const result = [];

    function backtrack(index, path) {
        if (index === digits.length) {
            result.push(path);
            return;
        }

        const letters = phoneMap[digits[index]];
        for (const letter of letters) {
            backtrack(index + 1, path + letter);
        }
    }

    backtrack(0, "");
    return result;
}

// Test cases
console.log("Combinations ('23'):", letterCombinations("23"));
