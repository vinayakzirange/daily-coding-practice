/**
 * Problem: Jump Game
 * Topic: Greedy / Reachability Array
 * Language: JavaScript
 *
 * Approach:
 * Maintain a 'maxReach' variable. Iterate through array; if current index i > maxReach,
 * return false. Update maxReach = max(maxReach, i + nums[i]). Return true if maxReach >= n - 1.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;
    }
    return true;
}

// Test cases
console.log("[2,3,1,1,4] ->", canJump([2, 3, 1, 1, 4])); // true
console.log("[3,2,1,0,4] ->", canJump([3, 2, 1, 0, 4])); // false
