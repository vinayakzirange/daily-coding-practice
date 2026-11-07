/**
 * LeetCode 1079: Letter Tile Possibilities (Medium)
 * https://leetcode.com/problems/letter-tile-possibilities/
 *
 * You have n tiles, where each tile has one letter tiles[i] printed on it.
 *
 * Return the number of possible non-empty sequences of letters you can make using
 * the letters printed on those tiles.
 *
 * Example 1:
 * Input: tiles = "AAB"
 * Output: 8
 * Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".
 *
 * Example 2:
 * Input: tiles = "AAABBC"
 * Output: 188
 *
 * Example 3:
 * Input: tiles = "V"
 * Output: 1
 *
 * Constraints:
 * - 1 <= tiles.length <= 7
 * - tiles consists of uppercase English letters.
 *
 * @param {string} tiles
 * @return {number}
 */
function numTilePossibilities(tiles) {
    const count = new Array(26).fill(0);
    for (let i = 0; i < tiles.length; i++) {
        count[tiles.charCodeAt(i) - 65]++;
    }

    // Backtracking DFS counting all unique sequence prefixes
    function dfs() {
        let total = 0;

        for (let i = 0; i < 26; i++) {
            if (count[i] > 0) {
                // Choose this character as the next character in the sequence
                count[i]--;
                total += 1 + dfs(); // 1 for the current sequence itself + all further extensions
                count[i]++; // Backtrack
            }
        }

        return total;
    }

    return dfs();
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    console.assert(numTilePossibilities("AAB") === 8, "Test 1 Failed");

    // Test 2: Example 2
    console.assert(numTilePossibilities("AAABBC") === 188, "Test 2 Failed");

    // Test 3: Example 3 (single character)
    console.assert(numTilePossibilities("V") === 1, "Test 3 Failed");

    // Test 4: All distinct characters "ABC" -> 3 + 3*2 + 3*2*1 = 3 + 6 + 6 = 15
    console.assert(numTilePossibilities("ABC") === 15, "Test 4 Failed");

    // Test 5: All identical characters "AAA" -> 3 ("A", "AA", "AAA")
    console.assert(numTilePossibilities("AAA") === 3, "Test 5 Failed");

    console.log("All Letter Tile Possibilities tests passed successfully!");
}

runTests();
