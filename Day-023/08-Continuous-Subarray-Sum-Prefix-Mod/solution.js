/**
 * Problem: Continuous Subarray Sum
 * Topic: Prefix Sum / Modulo Arithmetic / HashMap
 * Language: JavaScript
 *
 * Approach:
 * Store remainder = runningSum % k in a Map with value = index.
 * If remainder seen before at index prevIdx, and (currentIdx - prevIdx >= 2), return true!
 * Initialize map with remainder 0 at index -1.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(min(N, K))
 */

function checkSubarraySum(nums, k) {
    const map = new Map();
    map.set(0, -1);
    let runningSum = 0;

    for (let i = 0; i < nums.length; i++) {
        runningSum += nums[i];
        let remainder = runningSum % k;
        if (remainder < 0) remainder += k;

        if (map.has(remainder)) {
            if (i - map.get(remainder) >= 2) {
                return true;
            }
        } else {
            map.set(remainder, i);
        }
    }
    return false;
}

// Test cases
console.log("[23, 2, 4, 6, 7], k=6 ->", checkSubarraySum([23, 2, 4, 6, 7], 6)); // true ([2, 4] sum 6)
console.log("[23, 2, 6, 4, 7], k=6 ->", checkSubarraySum([23, 2, 6, 4, 7], 6)); // true ([23, 2, 6, 4, 7] sum 42)
console.log("[23, 2, 4, 6, 7], k=13 ->", checkSubarraySum([23, 2, 4, 6, 7], 13)); // false
