/**
 * ====================================================================
 * Problem: Non-decreasing Subsequences (LeetCode 491)
 * Difficulty: Medium
 * Topic: Array, Hash Table, Backtracking, Bit Manipulation
 * ====================================================================
 * 
 * Given an integer array nums, return all the different possible
 * non-decreasing subsequences of the given array with at least two
 * elements. You may return the answer in any order.
 * 
 * Example 1:
 * Input: nums = [4,6,7,7]
 * Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
 * 
 * Example 2:
 * Input: nums = [4,4,3,2,1]
 * Output: [[4,4]]
 * 
 * Constraints:
 * - 1 <= nums.length <= 15
 * - -100 <= nums[i] <= 100
 * ====================================================================
 */

/**
 * Backtracking with local Set deduplication at each decision level.
 * 
 * Complexity:
 * - Time: O(2^n * n) where n <= 15
 * - Space: O(n) recursion depth
 * 
 * @param {number[]} nums
 * @return {number[][]}
 */
function findSubsequences(nums) {
    const result = [];

    function backtrack(startIndex, currentPath) {
        if (currentPath.length >= 2) {
            result.push([...currentPath]);
        }

        // Set to record numbers already chosen at this tree level to avoid duplicates
        const usedAtThisLevel = new Set();

        for (let i = startIndex; i < nums.length; i++) {
            const val = nums[i];

            // Must be non-decreasing
            if (currentPath.length > 0 && val < currentPath[currentPath.length - 1]) {
                continue;
            }

            // Deduplicate siblings
            if (usedAtThisLevel.has(val)) {
                continue;
            }

            usedAtThisLevel.add(val);
            currentPath.push(val);
            backtrack(i + 1, currentPath);
            currentPath.pop();
        }
    }

    backtrack(0, []);
    return result;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [4,6,7,7]
    const res1 = findSubsequences([4, 6, 7, 7]);
    console.assert(res1.length === 8, `Test 1 Failed: expected 8 subsets, got ${res1.length}`);

    // Test 2: [4,4,3,2,1] -> [[4,4]]
    const res2 = findSubsequences([4, 4, 3, 2, 1]);
    console.assert(
        res2.length === 1 && JSON.stringify(res2[0]) === JSON.stringify([4, 4]),
        "Test 2 Failed"
    );

    // Test 3: Strictly decreasing [5, 4, 3, 2, 1] -> []
    const res3 = findSubsequences([5, 4, 3, 2, 1]);
    console.assert(res3.length === 0, "Test 3 Failed: expected empty array");

    // Test 4: All equal [2, 2, 2] -> [[2, 2], [2, 2, 2]]
    const res4 = findSubsequences([2, 2, 2]);
    console.assert(res4.length === 2, `Test 4 Failed: expected 2 subsets, got ${res4.length}`);

    console.log("All Non-decreasing Subsequences tests passed successfully!");
}

module.exports = { findSubsequences };
