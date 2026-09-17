/**
 * Problem: Container With Most Water
 * Topic: Two Pointers / Greedy
 * Language: JavaScript
 *
 * Approach:
 * Place pointers at left (0) and right (n-1). Calculate current area = min(height[l], height[r]) * (r - l).
 * Advance the pointer with the smaller height greedily to maximize potential height for wider containers.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const currentWater = Math.min(height[left], height[right]) * (right - left);
        if (currentWater > maxWater) maxWater = currentWater;

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}

// Test cases
console.log("[1,8,6,2,5,4,8,3,7] ->", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log("[1,1] ->", maxArea([1, 1])); // 1
