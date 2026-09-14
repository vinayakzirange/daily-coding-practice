/**
 * Problem: Max Consecutive Ones
 * Topic: Array / Sliding Counter
 * Language: JavaScript
 *
 * Approach:
 * Iterate through the binary array, incrementing current streak on 1 and resetting to 0 on 0.
 * Track max streak seen.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function findMaxConsecutiveOnes(nums) {
    let maxCount = 0;
    let currentCount = 0;

    for (let num of nums) {
        if (num === 1) {
            currentCount++;
            if (currentCount > maxCount) maxCount = currentCount;
        } else {
            currentCount = 0;
        }
    }
    return maxCount;
}

// Test cases
console.log("[1,1,0,1,1,1] ->", findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1])); // 3
console.log("[1,0,1,1,0,1] ->", findMaxConsecutiveOnes([1, 0, 1, 1, 0, 1])); // 2
