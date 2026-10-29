/**
 * ====================================================================
 * Problem: Array Nesting (LeetCode 565)
 * Difficulty: Medium
 * Topic: Array, Depth-First Search
 * ====================================================================
 * 
 * You are given an integer array nums of length n where nums is a
 * permutation of the numbers in the range [0, n - 1].
 * 
 * You should build a set s[k] = {nums[k], nums[nums[k]], ... } subjected
 * to the following rule:
 * - The first element in s[k] starts with nums[k].
 * - The next element in s[k] should be nums[nums[k]], and so on until
 *   a duplicate element appears in s[k].
 * 
 * Return the longest length of a set s[k].
 * 
 * Example 1:
 * Input: nums = [5,4,0,3,1,6,2]
 * Output: 4
 * Explanation: 
 * nums[0] = 5, nums[1] = 4, nums[2] = 0, nums[3] = 3, nums[4] = 1, nums[5] = 6, nums[6] = 2.
 * One of the longest sets s[k]:
 * s[0] = {nums[0], nums[5], nums[6], nums[2]} = {5, 6, 2, 0} (length 4).
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - 0 <= nums[i] < nums.length
 * - All the values of nums are unique.
 * ====================================================================
 */

/**
 * Finds the maximum cycle length in a permutation graph.
 * Marks visited elements in-place with -1 for O(1) extra space.
 * 
 * Complexity:
 * - Time: O(N) as each element is visited once
 * - Space: O(1) in-place marking
 * 
 * @param {number[]} nums
 * @return {number}
 */
function arrayNesting(nums) {
    let maxLen = 0;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        if (nums[i] !== -1) {
            let start = i;
            let count = 0;

            while (nums[start] !== -1) {
                const nextIdx = nums[start];
                nums[start] = -1; // Mark visited
                start = nextIdx;
                count++;
            }

            if (count > maxLen) {
                maxLen = count;
            }
        }
    }

    return maxLen;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [5,4,0,3,1,6,2] -> 4
    console.assert(
        arrayNesting([5, 4, 0, 3, 1, 6, 2]) === 4,
        "Test 1 Failed: expected 4"
    );

    // Test 2: [0, 1, 2] -> 1 (all self loops)
    console.assert(
        arrayNesting([0, 1, 2]) === 1,
        "Test 2 Failed: expected 1"
    );

    // Test 3: [1, 2, 0] -> 3 (single full cycle 0->1->2->0)
    console.assert(
        arrayNesting([1, 2, 0]) === 3,
        "Test 3 Failed: expected 3"
    );

    // Test 4: Single element [0] -> 1
    console.assert(
        arrayNesting([0]) === 1,
        "Test 4 Failed: expected 1"
    );

    console.log("All Array Nesting tests passed successfully!");
}

module.exports = { arrayNesting };
