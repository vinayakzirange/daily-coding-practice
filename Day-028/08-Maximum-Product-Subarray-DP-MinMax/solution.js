// Problem: Maximum Product Subarray (LeetCode 152)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1)

function maxProduct(nums) {
    if (nums.length === 0) return 0;

    let maxSoFar = nums[0];
    let minSoFar = nums[0];
    let result = maxSoFar;

    for (let i = 1; i < nums.length; i++) {
        const curr = nums[i];
        const tempMax = Math.max(curr, Math.max(maxSoFar * curr, minSoFar * curr));
        minSoFar = Math.min(curr, Math.min(maxSoFar * curr, minSoFar * curr));
        maxSoFar = tempMax;

        result = Math.max(result, maxSoFar);
    }

    return result;
}

// Test cases
console.log("Max Product ([2,3,-2,4]):", maxProduct([2,3,-2,4])); // 6
console.log("Max Product ([-2,0,-1]):", maxProduct([-2,0,-1])); // 0
