// Problem: Container With Most Water (LeetCode 11)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1)

function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const width = right - left;
        const currentWater = Math.min(height[left], height[right]) * width;
        maxWater = Math.max(maxWater, currentWater);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

// Test cases
console.log("Max Area ([1,8,6,2,5,4,8,3,7]):", maxArea([1,8,6,2,5,4,8,3,7])); // 49
console.log("Max Area ([1,1]):", maxArea([1,1])); // 1
