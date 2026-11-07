/**
 * LeetCode 1053: Previous Permutation With One Swap (Medium)
 * https://leetcode.com/problems/previous-permutation-with-one-swap/
 *
 * Given an array of positive integers arr (not necessarily unique), return the
 * lexicographically largest permutation that is smaller than arr, that can be made
 * with exactly one swap (A swap exchanges the positions of two numbers arr[i] and arr[j]).
 *
 * If it cannot be done, return the same array.
 *
 * Example 1:
 * Input: arr = [3,2,1]
 * Output: [3,1,2]
 * Explanation: Swapping 2 and 1.
 *
 * Example 2:
 * Input: arr = [1,1,5]
 * Output: [1,1,5]
 * Explanation: This is already the smallest permutation.
 *
 * Example 3:
 * Input: arr = [1,9,4,6,7]
 * Output: [1,7,4,6,9]
 * Explanation: Swapping 9 and 7.
 *
 * Constraints:
 * - 1 <= arr.length <= 10^4
 * - 1 <= arr[i] <= 10^4
 *
 * @param {number[]} arr
 * @return {number[]}
 */
function prevPermOpt1(arr) {
    const n = arr.length;
    let i = n - 2;

    // Step 1: Find the first index i from right where arr[i] > arr[i + 1]
    while (i >= 0 && arr[i] <= arr[i + 1]) {
        i--;
    }

    // If array is sorted non-decreasingly, no smaller permutation exists
    if (i < 0) {
        return arr;
    }

    // Step 2: Find the largest value arr[j] strictly less than arr[i] for j > i.
    // If duplicates of this largest value exist, pick the first (leftmost) occurrence
    // to maximize the resulting permutation.
    let targetIdx = i + 1;
    for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[i] && arr[j] > arr[targetIdx]) {
            targetIdx = j;
        }
    }

    // Step 3: Swap arr[i] and arr[targetIdx]
    const temp = arr[i];
    arr[i] = arr[targetIdx];
    arr[targetIdx] = temp;

    return arr;
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    console.assert(JSON.stringify(prevPermOpt1([3, 2, 1])) === JSON.stringify([3, 1, 2]), "Test 1 Failed");

    // Test 2: Example 2 (no smaller permutation)
    console.assert(JSON.stringify(prevPermOpt1([1, 1, 5])) === JSON.stringify([1, 1, 5]), "Test 2 Failed");

    // Test 3: Example 3
    console.assert(JSON.stringify(prevPermOpt1([1, 9, 4, 6, 7])) === JSON.stringify([1, 7, 4, 6, 9]), "Test 3 Failed");

    // Test 4: Duplicate maximums to the right -> pick leftmost
    console.assert(JSON.stringify(prevPermOpt1([3, 1, 1, 3])) === JSON.stringify([1, 3, 1, 3]), "Test 4 Failed");

    // Test 5: Single element
    console.assert(JSON.stringify(prevPermOpt1([5])) === JSON.stringify([5]), "Test 5 Failed");

    console.log("All Previous Permutation With One Swap tests passed successfully!");
}

runTests();
