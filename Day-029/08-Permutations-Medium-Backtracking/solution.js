// Problem: Permutations (LeetCode 46)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N * N!)
// Space Complexity: O(N)

function permute(nums) {
    const result = [];

    function backtrack(path, visited) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (visited[i]) continue;

            visited[i] = true;
            path.push(nums[i]);

            backtrack(path, visited);

            path.pop();
            visited[i] = false;
        }
    }

    backtrack([], new Array(nums.length).fill(false));
    return result;
}

// Test cases
console.log("Permutations ([1,2,3]):", permute([1,2,3]));
