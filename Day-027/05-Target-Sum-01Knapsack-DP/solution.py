"""
Problem: Target Sum (LeetCode 494)
Language: Python
Difficulty: Medium
Time Complexity: O(N * Target)
Space Complexity: O(Target)
"""

from typing import List

class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        total = sum(nums)
        if total < abs(target) or (total + target) % 2 != 0:
            return 0

        s1 = (total + target) // 2
        dp = [0] * (s1 + 1)
        dp[0] = 1

        for num in nums:
            for j in range(s1, num - 1, -1):
                dp[j] += dp[j - num]

        return dp[s1]

if __name__ == "__main__":
    sol = Solution()
    print("Output (target=3):", sol.findTargetSumWays([1, 1, 1, 1, 1], 3))  # 5
