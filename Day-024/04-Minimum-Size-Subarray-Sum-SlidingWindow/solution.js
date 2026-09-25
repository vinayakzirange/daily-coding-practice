// Problem: Minimum Size Subarray Sum (LeetCode 209)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1)

function minSubArrayLen(target, nums) {
    let minLen = Infinity;
    let sum = 0;
    let left = 0;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    
    return minLen === Infinity ? 0 : minLen;
}

// Test cases
console.log("Output (target=7, [2,3,1,2,4,3]):", minSubArrayLen(7, [2,3,1,2,4,3])); // 2
console.log("Output (target=4, [1,4,4]):", minSubArrayLen(4, [1,4,4])); // 1
console.log("Output (target=11, [1,1,1,1,1,1,1,1]):", minSubArrayLen(11, [1,1,1,1,1,1,1,1])); // 0
