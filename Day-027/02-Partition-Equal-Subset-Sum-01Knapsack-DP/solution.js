// Problem: Partition Equal Subset Sum (LeetCode 416)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N * Target)
// Space Complexity: O(Target)

function canPartition(nums) {
    const sum = nums.reduce((acc, num) => acc + num, 0);
    if (sum % 2 !== 0) return false;

    const target = sum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    return dp[target];
}

// Test cases
console.log("Output ([1,5,11,5]):", canPartition([1, 5, 11, 5])); // true
console.log("Output ([1,2,3,5]):", canPartition([1, 2, 3, 5])); // false
