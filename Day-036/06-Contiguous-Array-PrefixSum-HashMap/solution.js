/**
 * Problem: Contiguous Array (LeetCode 525)
 * Difficulty: Medium
 * Topic: Array / Prefix Sum / Hash Table
 * 
 * Description:
 * Given a binary array nums, return the maximum length of a contiguous subarray
 * with an equal number of 0 and 1.
 * 
 * Example 1:
 * Input: nums = [0,1]
 * Output: 2
 * Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
 * 
 * Example 2:
 * Input: nums = [0,1,0]
 * Output: 2
 * Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
 * 
 * Constraints:
 *   * 1 <= nums.length <= 10^5
 *   * nums[i] is either 0 or 1.
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Single pass through nums.
 *   * Space Complexity: O(n) - Hash map storing earliest occurrence of each prefix sum.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
function findMaxLength(nums) {
    // Treat 0 as -1 and 1 as +1.
    // If prefixSum[j] == prefixSum[i], then subarray nums[i+1...j] has equal 0s and 1s.
    const map = new Map();
    map.set(0, -1); // Base case: prefix sum 0 at virtual index -1

    let prefixSum = 0;
    let maxLen = 0;

    for (let i = 0; i < nums.length; i++) {
        prefixSum += (nums[i] === 1 ? 1 : -1);

        if (map.has(prefixSum)) {
            maxLen = Math.max(maxLen, i - map.get(prefixSum));
        } else {
            // Only store first occurrence to maximize the window length
            map.set(prefixSum, i);
        }
    }

    return maxLen;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { nums: [0, 1], expected: 2 },
        { nums: [0, 1, 0], expected: 2 },
        { nums: [0, 0, 0, 1, 1, 1], expected: 6 },
        { nums: [0, 0, 1, 0, 0, 0, 1, 1], expected: 6 },
        { nums: [0], expected: 0 },
        { nums: [1, 1, 1], expected: 0 }
    ];

    testCases.forEach((tc, idx) => {
        const result = findMaxLength(tc.nums);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: nums=[${tc.nums}] -> max length = ${result}`);
    });

    console.log('\nAll Contiguous Array tests passed successfully!');
}

runTests();
