// Problem: Next Greater Element II (LeetCode 503)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(N) monotonic stack

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function nextGreaterElements(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = []; // Stores indices

    // Traverse the array twice to simulate circular buffer
    for (let i = 0; i < 2 * n; i++) {
        const currentNum = nums[i % n];

        while (stack.length > 0 && nums[stack[stack.length - 1]] < currentNum) {
            const poppedIndex = stack.pop();
            result[poppedIndex] = currentNum;
        }

        // Only push indices during the first pass
        if (i < n) {
            stack.push(i);
        }
    }

    return result;
}

// Test cases
console.log("Next Greater for [1, 2, 1]:", nextGreaterElements([1, 2, 1]));
// Expected: [2, -1, 2]

console.log("Next Greater for [1, 2, 3, 4, 3]:", nextGreaterElements([1, 2, 3, 4, 3]));
// Expected: [2, 3, 4, -1, 4]

console.log("Next Greater for [5, 4, 3, 2, 1]:", nextGreaterElements([5, 4, 3, 2, 1]));
// Expected: [-1, 5, 5, 5, 5]
