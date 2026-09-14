/**
 * Problem: Maximum Average Subarray I
 * Topic: Sliding Window / Fixed Size
 * Language: JavaScript
 *
 * Approach:
 * Compute sum of first k elements. Slide window across array by adding incoming element
 * and subtracting outgoing element. Maintain max sum and return max sum / k.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function findMaxAverage(nums, k) {
    let currentSum = 0;
    for (let i = 0; i < k; i++) {
        currentSum += nums[i];
    }

    let maxSum = currentSum;
    for (let i = k; i < nums.length; i++) {
        currentSum += nums[i] - nums[i - k];
        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
    }

    return maxSum / k;
}

// Test cases
console.log("[1,12,-5,-6,50,3], k=4 ->", findMaxAverage([1, 12, -5, -6, 50, 3], 4)); // 12.75
console.log("[5], k=1 ->", findMaxAverage([5], 1)); // 5.0
