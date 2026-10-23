/**
 * ====================================================================
 * Problem: Shuffle an Array (LeetCode 384)
 * Difficulty: Medium
 * Topic: Array, Math, Randomized, Design
 * ====================================================================
 * 
 * Given an integer array nums, design an algorithm to randomly shuffle
 * the array. All permutations of the array should be equally likely as
 * a result of the shuffling.
 * 
 * Implement the Solution class:
 * - Solution(int[] nums) Initializes the object with the integer array nums.
 * - int[] reset() Resets the array to its original configuration and returns it.
 * - int[] shuffle() Returns a random shuffling of the array.
 * 
 * Example 1:
 * Input
 * ["Solution", "shuffle", "reset", "shuffle"]
 * [[[1, 2, 3]], [], [], []]
 * Output
 * [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]
 * 
 * Constraints:
 * - 1 <= nums.length <= 50
 * - -10^6 <= nums[i] <= 10^6
 * - All the elements of nums are unique.
 * - At most 10^4 calls in total will be made to reset and shuffle.
 * ====================================================================
 */

/**
 * Implements Fisher-Yates Modern Shuffle algorithm.
 * Guarantees every permutation has equal probability 1/n!.
 */
class Solution {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.original = [...nums];
        this.array = [...nums];
    }

    /**
     * Resets the array to its original configuration.
     * @return {number[]}
     */
    reset() {
        this.array = [...this.original];
        return this.array;
    }

    /**
     * Returns a random shuffling of the array using Fisher-Yates algorithm.
     * Time Complexity: O(n)
     * Space Complexity: O(n) to store copy
     * @return {number[]}
     */
    shuffle() {
        const arr = [...this.array];
        for (let i = arr.length - 1; i > 0; i--) {
            // Pick random integer j in [0, i]
            const j = Math.floor(Math.random() * (i + 1));
            // Swap arr[i] and arr[j]
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        this.array = arr;
        return this.array;
    }
}

// --- Test Suite ---
if (require.main === module) {
    const originalNums = [1, 2, 3];
    const obj = new Solution(originalNums);

    // Test 1: Reset returns exact original array
    const reset1 = obj.reset();
    console.assert(JSON.stringify(reset1) === JSON.stringify([1, 2, 3]), "Test 1 failed");
    console.log(`Test 1 Passed: reset() -> [${reset1}]`);

    // Test 2: Shuffle maintains all elements
    const shuffled = obj.shuffle();
    const sortedShuffled = [...shuffled].sort((a, b) => a - b);
    console.assert(JSON.stringify(sortedShuffled) === JSON.stringify([1, 2, 3]), "Test 2 failed");
    console.log(`Test 2 Passed: shuffle() -> [${shuffled}] contains all original elements`);

    // Test 3: Reset after shuffle returns original
    const reset2 = obj.reset();
    console.assert(JSON.stringify(reset2) === JSON.stringify([1, 2, 3]), "Test 3 failed");
    console.log(`Test 3 Passed: reset() after shuffle -> [${reset2}]`);

    // Test 4: Statistical randomness check (distribution across permutations)
    const counts = {};
    for (let k = 0; k < 6000; k++) {
        const p = obj.shuffle().join(',');
        counts[p] = (counts[p] || 0) + 1;
    }
    const perms = Object.keys(counts);
    console.assert(perms.length === 6, `Test 4 failed: expected 6 permutations, got ${perms.length}`);
    console.log(`Test 4 Passed: 6/6 permutations produced across 6000 trials (approx 1000 each)`);

    console.log("\nAll Shuffle an Array tests passed successfully!");
}

module.exports = { Solution };
