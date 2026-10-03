"""
Problem: Course Schedule II (LeetCode 210)
Language: Python
Difficulty: Medium
Time Complexity: O(V + E)
Space Complexity: O(V + E)
"""

from collections import deque, defaultdict
from typing import List

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = defaultdict(list)
        in_degree = [0] * numCourses

        for dest, src in prerequisites:
            adj[src].append(dest)
            in_degree[dest] += 1

        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        result = []

        while queue:
            curr = queue.popleft()
            result.append(curr)

            for neighbor in adj[curr]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        return result if len(result) == numCourses else []

if __name__ == "__main__":
    sol = Solution()
    pre = [[1, 0], [2, 0], [3, 1], [3, 2]]
    print("Course Order:", sol.findOrder(4, pre))  # [0, 1, 2, 3] or [0, 2, 1, 3]
