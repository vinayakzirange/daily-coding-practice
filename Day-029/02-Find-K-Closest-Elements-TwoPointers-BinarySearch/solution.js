// Problem: Find K Closest Elements (LeetCode 658)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(log(N - K) + K)
// Space Complexity: O(1) extra space

function findClosestElements(arr, k, x) {
    let left = 0;
    let right = arr.length - k;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (x - arr[mid] > arr[mid + k] - x) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return arr.slice(left, left + k);
}

// Test cases
console.log("Closest ([1,2,3,4,5], k=4, x=3):", findClosestElements([1,2,3,4,5], 4, 3)); // [1,2,3,4]
console.log("Closest ([1,2,3,4,5], k=4, x=-1):", findClosestElements([1,2,3,4,5], 4, -1)); // [1,2,3,4]
