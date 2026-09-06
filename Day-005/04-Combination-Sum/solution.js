/*
 * Problem Name: Combination Sum
 * Problem Statement: Given an array of distinct integers candidates and a target integer target, 
 * return a list of all unique combinations of candidates where the chosen numbers sum to target.
 * You may pass the same candidate an unlimited number of times.
 * 
 * Approach: Backtracking / Recursion.
 * 
 * Time Complexity: O(2^T) where T is target value
 * Space Complexity: O(T) max recursion depth
 */

function combinationSum(candidates, target) {
  const result = [];

  function backtrack(startIndex, currentPath, currentSum) {
    if (currentSum === target) {
      result.push([...currentPath]);
      return;
    }
    if (currentSum > target) return;

    for (let i = startIndex; i < candidates.length; i++) {
      currentPath.push(candidates[i]);
      backtrack(i, currentPath, currentSum + candidates[i]);
      currentPath.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
}

console.log("Combinations for target 7 with [2,3,6,7]:", combinationSum([2, 3, 6, 7], 7));
// Expected: [[2, 2, 3], [7]]
