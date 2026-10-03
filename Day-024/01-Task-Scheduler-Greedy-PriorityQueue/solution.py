"""
Problem: Task Scheduler (LeetCode 621)
Language: Python
Difficulty: Medium
Time Complexity: O(N) where N is number of tasks
Space Complexity: O(1) array of size 26
"""

from collections import Counter
from typing import List

class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        counts = list(Counter(tasks).values())
        max_freq = max(counts)
        max_freq_count = counts.count(max_freq)

        empty_slots = (max_freq - 1) * (n - (max_freq_count - 1))
        available_tasks = len(tasks) - max_freq * max_freq_count
        idles = max(0, empty_slots - available_tasks)

        return len(tasks) + idles

if __name__ == "__main__":
    sol = Solution()
    tasks1 = ['A', 'A', 'A', 'B', 'B', 'B']
    print("Output (n=2):", sol.leastInterval(tasks1, 2))  # 8

    tasks2 = ['A', 'C', 'A', 'B', 'D', 'B']
    print("Output (n=1):", sol.leastInterval(tasks2, 1))  # 6
