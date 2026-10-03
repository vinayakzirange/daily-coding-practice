"""
Problem: Combination Sum II (LeetCode 40)
Language: Python
Difficulty: Medium
Time Complexity: O(2^N) in worst case
Space Complexity: O(N) recursion stack
"""

from typing import List

class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        result = []
        candidates.sort()

        def backtrack(remain: int, start: int, current: List[int]):
            if remain == 0:
                result.append(list(current))
                return

            for i in range(start, len(candidates)):
                if candidates[i] > remain:
                    break
                if i > start and candidates[i] == candidates[i - 1]:
                    continue

                current.append(candidates[i])
                backtrack(remain - candidates[i], i + 1, current)
                current.pop()

        backtrack(target, 0, [])
        return result

if __name__ == "__main__":
    sol = Solution()
    candidates1 = [10, 1, 2, 7, 6, 1, 5]
    print("Combinations for target 8:", sol.combinationSum2(candidates1, 8))
    # Expected: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]

    candidates2 = [2, 5, 2, 1, 2]
    print("Combinations for target 5:", sol.combinationSum2(candidates2, 5))
    # Expected: [[1, 2, 2], [5]]
