"""
Problem: Combination Sum (LeetCode 39)
Difficulty: Medium
Topic: Array / Backtracking

Description:
Given an array of distinct integers candidates and a target integer target,
return a list of all unique combinations of candidates where the chosen numbers
sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times.
Two combinations are unique if the frequency of at least one of the chosen
numbers is different.

The test cases are generated such that the number of unique combinations that
sum up to target is less than 150 combinations for the given input.

Example 1:
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

Example 2:
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]

Example 3:
Input: candidates = [2], target = 1
Output: []

Constraints:
- 1 <= candidates.length <= 30
- 2 <= candidates[i] <= 40
- All elements of candidates are distinct.
- 1 <= target <= 40

Complexity Analysis:
- Time Complexity: O(N^(T/M + 1)) where N is number of candidates, T is target, M is minimal value among candidates.
- Space Complexity: O(T/M) for the recursion stack and combination path.
"""

from typing import List


class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()  # Sorting enables early loop termination
        result = []

        def backtrack(start: int, remain: int, path: List[int]):
            if remain == 0:
                result.append(list(path))
                return

            for i in range(start, len(candidates)):
                cand = candidates[i]
                if cand > remain:
                    break  # Early pruning: remaining candidates are even larger

                path.append(cand)
                # Re-use of the same element is allowed, so pass i as the start index
                backtrack(i, remain - cand, path)
                path.pop()

        backtrack(0, target, [])
        return result


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([2, 3, 6, 7], 7, [[2, 2, 3], [7]]),
        ([2, 3, 5], 8, [[2, 2, 2, 2], [2, 3, 3], [3, 5]]),
        ([2], 1, []),
        ([2, 3], 6, [[2, 2, 2], [3, 3]]),
        ([7, 3, 2], 18, 7),  # Test length of combinations
    ]

    for idx, tc in enumerate(test_cases, 1):
        cands, target, expected = tc[0], tc[1], tc[2]
        res = sol.combinationSum(cands, target)
        if isinstance(expected, int):
            assert (
                len(res) == expected
            ), f"Test {idx} Failed: expected {expected} combinations, got {len(res)}"
        else:
            sorted_res = sorted([sorted(c) for c in res])
            sorted_exp = sorted([sorted(c) for c in expected])
            assert (
                sorted_res == sorted_exp
            ), f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: target={target} -> {len(res)} combinations found")

    print("\nAll Combination Sum tests passed successfully!")
