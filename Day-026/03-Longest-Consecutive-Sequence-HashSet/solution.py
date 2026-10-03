"""
Problem: Longest Consecutive Sequence (LeetCode 128)
Language: Python
Difficulty: Medium
Time Complexity: O(N)
Space Complexity: O(N)
"""

from typing import List

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        max_streak = 0

        for num in num_set:
            if num - 1 not in num_set:
                curr_num = num
                curr_streak = 1

                while curr_num + 1 in num_set:
                    curr_num += 1
                    curr_streak += 1

                max_streak = max(max_streak, curr_streak)

        return max_streak

if __name__ == "__main__":
    sol = Solution()
    print("Output:", sol.longestConsecutive([100, 4, 200, 1, 3, 2]))                  # 4 ([1,2,3,4])
    print("Output:", sol.longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))          # 9
