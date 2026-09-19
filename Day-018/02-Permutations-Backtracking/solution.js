/**
 * Problem: Permutations
 * Topic: Backtracking / Recursion
 * Language: JavaScript
 *
 * Approach:
 * Generate all permutations using recursive backtracking. Maintain a 'visited' set
 * or array to avoid reusing elements in current permutation path.
 *
 * Time Complexity: O(N * N!)
 * Space Complexity: O(N) recursion stack
 */

function permute(nums) {
    const result = [];
    const used = new Array(nums.length).fill(false);

    function backtrack(currentPath) {
        if (currentPath.length === nums.length) {
            result.push([...currentPath]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;

            used[i] = true;
            currentPath.push(nums[i]);
            backtrack(currentPath);
            currentPath.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
}

// Test cases
console.log("Permutations of [1,2,3] ->", permute([1, 2, 3]));
