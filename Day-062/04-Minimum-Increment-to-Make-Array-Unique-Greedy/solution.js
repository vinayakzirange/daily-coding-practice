/**
 * LeetCode 945: Minimum Increment to Make Array Unique (Medium)
 * https://leetcode.com/problems/minimum-increment-to-make-array-unique/
 *
 * You are given an integer array nums. In one move, you can pick an index i
 * where 0 <= i < nums.length and increment nums[i] by 1.
 *
 * Return the minimum number of moves to make every value in nums unique.
 *
 * Example 1:
 * Input: nums = [1,2,2]
 * Output: 1
 * Explanation: After 1 move, the array could be [1, 2, 3].
 *
 * Example 2:
 * Input: nums = [3,2,1,2,1,7]
 * Output: 6
 * Explanation: After 6 moves, the array could be [3, 4, 1, 2, 5, 7].
 * It can be shown with 5 or less moves that it is impossible for the array to have all unique values.
 *
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - 0 <= nums[i] <= 10^5
 *
 * @param {number[]} nums
 * @return {number}
 */
function minIncrementForUnique(nums) {
    if (nums.length <= 1) return 0;

    nums.sort((a, b) => a - b);
    let moves = 0;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] <= nums[i - 1]) {
            const needed = nums[i - 1] + 1;
            moves += needed - nums[i];
            nums[i] = needed;
        }
    }

    return moves;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    console.assert(minIncrementForUnique([1, 2, 2]) === 1, "Test 1 Failed");

    // Test 2: Example 2
    console.assert(minIncrementForUnique([3, 2, 1, 2, 1, 7]) === 6, "Test 2 Failed");

    // Test 3: Already unique
    console.assert(minIncrementForUnique([1, 2, 3, 4, 5]) === 0, "Test 3 Failed");

    // Test 4: All identical elements [2, 2, 2, 2] -> becomes [2, 3, 4, 5]
    // increments: 0 + 1 + 2 + 3 = 6
    console.assert(minIncrementForUnique([2, 2, 2, 2]) === 6, "Test 4 Failed");

    // Test 5: Single element
    console.assert(minIncrementForUnique([10]) === 0, "Test 5 Failed");

    console.log("All Minimum Increment to Make Array Unique tests passed successfully!");
}

runTests();

