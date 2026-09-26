// Problem: Longest Increasing Subsequence (LeetCode 300)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N log N) using patience sorting
// Space Complexity: O(N)

function lengthOfLIS(nums) {
    const tails = [];
    
    for (const num of nums) {
        let left = 0;
        let right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        tails[left] = num;
    }
    
    return tails.length;
}

// Test cases
console.log("LIS [10,9,2,5,3,7,101,18]:", lengthOfLIS([10,9,2,5,3,7,101,18])); // 4 ([2,3,7,101])
console.log("LIS [0,1,0,3,2,3]:", lengthOfLIS([0,1,0,3,2,3])); // 4 ([0,1,2,3])
