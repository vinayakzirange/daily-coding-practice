/**
 * LeetCode 962: Maximum Width Ramp (Medium)
 * https://leetcode.com/problems/maximum-width-ramp/
 *
 * A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j].
 * The width of such a ramp is j - i.
 *
 * Given an integer array nums, return the maximum width of a ramp in nums.
 * If there is no ramp in nums, return 0.
 *
 * Example 1:
 * Input: nums = [6,0,8,2,1,5]
 * Output: 4
 * Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.
 *
 * Example 2:
 * Input: nums = [9,8,1,0,1,9,4,0,4,1]
 * Output: 7
 * Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.
 *
 * Constraints:
 * - 2 <= nums.length <= 5 * 10^4
 * - 0 <= nums[i] <= 5 * 10^4
 *
 * @param {number[]} nums
 * @return {number}
 */
function maxWidthRamp(nums) {
    const n = nums.length;
    const stack = [];

    // Step 1: Build a strictly decreasing stack of candidate starting indices i.
    // An index with a larger value or larger index than a previous candidate can never be a better start.
    for (let i = 0; i < n; i++) {
        if (stack.length === 0 || nums[i] < nums[stack[stack.length - 1]]) {
            stack.push(i);
        }
    }

    let maxWidth = 0;

    // Step 2: Iterate j backwards from n - 1 down to 0.
    // For each j, pop valid starting indices from stack. Once an index i is matched with j,
    // any smaller j' would yield a strictly smaller width j' - i, so i can be safely discarded.
    for (let j = n - 1; j >= 0; j--) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[j]) {
            const i = stack.pop();
            maxWidth = Math.max(maxWidth, j - i);
        }
    }

    return maxWidth;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    console.assert(maxWidthRamp([6, 0, 8, 2, 1, 5]) === 4, "Test 1 Failed");

    // Test 2: Example 2
    console.assert(maxWidthRamp([9, 8, 1, 0, 1, 9, 4, 0, 4, 1]) === 7, "Test 2 Failed");

    // Test 3: Strictly decreasing -> no ramp possible (width 0)
    console.assert(maxWidthRamp([5, 4, 3, 2, 1]) === 0, "Test 3 Failed");

    // Test 4: Strictly increasing -> max width = n - 1
    console.assert(maxWidthRamp([1, 2, 3, 4, 5]) === 4, "Test 4 Failed");

    // Test 5: All identical elements -> max width = n - 1
    console.assert(maxWidthRamp([3, 3, 3, 3]) === 3, "Test 5 Failed");

    console.log("All Maximum Width Ramp tests passed successfully!");
}

runTests();

