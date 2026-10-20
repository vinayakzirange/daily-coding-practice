/**
 * ====================================================================
 * Problem: 4Sum II (LeetCode 454)
 * Difficulty: Medium
 * Topic: Array, Hash Table
 * ====================================================================
 * 
 * Given four integer arrays nums1, nums2, nums3, and nums4 all of length n,
 * return the number of tuples (i, j, k, l) such that:
 * - 0 <= i, j, k, l < n
 * - nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
 * 
 * Example 1:
 * Input: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
 * Output: 2
 * Explanation:
 * The two tuples are:
 * 1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
 * 2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
 * 
 * Example 2:
 * Input: nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
 * Output: 1
 * 
 * Constraints:
 * - n == nums1.length
 * - n == nums2.length
 * - n == nums3.length
 * - n == nums4.length
 * - 1 <= n <= 200
 * - -2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28
 * ====================================================================
 */

/**
 * Counts tuples summing to 0 by dividing 4 arrays into 2 pairs:
 * Store all pairwise sums of nums1 and nums2 in a hash map.
 * Then check complementary sums -(c + d) from nums3 and nums4.
 * 
 * Time Complexity: O(n^2) where n = nums1.length
 * Space Complexity: O(n^2) for the hash map storing pairwise sums
 * 
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
function fourSumCount(nums1, nums2, nums3, nums4) {
    const sumMap = new Map();

    for (let a of nums1) {
        for (let b of nums2) {
            const sum = a + b;
            sumMap.set(sum, (sumMap.get(sum) || 0) + 1);
        }
    }

    let count = 0;
    for (let c of nums3) {
        for (let d of nums4) {
            const target = -(c + d);
            const freq = sumMap.get(target);
            if (freq !== undefined) {
                count += freq;
            }
        }
    }

    return count;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: Standard 2x2x2x2
    const n1 = [1, 2], n2 = [-2, -1], n3 = [-1, 2], n4 = [0, 2];
    const r1 = fourSumCount(n1, n2, n3, n4);
    console.assert(r1 === 2, `Test 1 failed: ${r1}`);
    console.log(`Test 1 Passed: result = ${r1}`);

    // Test 2: All zeros
    const r2 = fourSumCount([0], [0], [0], [0]);
    console.assert(r2 === 1, `Test 2 failed: ${r2}`);
    console.log(`Test 2 Passed: result = ${r2}`);

    // Test 3: No valid tuples
    const r3 = fourSumCount([1], [1], [1], [1]);
    console.assert(r3 === 0, `Test 3 failed: ${r3}`);
    console.log(`Test 3 Passed: result = ${r3}`);

    // Test 4: Larger arrays with negatives
    const r4 = fourSumCount([-1, -1], [-1, 1], [-1, 1], [1, -1]);
    console.assert(r4 === 6, `Test 4 failed: ${r4}`);
    console.log(`Test 4 Passed: result = ${r4}`);

    console.log("\nAll 4Sum II tests passed successfully!");
}

module.exports = { fourSumCount };
