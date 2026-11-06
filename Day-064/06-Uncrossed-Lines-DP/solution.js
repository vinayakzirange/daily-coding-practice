/**
 * LeetCode 1035: Uncrossed Lines (Medium)
 * https://leetcode.com/problems/uncrossed-lines/
 *
 * You are given two integer arrays nums1 and nums2. We write the integers of nums1 and nums2
 * (in the order they are given) on two separate horizontal lines.
 *
 * We may draw connecting lines: a straight line connecting two numbers nums1[i] and nums2[j] such that:
 * - nums1[i] == nums2[j], and
 * - the line we draw does not intersect any other connecting (non-horizontal) line.
 *
 * Note that a connecting line cannot intersect even at the endpoints (i.e. each number can only belong to one line).
 *
 * Return the maximum number of connecting lines we can draw in this way.
 *
 * (Notice this problem is equivalent to finding the Longest Common Subsequence of nums1 and nums2).
 *
 * Example 1:
 * Input: nums1 = [1,4,2], nums2 = [1,2,4]
 * Output: 2
 * Explanation: We can draw 2 uncrossed lines as in the diagram: 1 to 1, and 4 to 4 (or 2 to 2).
 *
 * Example 2:
 * Input: nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]
 * Output: 3
 *
 * Example 3:
 * Input: nums1 = [1,3,7,1,7,5], nums2 = [1,9,2,5,1]
 * Output: 2
 *
 * Constraints:
 * - 1 <= nums1.length, nums2.length <= 500
 * - 1 <= nums1[i], nums2[j] <= 2000
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function maxUncrossedLines(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;

    // Space-optimized 1D Dynamic Programming:
    // dp[j] stores LCS length up to index j of nums2
    const dp = new Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        let prevDiagonal = 0; // represents dp[i-1][j-1]
        for (let j = 1; j <= n; j++) {
            const temp = dp[j];
            if (nums1[i - 1] === nums2[j - 1]) {
                dp[j] = prevDiagonal + 1;
            } else {
                dp[j] = Math.max(dp[j], dp[j - 1]);
            }
            prevDiagonal = temp;
        }
    }

    return dp[n];
}

// Unit tests
function runTests() {
    // Test 1: Example 1
    console.assert(maxUncrossedLines([1, 4, 2], [1, 2, 4]) === 2, "Test 1 Failed");

    // Test 2: Example 2
    console.assert(maxUncrossedLines([2, 5, 1, 2, 5], [10, 5, 2, 1, 5, 2]) === 3, "Test 2 Failed");

    // Test 3: Example 3
    console.assert(maxUncrossedLines([1, 3, 7, 1, 7, 5], [1, 9, 2, 5, 1]) === 2, "Test 3 Failed");

    // Test 4: Completely identical arrays
    console.assert(maxUncrossedLines([1, 2, 3], [1, 2, 3]) === 3, "Test 4 Failed");

    // Test 5: Completely disjoint arrays
    console.assert(maxUncrossedLines([1, 2, 3], [4, 5, 6]) === 0, "Test 5 Failed");

    console.log("All Uncrossed Lines tests passed successfully!");
}

runTests();

