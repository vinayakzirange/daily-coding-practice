// Problem: Subsets (LeetCode 78)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(2^N)
// Space Complexity: O(N) recursion stack

function subsets(nums) {
    const result = [];

    function backtrack(index, current) {
        result.push([...current]);

        for (let i = index; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}

// Test cases
console.log("Subsets of [1,2,3]:", subsets([1,2,3]));
