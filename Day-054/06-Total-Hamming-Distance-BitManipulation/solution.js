/**
 * ====================================================================
 * Problem: Total Hamming Distance (LeetCode 477)
 * Difficulty: Medium
 * Topic: Array, Math, Bit Manipulation
 * ====================================================================
 * 
 * The Hamming distance between two integers is the number of positions
 * at which the corresponding bits are different.
 * 
 * Given an integer array nums, return the sum of Hamming distances
 * between all the pairs of the integers in nums.
 * 
 * Example 1:
 * Input: nums = [4, 14, 2]
 * Output: 6
 * Explanation: In binary representation, the 4, 14, and 2 are reflected as:
 * 4  = 0100
 * 14 = 1110
 * 2  = 0010
 * Over the pairs:
 * - HammingDistance(4, 14) = 2
 * - HammingDistance(4, 2)  = 2
 * - HammingDistance(14, 2) = 2
 * Total Hamming distance = 2 + 2 + 2 = 6.
 * 
 * Example 2:
 * Input: nums = [4, 14, 4]
 * Output: 4
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 10^9
 * ====================================================================
 */

/**
 * Counts total Hamming distance across all pairs by inspecting each bit position.
 * For each bit column, if k numbers have bit 1 and (n - k) have bit 0,
 * this bit contributes k * (n - k) to the total sum.
 * 
 * Complexity:
 * - Time: O(31 * n) = O(n)
 * - Space: O(1)
 * 
 * @param {number[]} nums
 * @return {number}
 */
function totalHammingDistance(nums) {
    let total = 0;
    const n = nums.length;

    // Up to 30 bits for values <= 10^9 (< 2^30)
    for (let bit = 0; bit < 31; bit++) {
        let countOnes = 0;
        const mask = 1 << bit;

        for (let i = 0; i < n; i++) {
            if ((nums[i] & mask) !== 0) {
                countOnes++;
            }
        }

        const countZeros = n - countOnes;
        total += countOnes * countZeros;
    }

    return total;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [4, 14, 2] -> 6
    console.assert(
        totalHammingDistance([4, 14, 2]) === 6,
        `Test 1 Failed: expected 6, got ${totalHammingDistance([4, 14, 2])}`
    );

    // Test 2: [4, 14, 4] -> 4
    console.assert(
        totalHammingDistance([4, 14, 4]) === 4,
        `Test 2 Failed: expected 4, got ${totalHammingDistance([4, 14, 4])}`
    );

    // Test 3: Single element -> 0
    console.assert(
        totalHammingDistance([5]) === 0,
        "Test 3 Failed: single element should be 0"
    );

    // Test 4: All identical elements -> 0
    console.assert(
        totalHammingDistance([7, 7, 7, 7]) === 0,
        "Test 4 Failed: identical elements should have distance 0"
    );

    // Test 5: Complementary elements [0, 1] -> 1
    console.assert(
        totalHammingDistance([0, 1]) === 1,
        "Test 5 Failed: [0, 1] should have distance 1"
    );

    console.log("All Total Hamming Distance tests passed successfully!");
}

module.exports = { totalHammingDistance };
