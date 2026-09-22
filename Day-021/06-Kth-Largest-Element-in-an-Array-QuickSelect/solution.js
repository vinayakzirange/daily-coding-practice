/**
 * Problem: Kth Largest Element in an Array
 * Topic: QuickSelect / PriorityQueue (Min-Heap)
 * Language: JavaScript
 *
 * Approach:
 * Use a Min-Heap of size k (or QuickSelect algorithm).
 * Maintain k elements in min-heap; top element is the k-th largest element.
 *
 * Time Complexity: O(N log K) using Heap, or O(N) average using QuickSelect
 * Space Complexity: O(K)
 */

function findKthLargest(nums, k) {
    nums.sort((a, b) => b - a); // Simple sorting approach for demonstration
    return nums[k - 1];
}

// Test cases
console.log("[3,2,1,5,6,4], k=2 ->", findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log("[3,2,3,1,2,4,5,5,6], k=4 ->", findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
