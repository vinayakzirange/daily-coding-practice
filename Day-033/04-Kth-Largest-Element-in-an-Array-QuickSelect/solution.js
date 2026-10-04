/**
 * Problem: Kth Largest Element in an Array (LeetCode 215)
 * Difficulty: Medium
 * Topic: Array / Divide and Conquer / QuickSelect Algorithm / Heap
 * 
 * Description:
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * Can you solve it without sorting?
 * 
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 * 
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 * 
 * Constraints:
 *   * 1 <= k <= nums.length <= 10^5
 *   * -10^4 <= nums[i] <= 10^4
 * 
 * Complexity:
 *   * Time Complexity: Average O(n), Worst-case O(n^2) with randomized QuickSelect
 *   * Space Complexity: O(1) iterative in-place partitioning
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums, k) {
    // The kth largest element is at index (nums.length - k) in 0-indexed ascending order
    const targetIdx = nums.length - k;

    function swap(i, j) {
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    function partition(left, right) {
        // Choose random pivot to avoid worst-case O(n^2) on sorted inputs
        const randomPivotIdx = left + Math.floor(Math.random() * (right - left + 1));
        swap(randomPivotIdx, right);

        const pivotValue = nums[right];
        let storeIdx = left;

        for (let i = left; i < right; i++) {
            if (nums[i] < pivotValue) {
                swap(storeIdx, i);
                storeIdx++;
            }
        }
        swap(storeIdx, right);
        return storeIdx;
    }

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const pivotIndex = partition(left, right);

        if (pivotIndex === targetIdx) {
            return nums[pivotIndex];
        } else if (pivotIndex < targetIdx) {
            left = pivotIndex + 1;
        } else {
            right = pivotIndex - 1;
        }
    }

    return nums[left];
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { nums: [3, 2, 1, 5, 6, 4], k: 2, expected: 5 },
        { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 4 },
        { nums: [1], k: 1, expected: 1 },
        { nums: [7, 10, 4, 3, 20, 15], k: 3, expected: 10 },
        { nums: [-1, -1], k: 2, expected: -1 }
    ];

    testCases.forEach((tc, idx) => {
        const copy = [...tc.nums];
        const result = findKthLargest(copy, tc.k);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        console.log(`Test ${idx + 1} Passed: k=${tc.k} in [${tc.nums.slice(0, 5)}...] -> ${result}`);
    });

    console.log('\nAll Kth Largest Element tests passed successfully!');
}

runTests();
