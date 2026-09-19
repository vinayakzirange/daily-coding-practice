/**
 * Problem: House Robber
 * Topic: Dynamic Programming / Space Optimization
 * Language: JavaScript
 *
 * Approach:
 * At house i, choose max(rob current + prevPrev, skip current + prev).
 * Optimize DP table into two variables: rob1 and rob2.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function rob(nums) {
    let rob1 = 0;
    let rob2 = 0;

    for (let num of nums) {
        const temp = Math.max(num + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }

    return rob2;
}

// Test cases
console.log("[1,2,3,1] ->", rob([1, 2, 3, 1])); // 4 (1 + 3)
console.log("[2,7,9,3,1] ->", rob([2, 7, 9, 3, 1])); // 12 (2 + 9 + 1)
