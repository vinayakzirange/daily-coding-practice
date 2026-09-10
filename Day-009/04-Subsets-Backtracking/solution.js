/*
 * Problem Name: Subsets
 * Problem Statement: Given an integer array nums of unique elements, return all possible subsets (the power set).
 * The solution set must not contain duplicate subsets. Return the solution in any order.
 * 
 * Approach: Backtracking / Decision Tree. Include or exclude current element.
 * 
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N) recursion stack depth
 */

function subsets(nums) {
  const result = [];

  function backtrack(startIndex, currentPath) {
    result.push([...currentPath]);

    for (let i = startIndex; i < nums.length; i++) {
      currentPath.push(nums[i]);
      backtrack(i + 1, currentPath);
      currentPath.pop();
    }
  }

  backtrack(0, []);
  return result;
}

console.log("Subsets of [1, 2, 3]:", subsets([1, 2, 3]));
// Expected: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
