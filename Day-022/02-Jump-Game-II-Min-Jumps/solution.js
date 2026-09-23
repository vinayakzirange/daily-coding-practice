/**
 * Problem: Jump Game II (Minimum Jumps)
 * Topic: Greedy / Implicit BFS / Level Ranges
 * Language: JavaScript
 *
 * Approach:
 * Track current jump boundary 'currentEnd' and furthest reach 'farthest'.
 * When index i reaches currentEnd, increment jumps and update currentEnd = farthest.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function jump(nums) {
    if (nums.length <= 1) return 0;
    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
            if (currentEnd >= nums.length - 1) break;
        }
    }
    return jumps;
}

// Test cases
console.log("[2,3,1,1,4] ->", jump([2, 3, 1, 1, 4])); // 2 (jump 0 -> 1 -> 4)
console.log("[2,3,0,1,4] ->", jump([2, 3, 0, 1, 4])); // 2
