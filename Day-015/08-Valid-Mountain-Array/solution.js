/**
 * Problem: Valid Mountain Array
 * Topic: Two Pointers / Array Scan
 * Language: JavaScript
 *
 * Approach:
 * Walk up from left while arr[i] < arr[i+1]. Walk down from right while arr[j] > arr[j-1].
 * Verify peak is not at start/end (i > 0 && j < len-1) and both pointers meet at same peak (i === j).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function validMountainArray(arr) {
    const n = arr.length;
    let i = 0;
    let j = n - 1;

    while (i + 1 < n && arr[i] < arr[i + 1]) i++;
    while (j > 0 && arr[j - 1] > arr[j]) j--;

    return i > 0 && i === j && j < n - 1;
}

// Test cases
console.log("[2, 1] ->", validMountainArray([2, 1])); // false
console.log("[3, 5, 5] ->", validMountainArray([3, 5, 5])); // false
console.log("[0, 3, 2, 1] ->", validMountainArray([0, 3, 2, 1])); // true
