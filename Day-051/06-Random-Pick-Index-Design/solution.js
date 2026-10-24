/**
 * ====================================================================
 * Problem: Random Pick Index (LeetCode 398)
 * Difficulty: Medium
 * Topic: Hash Table, Math, Reservoir Sampling, Randomized
 * ====================================================================
 * 
 * Given an integer array nums with possible duplicates, randomly output
 * the index of a given target number. You can assume that the given target
 * number must exist in the array.
 * 
 * Implement the Solution class:
 * - Solution(int[] nums) Initializes the object with the array nums.
 * - int pick(int target) Picks a random index from nums where nums[index] == target.
 *   If there are multiple valid indices, each index should have an equal
 *   probability of returning.
 * 
 * Example 1:
 * Input
 * ["Solution", "pick", "pick", "pick"]
 * [[[1, 2, 3, 3, 3]], [3], [1], [3]]
 * Output
 * [null, 4, 0, 2]
 * 
 * Constraints:
 * - 1 <= nums.length <= 2 * 10^4
 * - -2^31 <= nums[i] <= 2^31 - 1
 * - target is an integer from nums.
 * - At most 10^4 calls will be made to pick.
 * ====================================================================
 */

/**
 * Maps each value to a list of its indices for O(1) pick time.
 */
class Solution {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.indexMap = new Map();
        for (let i = 0; i < nums.length; i++) {
            const val = nums[i];
            if (!this.indexMap.has(val)) {
                this.indexMap.set(val, []);
            }
            this.indexMap.get(val).push(i);
        }
    }

    /**
     * Returns a random index of target with uniform probability.
     * Time Complexity: O(1)
     * Space Complexity: O(n) to store indices
     * @param {number} target
     * @return {number}
     */
    pick(target) {
        const indices = this.indexMap.get(target);
        const randomIdx = Math.floor(Math.random() * indices.length);
        return indices[randomIdx];
    }
}

// --- Test Suite ---
if (require.main === module) {
    const nums = [1, 2, 3, 3, 3];
    const solver = new Solution(nums);

    // Test 1: Target with single occurrence: 1 -> index 0
    console.assert(solver.pick(1) === 0, "Test 1 failed");
    console.log("Test 1 Passed: pick(1) -> 0");

    // Test 2: Target with single occurrence: 2 -> index 1
    console.assert(solver.pick(2) === 1, "Test 2 failed");
    console.log("Test 2 Passed: pick(2) -> 1");

    // Test 3: Target with multiple occurrences: 3 -> indices 2, 3, or 4
    const validIndices = new Set([2, 3, 4]);
    for (let k = 0; k < 10; k++) {
        const picked = solver.pick(3);
        console.assert(validIndices.has(picked), `Test 3 failed: ${picked}`);
    }
    console.log("Test 3 Passed: pick(3) always returns valid index in [2, 3, 4]");

    // Test 4: Statistical uniformity test
    const counts = { 2: 0, 3: 0, 4: 0 };
    const trials = 3000;
    for (let k = 0; k < trials; k++) {
        counts[solver.pick(3)]++;
    }
    for (let idx of [2, 3, 4]) {
        console.assert(counts[idx] > 800 && counts[idx] < 1200, `Uniformity deviation: ${counts[idx]}`);
    }
    console.log(`Test 4 Passed: 3000 trials evenly distributed (~1000 each): ${JSON.stringify(counts)}`);

    console.log("\nAll Random Pick Index tests passed successfully!");
}

module.exports = { Solution };
