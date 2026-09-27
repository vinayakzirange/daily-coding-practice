// Problem: Find the Duplicate Number (LeetCode 287)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1)

function findDuplicate(nums) {
    let slow = nums[0];
    let fast = nums[0];

    // Phase 1: Find intersection point of the cycle
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);

    // Phase 2: Find the entrance to the cycle
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow;
}

// Test cases
console.log("Output ([1,3,4,2,2]):", findDuplicate([1,3,4,2,2])); // 2
console.log("Output ([3,1,3,4,2]):", findDuplicate([3,1,3,4,2])); // 3
