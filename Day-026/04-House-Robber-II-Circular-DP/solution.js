// Problem: House Robber II (LeetCode 213)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1)

function rob(nums) {
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    // Rob either house 0 to n-2 OR house 1 to n-1
    return Math.max(robLinear(nums, 0, nums.length - 2), robLinear(nums, 1, nums.length - 1));
}

function robLinear(nums, start, end) {
    let prevMax = 0;
    let currMax = 0;

    for (let i = start; i <= end; i++) {
        const temp = currMax;
        currMax = Math.max(currMax, prevMax + nums[i]);
        prevMax = temp;
    }

    return currMax;
}

// Test cases
console.log("Output ([2,3,2]):", rob([2,3,2])); // 3
console.log("Output ([1,2,3,1]):", rob([1,2,3,1])); // 4
console.log("Output ([1,2,3]):", rob([1,2,3])); // 3
