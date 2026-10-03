"""
Problem: Is Graph Bipartite? (LeetCode 785)
Language: Python
Difficulty: Medium
Time Complexity: O(V + E)
Space Complexity: O(V)
"""

from collections import deque
from typing import List

class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        colors = [0] * n

        for i in range(n):
            if colors[i] != 0:
                continue

            queue = deque([i])
            colors[i] = 1

            while queue:
                curr = queue.popleft()
                for neighbor in graph[curr]:
                    if colors[neighbor] == 0:
                        colors[neighbor] = -colors[curr]
                        queue.append(neighbor)
                    elif colors[neighbor] == colors[curr]:
                        return False

        return True

if __name__ == "__main__":
    sol = Solution()
    print("Is Bipartite:", sol.isBipartite([[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]]))  # False
    print("Is Bipartite:", sol.isBipartite([[1, 3], [0, 2], [1, 3], [0, 2]]))          # True
