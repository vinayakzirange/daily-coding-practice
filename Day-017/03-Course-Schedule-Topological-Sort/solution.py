"""
Problem: Course Schedule
Topic: Graph / Topological Sort / BFS (Kahn's Algorithm)
Language: Python

Approach:
Build adjacency list and compute indegrees of all nodes. Enqueue nodes with indegree 0.
Perform BFS, decrementing indegrees of neighbors. If processed nodes count == numCourses,
return true (no cycle exists).

Time Complexity: O(V + E)
Space Complexity: O(V + E)
"""

from collections import deque, defaultdict
from typing import List

class Solution:
    @staticmethod
    def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = defaultdict(list)
        indegree = [0] * numCourses

        for dest, src in prerequisites:
            adj[src].append(dest)
            indegree[dest] += 1

        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        count = 0

        while queue:
            course = queue.popleft()
            count += 1
            for neighbor in adj[course]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)

        return count == numCourses

if __name__ == "__main__":
    print("2 courses, [[1,0]] ->", Solution.canFinish(2, [[1, 0]]))          # True
    print("2 courses, [[1,0],[0,1]] ->", Solution.canFinish(2, [[1, 0], [0, 1]]))  # False
