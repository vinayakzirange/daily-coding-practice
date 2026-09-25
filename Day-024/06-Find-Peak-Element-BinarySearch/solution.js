// Problem: Find Peak Element (LeetCode 162)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(log N)
// Space Complexity: O(1)

function findPeakElement(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

// Test cases
console.log("Peak Index [1,2,3,1]:", findPeakElement([1,2,3,1])); // 2
console.log("Peak Index [1,2,1,3,5,6,4]:", findPeakElement([1,2,1,3,5,6,4])); // 1 or 5
