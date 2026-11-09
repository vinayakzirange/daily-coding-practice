/**
 * Problem: Alphabet Board Path (LeetCode 1138)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * On an alphabet board, we start at position (0, 0), corresponding to 'a'.
 * The board layout is:
 *  "abcde"  (row 0)
 *  "fghij"  (row 1)
 *  "klmno"  (row 2)
 *  "pqrst"  (row 3)
 *  "uvwxy"  (row 4)
 *  "z"      (row 5, only column 0 exists!)
 * 
 * You may move 'U', 'D', 'L', 'R', and use '!' to select a character.
 * Return a sequence of instructions to type out target word.
 * 
 * Example 1:
 *  Input: target = "leet"
 *  Output: "DDR!UURRR!!DDD!"
 * 
 * Example 2:
 *  Input: target = "code"
 *  Output: "RR!DDRR!UUL!R!"
 * 
 * Constraints:
 *  1 <= target.length <= 100
 *  target consists only of English lowercase letters.
 */

/**
 * Returns a valid path on the alphabet board to type target word.
 * 
 * @param {string} target
 * @return {string}
 * 
 * Complexity:
 *  Time: O(L) where L is target.length - Each step takes at most 5+5 operations.
 *  Space: O(L) for building the output path.
 */
function alphabetBoardPath(target) {
    let currR = 0;
    let currC = 0;
    let path = [];

    for (let i = 0; i < target.length; i++) {
        const code = target.charCodeAt(i) - 97; // 'a' -> 0
        const targetR = Math.floor(code / 5);
        const targetC = code % 5;

        // CRITICAL: Handling the isolated 'z' at (5, 0):
        // 1. Moving 'U' before any 'R' ensures moving off 'z' stays within the grid.
        // 2. Moving 'L' before any 'D' ensures moving onto 'z' reaches column 0 first.
        // Order: 'U', then 'L', then 'D', then 'R' is guaranteed to never step out of bounds.
        while (currR > targetR) {
            path.push('U');
            currR--;
        }
        while (currC > targetC) {
            path.push('L');
            currC--;
        }
        while (currR < targetR) {
            path.push('D');
            currR++;
        }
        while (currC < targetC) {
            path.push('R');
            currC++;
        }

        path.push('!');
    }

    return path.join('');
}

// ==========================================
// Test Cases & Simulation Validation
// ==========================================
function simulatePath(path) {
    const board = [
        "abcde",
        "fghij",
        "klmno",
        "pqrst",
        "uvwxy",
        "z"
    ];

    let r = 0;
    let c = 0;
    let result = '';

    for (const move of path) {
        if (move === 'U') r--;
        else if (move === 'D') r++;
        else if (move === 'L') c--;
        else if (move === 'R') c++;
        else if (move === '!') {
            result += board[r][c];
            continue;
        }

        // Validate board boundary:
        if (r < 0 || r > 5 || c < 0 || c > 4) {
            throw new Error(`Out of bounds at (${r}, ${c})`);
        }
        if (r === 5 && c !== 0) {
            throw new Error(`Invalid non-existent cell at (${r}, ${c})`);
        }
    }

    return result;
}

function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const path1 = alphabetBoardPath("leet");
    assert.strictEqual(simulatePath(path1), "leet", "Test 1 Failed");

    // Test 2: Example 2
    const path2 = alphabetBoardPath("code");
    assert.strictEqual(simulatePath(path2), "code", "Test 2 Failed");

    // Test 3: Going to 'z' and from 'z' (edge cases)
    const path3 = alphabetBoardPath("zaz");
    assert.strictEqual(simulatePath(path3), "zaz", "Test 3 Failed");

    // Test 4: Moving between 'z' and 'y' (adjacent across boundary)
    const path4 = alphabetBoardPath("zyz");
    assert.strictEqual(simulatePath(path4), "zyz", "Test 4 Failed");

    // Test 5: Single letter 'a' (no move)
    const path5 = alphabetBoardPath("a");
    assert.strictEqual(path5, "!", "Test 5 Failed");

    console.log("All Alphabet Board Path tests passed successfully!");
}

runTests();
