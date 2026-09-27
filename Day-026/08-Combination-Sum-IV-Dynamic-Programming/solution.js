// Problem: Combination Sum IV (LeetCode 377)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(target * N)
// Space Complexity: O(target)

function combinationSum4(nums, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= target; i++) {
        for (const num of nums) {
            if (i >= num) {
                dp[i] += dp[i - num];
            }
        }
    }

    return dp[target];
}

// Test cases
console.log("Output ([1,2,3], target=4):", combinationSum4([1,2,3], 4)); // 7
console.log("Output ([9], target=3):", combinationSum4([9], 3)); // 0
