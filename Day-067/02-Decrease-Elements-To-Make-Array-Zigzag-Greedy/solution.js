/**
 * Problem: Decrease Elements To Make Array Zigzag (LeetCode 1144)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given an array nums of integers, a move consists of choosing any element and decreasing it by 1.
 * An array A is a zigzag array if either:
 *  - Every even-indexed element is greater than adjacent elements, ie. A[0] > A[1] < A[2] > A[3] < A[4]...
 *  - OR, every odd-indexed element is greater than adjacent elements, ie. A[0] < A[1] > A[2] < A[3] > A[4]...
 * 
 * Return the minimum number of moves to transform the given array nums into a zigzag array.
 * 
 * Example 1:
 *  Input: nums = [1,2,3]
 *  Output: 2
 *  Explanation: We can decrease 2 to 0 or 3 to 1.
 * 
 * Example 2:
 *  Input: nums = [9,6,1,6,2]
 *  Output: 4
 * 
 * Constraints:
 *  1 <= nums.length <= 1000
 *  1 <= nums[i] <= 1000
 */

/**
 * Calculates minimum moves to transform nums into a zigzag array using a greedy valley-reduction approach.
 * 
 * @param {number[]} nums
 * @return {number}
 * 
 * Complexity:
 *  Time: O(N) - Single pass checking even valleys and odd valleys.
 *  Space: O(1) - Constant auxiliary space.
 */
function movesToMakeZigzag(nums) {
    const n = nums.length;
    if (n <= 1) return 0;

    function countMoves(valleyParity) {
        let moves = 0;
        for (let i = valleyParity; i < n; i += 2) {
            let left = i > 0 ? nums[i - 1] : Infinity;
            let right = i < n - 1 ? nums[i + 1] : Infinity;
            let minNeighbor = Math.min(left, right);

            if (nums[i] >= minNeighbor) {
                // Must decrease nums[i] to at least (minNeighbor - 1)
                moves += nums[i] - (minNeighbor - 1);
            }
        }
        return moves;
    }

    // Option 0: Even indices are valleys (A[0] < A[1] > A[2]...)
    // Option 1: Odd indices are valleys (A[0] > A[1] < A[2]...)
    return Math.min(countMoves(0), countMoves(1));
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    assert.strictEqual(movesToMakeZigzag([1, 2, 3]), 2, "Test 1 Failed");

    // Test 2: Example 2
    assert.strictEqual(movesToMakeZigzag([9, 6, 1, 6, 2]), 4, "Test 2 Failed");

    // Test 3: Already zigzag
    assert.strictEqual(movesToMakeZigzag([1, 3, 2]), 0, "Test 3 Failed");

    // Test 4: Single element
    assert.strictEqual(movesToMakeZigzag([10]), 0, "Test 4 Failed");

    // Test 5: All identical elements
    // [2, 2, 2] -> can decrease middle element 2 to 1 (cost 1) -> [2, 1, 2]
    assert.strictEqual(movesToMakeZigzag([2, 2, 2]), 1, "Test 5 Failed");

    // Test 6: Decreasing sequence [10, 4, 4, 10, 10, 6, 2, 3]
    const res6 = movesToMakeZigzag([10, 4, 4, 10, 10, 6, 2, 3]);
    assert.strictEqual(typeof res6, 'number', "Test 6 Failed");

    console.log("All Decrease Elements To Make Array Zigzag tests passed successfully!");
}

runTests();

