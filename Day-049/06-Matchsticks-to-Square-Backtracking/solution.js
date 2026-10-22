/**
 * ====================================================================
 * Problem: Matchsticks to Square (LeetCode 473)
 * Difficulty: Medium
 * Topic: Array, Dynamic Programming, Backtracking, Bit Manipulation, Bitmask
 * ====================================================================
 * 
 * You are given an integer array matchsticks where matchsticks[i] is the length
 * of the ith matchstick. You want to use all the matchsticks to make one square.
 * You should not break any stick, but you can link them up, and each matchstick
 * must be used exactly one time.
 * 
 * Return true if you can make this square and false otherwise.
 * 
 * Example 1:
 * Input: matchsticks = [1,1,2,2,2]
 * Output: true
 * Explanation: You can form a square with length 2, one side of length 2,
 * and three other sides of length 2 each.
 * 
 * Example 2:
 * Input: matchsticks = [3,3,3,3,4]
 * Output: false
 * Explanation: You cannot find a way to form a square with all the matchsticks.
 * 
 * Constraints:
 * - 1 <= matchsticks.length <= 15
 * - 1 <= matchsticks[i] <= 10^8
 * ====================================================================
 */

/**
 * Solves Matchsticks to Square using Backtracking + Descending Sort Pruning.
 * 
 * Time Complexity: O(4^n) with branch pruning
 * Space Complexity: O(n) for recursion stack
 * 
 * @param {number[]} matchsticks
 * @return {boolean}
 */
function makesquare(matchsticks) {
    const total = matchsticks.reduce((a, b) => a + b, 0);
    if (total % 4 !== 0) return false;

    const targetSide = total / 4;
    // Sort descending to test larger sticks first for aggressive pruning
    matchsticks.sort((a, b) => b - a);

    if (matchsticks[0] > targetSide) return false;

    const sides = [0, 0, 0, 0];

    function backtrack(index) {
        if (index === matchsticks.length) {
            return sides[0] === targetSide && sides[1] === targetSide &&
                   sides[2] === targetSide && sides[3] === targetSide;
        }

        const len = matchsticks[index];

        for (let i = 0; i < 4; i++) {
            if (sides[i] + len <= targetSide) {
                sides[i] += len;
                if (backtrack(index + 1)) return true;
                sides[i] -= len;
            }

            // If side length is 0 and placing stick failed, no other empty side will succeed
            if (sides[i] === 0) break;
        }

        return false;
    }

    return backtrack(0);
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [1, 1, 2, 2, 2] -> true
    const t1 = [1, 1, 2, 2, 2];
    console.assert(makesquare(t1) === true, "Test 1 failed");
    console.log(`Test 1 Passed: [1, 1, 2, 2, 2] -> true`);

    // Test 2: [3, 3, 3, 3, 4] -> false
    const t2 = [3, 3, 3, 3, 4];
    console.assert(makesquare(t2) === false, "Test 2 failed");
    console.log(`Test 2 Passed: [3, 3, 3, 3, 4] -> false`);

    // Test 3: Less than 4 sticks
    const t3 = [1, 2, 3];
    console.assert(makesquare(t3) === false, "Test 3 failed");
    console.log(`Test 3 Passed: [1, 2, 3] -> false`);

    // Test 4: Exactly 4 identical sticks
    const t4 = [5, 5, 5, 5];
    console.assert(makesquare(t4) === true, "Test 4 failed");
    console.log(`Test 4 Passed: [5, 5, 5, 5] -> true`);

    // Test 5: Length 15 within constraints
    const t5 = [5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2];
    // sum = 20 + 16 + 12 + 6 = 54 -> 54 % 4 != 0 -> false
    console.assert(makesquare(t5) === false, "Test 5 failed");
    console.log(`Test 5 Passed: sum not divisible by 4 -> false`);

    console.log("\nAll Matchsticks to Square tests passed successfully!");
}

module.exports = { makesquare };
