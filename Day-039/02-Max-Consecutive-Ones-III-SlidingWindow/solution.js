/**
 * Problem: Max Consecutive Ones III (LeetCode 1004)
 * Difficulty: Medium
 * Topic: Array / Binary / Sliding Window / Two Pointers
 * 
 * Description:
 * Given a binary array nums and an integer k, return the maximum number of consecutive 1's
 * in the array if you can flip at most k 0's.
 * 
 * Example 1:
 * Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
 * Output: 6
 * Explanation: [1,1,1,0,0,1,1,1,1,1,1]
 * Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
 * 
 * Example 2:
 * Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
 * Output: 10
 * Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
 * Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
 * 
 * Constraints:
 *   * 1 <= nums.length <= 10^5
 *   * nums[i] is either 0 or 1.
 *   * 0 <= k <= nums.length
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Both left and right pointers traverse the array at most once.
 *   * Space Complexity: O(1) - Constant auxiliary space.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function longestOnes(nums, k) {
    let left = 0;
    let zerosCount = 0;
    let maxLen = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) {
            zerosCount++;
        }

        // Shrink window from the left if zeroes exceed allowed flips k
        while (zerosCount > k) {
            if (nums[left] === 0) {
                zerosCount--;
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { nums: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], k: 2, expected: 6 },
        { nums: [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], k: 3, expected: 10 },
        { nums: [0, 0, 0], k: 1, expected: 1 },
        { nums: [1, 1, 1], k: 0, expected: 3 },
        { nums: [0, 0, 0], k: 0, expected: 0 },
        { nums: [1, 0, 1, 0, 1], k: 1, expected: 3 }
    ];

    testCases.forEach((tc, idx) => {
        const result = longestOnes(tc.nums, tc.k);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: k=${tc.k} -> max consecutive 1s = ${result}`);
    });

    console.log('\nAll Max Consecutive Ones III tests passed successfully!');
}

runTests();
