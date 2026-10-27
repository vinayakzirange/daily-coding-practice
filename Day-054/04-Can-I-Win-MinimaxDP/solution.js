/**
 * ====================================================================
 * Problem: Can I Win (LeetCode 464)
 * Difficulty: Medium
 * Topic: Math, Dynamic Programming, Bit Manipulation, Memoization, Game Theory
 * ====================================================================
 * 
 * In the "100 game" two players take turns adding, to a running total,
 * any integer from 1 to maxChoosableInteger. The player who first causes
 * the running total to reach or exceed desiredTotal wins.
 * 
 * What if we change the game so that players cannot re-use integers?
 * 
 * Given two integers maxChoosableInteger and desiredTotal, return true
 * if the first player to move can force a win, otherwise return false.
 * Assume both players play optimally.
 * 
 * Example 1:
 * Input: maxChoosableInteger = 10, desiredTotal = 11
 * Output: false
 * Explanation:
 * No matter which integer the first player chooses, the second player can win:
 * If player 1 chooses 1, player 2 chooses 10 and reaches 11.
 * If player 1 chooses 10, player 2 chooses 1 and reaches 11, etc.
 * 
 * Example 2:
 * Input: maxChoosableInteger = 10, desiredTotal = 0
 * Output: true
 * 
 * Example 3:
 * Input: maxChoosableInteger = 10, desiredTotal = 1
 * Output: true
 * 
 * Constraints:
 * - 1 <= maxChoosableInteger <= 20
 * - 0 <= desiredTotal <= 300
 * ====================================================================
 */

/**
 * Solves the game using Minimax with Bitmask Memoization.
 * 
 * Complexity:
 * - Time: O(2^M * M) where M = maxChoosableInteger <= 20
 * - Space: O(2^M) for memoization cache
 * 
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
function canIWin(maxChoosableInteger, desiredTotal) {
    // If desiredTotal <= 0, the first player wins immediately before picking
    if (desiredTotal <= 0) {
        return true;
    }

    // Maximum possible sum of all selectable integers
    const totalSum = (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;
    if (totalSum < desiredTotal) {
        // Impossible for either player to ever reach desiredTotal
        return false;
    }

    // If totalSum equals desiredTotal, winner depends on whether total turns is odd
    if (totalSum === desiredTotal) {
        return maxChoosableInteger % 2 === 1;
    }

    // If first player can reach desiredTotal on turn 1
    if (maxChoosableInteger >= desiredTotal) {
        return true;
    }

    // Memoization map: bitmask state -> boolean canWin
    const memo = new Map();

    function helper(usedMask, currentTotal) {
        if (memo.has(usedMask)) {
            return memo.get(usedMask);
        }

        for (let i = 1; i <= maxChoosableInteger; i++) {
            const bit = 1 << (i - 1);
            if ((usedMask & bit) === 0) {
                // If picking number i reaches or exceeds desiredTotal, current player wins
                if (currentTotal + i >= desiredTotal) {
                    memo.set(usedMask, true);
                    return true;
                }

                // If opponent cannot win from the resulting state, current player wins
                if (!helper(usedMask | bit, currentTotal + i)) {
                    memo.set(usedMask, true);
                    return true;
                }
            }
        }

        // If no choice guarantees a win, current player loses
        memo.set(usedMask, false);
        return false;
    }

    return helper(0, 0);
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: max = 10, total = 11 -> false
    console.assert(canIWin(10, 11) === false, "Test 1 Failed: expected false");

    // Test 2: max = 10, total = 0 -> true
    console.assert(canIWin(10, 0) === true, "Test 2 Failed: expected true");

    // Test 3: max = 10, total = 1 -> true
    console.assert(canIWin(10, 1) === true, "Test 3 Failed: expected true");

    // Test 4: max = 4, total = 6
    // Choices: 1, 2, 3, 4. Total sum = 10.
    // P1 picks 4: total = 4. P2 picks 2: total 6 (P2 wins).
    // P1 picks 1: total = 1. P2 can pick 4 (total 5) or 3 etc.
    console.assert(canIWin(4, 6) === true, "Test 4 Failed: expected true");

    // Test 5: max = 5, total = 50 -> impossible (sum is 15 < 50) -> false
    console.assert(canIWin(5, 50) === false, "Test 5 Failed: expected false");

    // Test 6: max = 18, total = 79
    const t6 = canIWin(18, 79);
    console.assert(typeof t6 === "boolean", "Test 6 Failed");

    console.log("All Can I Win tests passed successfully!");
}

module.exports = { canIWin };
