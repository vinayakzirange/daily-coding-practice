"""
Problem Name: Course Schedule (Graph Cycle Detection / Topological Sort)
Problem Statement: There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b first if you want to take course a.
Return true if you can finish all courses. Otherwise, return false.

Approach: Topological Sort using BFS (Kahn's Algorithm with In-Degrees).
If processed count equals numCourses, no cycle exists.

Time Complexity: O(V + E) where V is numCourses and E is prerequisites count
Space Complexity: O(V + E)
"""

from collections import deque, defaultdict
from typing import List

class Solution:
    @staticmethod
    def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = defaultdict(list)
        in_degree = [0] * numCourses

        for dest, src in prerequisites:
            adj[src].append(dest)
            in_degree[dest] += 1

        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        count = 0

        while queue:
            course = queue.popleft()
            count += 1
            for neighbor in adj[course]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        return count == numCourses

if __name__ == "__main__":
    pre1 = [[1, 0]]
    print("Can finish 2 courses with [[1,0]]:", Solution.canFinish(2, pre1))  # Expected: True

    pre2 = [[1, 0], [0, 1]]
    print("Can finish 2 courses with [[1,0],[0,1]]:", Solution.canFinish(2, pre2))  # Expected: False
