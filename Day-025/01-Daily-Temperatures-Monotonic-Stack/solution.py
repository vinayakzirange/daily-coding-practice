"""
Problem: Daily Temperatures (LeetCode 739)
Language: Python
Difficulty: Medium
Time Complexity: O(N)
Space Complexity: O(N)
"""

from typing import List

class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        answer = [0] * n
        stack = []

        for i, temp in enumerate(temperatures):
            while stack and temp > temperatures[stack[-1]]:
                prev_index = stack.pop()
                answer[prev_index] = i - prev_index
            stack.append(i)

        return answer

if __name__ == "__main__":
    sol = Solution()
    temps = [73, 74, 75, 71, 69, 72, 76, 73]
    print("Output:", sol.dailyTemperatures(temps))  # [1, 1, 4, 2, 1, 1, 0, 0]
