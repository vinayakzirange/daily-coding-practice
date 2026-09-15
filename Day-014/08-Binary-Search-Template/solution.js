/**
 * Problem: Binary Search Standard Template
 * Topic: Binary Search
 * Language: JavaScript
 *
 * Approach:
 * Standard binary search over a sorted array using left and right pointers.
 * Compute mid = Math.floor(left + (right - left) / 2) to prevent overflow.
 *
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */

function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Test cases
console.log("Search 9 in [-1,0,3,5,9,12] ->", search([-1, 0, 3, 5, 9, 12], 9)); // 4
console.log("Search 2 in [-1,0,3,5,9,12] ->", search([-1, 0, 3, 5, 9, 12], 2)); // -1
