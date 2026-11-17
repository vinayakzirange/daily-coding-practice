"""
Problem: Reorder Routes to Make All Paths Lead to the City Zero (LeetCode 1466)
Difficulty: Medium
Category: Graph / Depth-First Search / Tree

Description:
There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only
one way to travel between two different cities (this network forms a tree). Last year,
The ministry of transport decided to orient the roads in one direction because they
are too narrow.

Roads are represented by connections where connections[i] = [ai, bi] represents a
directed road from city ai to city bi.

This year, there is a big event in the capital (city 0), and many people want to travel
to this city.

Your task consists of reorienting some roads such that each city can visit the city 0.
Return the minimum number of edges changed.

It's guaranteed that each city can reach city 0 after reordering.

Example 1:
    Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
    Output: 3
    Explanation: Change the direction of edges show in red such that each node can reach the node 0:
                 [0,1] -> [1,0]
                 [1,3] -> [3,1]
                 [4,5] -> [5,4]

Example 2:
    Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
    Output: 2

Example 3:
    Input: n = 3, connections = [[1,0],[2,0]]
    Output: 0

Constraints:
    - 2 <= n <= 5 * 10^4
    - connections.length == n - 1
    - connections[i].length == 2
    - 0 <= ai, bi <= n - 1
    - ai != bi
"""

from typing import List


class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        """
        Calculates the minimum road reorientations required so all cities lead to city 0.

        Simple Graph Traversal:
        Treat the network as an undirected tree rooted at 0.
        For each directed edge u -> v:
            - Traversal from u to v goes away from 0 (needs flip, cost = 1).
            - Traversal from v to u goes towards 0 (already correct, cost = 0).

        Starting from city 0, traverse the entire tree. Any time we move along
        an edge in the original direction, that edge must be flipped.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append((v, 1))  # 1 indicates original forward edge
            adj[v].append((u, 0))  # 0 indicates synthetic reverse edge

        visited = [False] * n
        changes = 0

        # Iterative or recursive DFS
        stack = [0]
        visited[0] = True

        while stack:
            curr = stack.pop()
            for neighbor, cost in adj[curr]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    changes += cost
                    stack.append(neighbor)

        return changes


def run_tests():
    sol = Solution()

    # Test 1: Example 1
    assert sol.minReorder(6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]) == 3, "Test 1 Failed"

    # Test 2: Example 2
    assert sol.minReorder(5, [[1, 0], [1, 2], [3, 2], [3, 4]]) == 2, "Test 2 Failed"

    # Test 3: Example 3 (all roads already lead to 0)
    assert sol.minReorder(3, [[1, 0], [2, 0]]) == 0, "Test 3 Failed"

    # Test 4: Single road away from 0
    assert sol.minReorder(2, [[0, 1]]) == 1, "Test 4 Failed"

    # Test 5: Single road toward 0
    assert sol.minReorder(2, [[1, 0]]) == 0, "Test 5 Failed"

    print("All tests passed for 05-Reorder-Routes-to-Make-All-Paths-Lead-to-the-City-Zero-DFS!")


if __name__ == "__main__":
    run_tests()
