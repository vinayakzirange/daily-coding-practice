"""
Problem: Course Schedule II
Topic: Graph / Topological Sort / BFS Kahn's Algorithm Order
Language: Python

Approach:
Perform Topological Sort using Kahn's BFS algorithm while appending course IDs to an output list.
If output list length equals numCourses, return the valid order; else return empty list (cycle detected).

Time Complexity: O(V + E)
Space Complexity: O(V + E)
"""

from collections import deque, defaultdict
from typing import List

class Solution:
    @staticmethod
    def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = defaultdict(list)
        indegree = [0] * numCourses

        for dest, src in prerequisites:
            adj[src].append(dest)
            indegree[dest] += 1

        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        result = []

        while queue:
            course = queue.popleft()
            result.append(course)
            for neighbor in adj[course]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)

        return result if len(result) == numCourses else []

if __name__ == "__main__":
    pre = [[1, 0], [2, 0], [3, 1], [3, 2]]
    print("Course Order ->", Solution.findOrder(4, pre))  # [0, 1, 2, 3] or [0, 2, 1, 3]
