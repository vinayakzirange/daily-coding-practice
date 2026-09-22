/**
 * Problem: Minimum Size Subarray Sum
 * Topic: Sliding Window / Dynamic Two Pointers
 * Language: JavaScript
 *
 * Approach:
 * Expand window [left, right] by adding nums[right] to currentSum.
 * While currentSum >= target, update minLen = min(minLen, right - left + 1) and shrink window from left.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function minSubArrayLen(target, nums) {
    let left = 0;
    let currentSum = 0;
    let minLen = Infinity;

    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        while (currentSum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            currentSum -= nums[left++];
        }
    }
    return minLen === Infinity ? 0 : minLen;
}

// Test cases
console.log("target=7, nums=[2,3,1,2,4,3] ->", minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2 ([4,3])
console.log("target=4, nums=[1,4,4] ->", minSubArrayLen(4, [1, 4, 4])); // 1 ([4])
