/**
 * ====================================================================
 * Problem: Single Element in a Sorted Array (LeetCode 540)
 * Difficulty: Medium
 * Topic: Array, Binary Search
 * ====================================================================
 * 
 * You are given a sorted array consisting of only integers where every
 * element appears exactly twice, except for one element which appears
 * exactly once.
 * 
 * Return the single element that appears only once.
 * 
 * Your solution must run in O(log n) time and O(1) space.
 * 
 * Example 1:
 * Input: nums = [1, 1, 2, 3, 3, 4, 4, 8, 8]
 * Output: 2
 * 
 * Example 2:
 * Input: nums = [3, 3, 7, 7, 10, 11, 11]
 * Output: 10
 * 
 * Constraints:
 * - 1 <= nums.length <= 10^5
 * - 0 <= nums[i] <= 10^5
 * ====================================================================
 */

/**
 * Binary search on even/odd index parity.
 * Before the single element: pairs start at even indices (2k, 2k+1).
 * After the single element: pairs start at odd indices (2k-1, 2k).
 * 
 * @param {number[]} nums
 * @return {number}
 */
function singleNonDuplicate(nums) {
    let low = 0;
    let high = nums.length - 1;

    while (low < high) {
        let mid = low + Math.floor((high - low) / 2);

        // Ensure mid is even so we always compare mid with mid + 1
        if (mid % 2 === 1) {
            mid--;
        }

        // If the pair matches, the unique element must be in the right half
        if (nums[mid] === nums[mid + 1]) {
            low = mid + 2;
        } else {
            // Unique element is at mid or in the left half
            high = mid;
        }
    }

    return nums[low];
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: Standard middle element
    const test1 = [1, 1, 2, 3, 3, 4, 4, 8, 8];
    console.assert(singleNonDuplicate(test1) === 2, `Test 1 Failed: got ${singleNonDuplicate(test1)}`);

    // Test 2: Element near the end
    const test2 = [3, 3, 7, 7, 10, 11, 11];
    console.assert(singleNonDuplicate(test2) === 10, `Test 2 Failed: got ${singleNonDuplicate(test2)}`);

    // Test 3: Single element array
    const test3 = [1];
    console.assert(singleNonDuplicate(test3) === 1, `Test 3 Failed: got ${singleNonDuplicate(test3)}`);

    // Test 4: First element is single
    const test4 = [5, 6, 6, 7, 7];
    console.assert(singleNonDuplicate(test4) === 5, `Test 4 Failed: got ${singleNonDuplicate(test4)}`);

    // Test 5: Last element is single
    const test5 = [1, 1, 2, 2, 3];
    console.assert(singleNonDuplicate(test5) === 3, `Test 5 Failed: got ${singleNonDuplicate(test5)}`);

    console.log("All Single Element in a Sorted Array tests passed successfully!");
}

module.exports = { singleNonDuplicate };
