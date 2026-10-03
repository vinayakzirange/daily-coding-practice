"""
Problem: Clone Graph (LeetCode 133)
Language: Python
Difficulty: Medium
Time Complexity: O(V + E)
Space Complexity: O(V) hash map & queue
"""

from collections import deque
from typing import Optional, List

class Node:
    def __init__(self, val: int = 0, neighbors: Optional[List['Node']] = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None

        visited = {}
        queue = deque([node])

        cloned_root = Node(node.val)
        visited[node] = cloned_root

        while queue:
            curr = queue.popleft()

            for neighbor in curr.neighbors:
                if neighbor not in visited:
                    visited[neighbor] = Node(neighbor.val)
                    queue.append(neighbor)
                visited[curr].neighbors.append(visited[neighbor])

        return cloned_root

if __name__ == "__main__":
    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n4 = Node(4)

    n1.neighbors = [n2, n4]
    n2.neighbors = [n1, n3]
    n3.neighbors = [n2, n4]
    n4.neighbors = [n1, n3]

    sol = Solution()
    cloned = sol.cloneGraph(n1)

    print("Root cloned val:", cloned.val if cloned else None)
    print("Cloned root neighbors count:", len(cloned.neighbors) if cloned else None)
    print("Is root distinct instance:", cloned is not n1)  # True
