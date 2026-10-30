/**
 * ====================================================================
 * Problem: Random Pick with Weight (LeetCode 528)
 * Difficulty: Medium
 * Topic: Array, Math, Binary Search, Prefix Sum, Randomized
 * ====================================================================
 * 
 * You are given a 0-indexed array of positive integers w where w[i]
 * describes the weight of the i-th index.
 * 
 * You need to implement the function pickIndex(), which randomly picks
 * an index in the range [0, w.length - 1] (inclusive) and returns it.
 * The probability of picking an index i is w[i] / sum(w).
 * 
 * For example, if w = [1, 3], the probability of picking index 0 is
 * 1 / (1 + 3) = 0.25 (i.e., 25%), and the probability of picking index 1
 * is 3 / (1 + 3) = 0.75 (i.e., 75%).
 * 
 * Example 1:
 * Input:
 * ["Solution","pickIndex"]
 * [[[1]],[]]
 * Output: [null,0]
 * 
 * Example 2:
 * Input:
 * ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
 * [[[1,3]],[],[],[],[],[]]
 * Output: [null,1,1,1,1,0]
 * 
 * Constraints:
 * - 1 <= w.length <= 10^4
 * - 1 <= w[i] <= 10^5
 * - pickIndex will be called at most 10^4 times.
 * ====================================================================
 */

/**
 * Initializes the prefix sum array for weighted random sampling.
 * 
 * Complexity:
 * - Constructor: O(N) time, O(N) space
 * - pickIndex: O(log N) time, O(1) space
 */
class Solution {
    /**
     * @param {number[]} w
     */
    constructor(w) {
        this.prefixSums = [];
        let total = 0;
        for (const weight of w) {
            total += weight;
            this.prefixSums.push(total);
        }
        this.totalSum = total;
    }

    /**
     * Binary search to find the lower bound index whose prefixSum >= target.
     * @return {number}
     */
    pickIndex() {
        // Generate random number in range [1, totalSum]
        const target = Math.random() * this.totalSum;

        let low = 0;
        let high = this.prefixSums.length - 1;

        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (target >= this.prefixSums[mid]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }

        return low;
    }
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: Single weight [1] -> always index 0
    const sol1 = new Solution([1]);
    for (let i = 0; i < 10; i++) {
        console.assert(sol1.pickIndex() === 0, "Test 1 Failed: single element must return 0");
    }

    // Test 2: Two weights [1, 3] -> statistical check
    const sol2 = new Solution([1, 3]);
    const counts = [0, 0];
    const trials = 10000;
    for (let i = 0; i < trials; i++) {
        const idx = sol2.pickIndex();
        counts[idx]++;
    }

    // Index 0 expected ~25% (around 2500), Index 1 expected ~75% (around 7500)
    const ratio0 = counts[0] / trials;
    const ratio1 = counts[1] / trials;
    console.assert(ratio0 > 0.20 && ratio0 < 0.30, `Test 2 Failed: ratio0=${ratio0}`);
    console.assert(ratio1 > 0.70 && ratio1 < 0.80, `Test 2 Failed: ratio1=${ratio1}`);

    // Test 3: Multiple weights [1, 2, 3, 4] -> bounds check
    const sol3 = new Solution([1, 2, 3, 4]);
    for (let i = 0; i < 100; i++) {
        const idx = sol3.pickIndex();
        console.assert(idx >= 0 && idx < 4, `Test 3 Failed: out of bounds index ${idx}`);
    }

    console.log(`Statistical check for [1, 3]: index 0: ${(ratio0 * 100).toFixed(1)}%, index 1: ${(ratio1 * 100).toFixed(1)}%`);
    console.log("All Random Pick with Weight tests passed successfully!");
}

module.exports = { Solution };
