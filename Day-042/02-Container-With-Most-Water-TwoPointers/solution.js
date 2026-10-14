/**
 * Problem: Container With Most Water (LeetCode 11)
 * Difficulty: Medium
 * Topic: Array / Two Pointers / Greedy
 *
 * Description:
 * You are given an integer array height of length n. There are n vertical lines
 * drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]).
 *
 * Find two lines that together with the x-axis form a container, such that the
 * container contains the most water.
 *
 * Return the maximum amount of water a container can store.
 * Notice that you may not slant the container.
 *
 * Example 1:
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * Explanation: The vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
 * In this case, the max area of water the container can contain is 49 between
 * index 1 (height 8) and index 8 (height 7): min(8, 7) * (8 - 1) = 7 * 7 = 49.
 *
 * Example 2:
 * Input: height = [1,1]
 * Output: 1
 *
 * Constraints:
 * - n == height.length
 * - 2 <= n <= 10^5
 * - 0 <= height[i] <= 10^4
 *
 * Complexity Analysis:
 * - Time Complexity: O(n) two pointers approach traversing the array once.
 * - Space Complexity: O(1) constant auxiliary space.
 */

/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const currentWater = width * minHeight;

        if (currentWater > maxWater) {
            maxWater = currentWater;
        }

        // Greedy choice: always move the pointer with smaller height,
        // because the smaller side limits the container's height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

// ==========================================
// Test Cases & Verification
// ==========================================
const testCases = [
    { height: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
    { height: [1, 1], expected: 1 },
    { height: [4, 3, 2, 1, 4], expected: 16 },
    { height: [1, 2, 1], expected: 2 },
    { height: [2, 3, 10, 5, 7, 8, 9], expected: 36 },
    { height: [1, 2, 4, 3], expected: 4 },
];

testCases.forEach((tc, idx) => {
    const result = maxArea(tc.height);
    if (result !== tc.expected) {
        console.error(`Test ${idx + 1} Failed: got ${result}, expected ${tc.expected}`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: height=[${tc.height.slice(0, 5)}...] -> max water = ${result}`);
});

console.log("\nAll Container With Most Water tests passed successfully!");
