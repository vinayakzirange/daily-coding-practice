"""
Problem: Number of Operations to Make Network Connected (LeetCode 1319)
Difficulty: Medium
Language: Python

There are n computers numbered from 0 to n - 1 and an array of connections
where connections[i] = [ai, bi] represents a connection between computers ai and bi.

Any computer can reach any other computer directly or indirectly through the network.
You are given an initial computer network connections. You can extract certain cables connected
between two computers and place them between any pair of disconnected computers to make them
directly connected.

Return the minimum number of times you need to do this in order to make all the computers connected.
If it is not possible, return -1.

Example 1:
    Input: n = 4, connections = [[0,1],[0,2],[1,2]]
    Output: 1
    Explanation: Remove cable between [1,2] and place between [1,3].

Example 2:
    Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
    Output: 2

Example 3:
    Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
    Output: -1
    Explanation: There are not enough cables.

Constraints:
    1 <= n <= 10^5
    1 <= connections.length <= min(n * (n - 1) / 2, 10^5)
    connections[i].length == 2
    0 <= ai, bi < n
    ai != bi
    There are no repeated connections.
"""

from typing import List


class Solution:
    def makeConnected(self, n: int, connections: List[List[int]]) -> int:
        """
        Determines minimum cable rearrangements to connect all computers using Disjoint Set Union (Union-Find).
        
        Complexity:
            Time: O(N + E * alpha(N)) where E = len(connections) and alpha is inverse Ackermann function.
            Space: O(N) for parent and rank arrays.
        """
        # A spanning forest on n vertices requires at least n - 1 edges
        if len(connections) < n - 1:
            return -1

        parent = list(range(n))
        rank = [0] * n
        components = n

        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x: int, y: int) -> bool:
            root_x, root_y = find(x), find(y)
            if root_x == root_y:
                return False

            if rank[root_x] < rank[root_y]:
                parent[root_x] = root_y
            elif rank[root_x] > rank[root_y]:
                parent[root_y] = root_x
            else:
                parent[root_y] = root_x
                rank[root_x] += 1

            return True

        for u, v in connections:
            if union(u, v):
                components -= 1

        # To connect C disconnected components, we need C - 1 cables
        return components - 1


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.makeConnected(4, [[0, 1], [0, 2], [1, 2]]) == 1, "Test 1 Failed"

    # Test 2: Example 2
    assert sol.makeConnected(6, [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]]) == 2, "Test 2 Failed"

    # Test 3: Example 3 (Insufficient cables)
    assert sol.makeConnected(6, [[0, 1], [0, 2], [0, 3], [1, 2]]) == -1, "Test 3 Failed"

    # Test 4: Already fully connected
    assert sol.makeConnected(4, [[0, 1], [1, 2], [2, 3]]) == 0, "Test 4 Failed"

    # Test 5: Single node
    assert sol.makeConnected(1, []) == 0, "Test 5 Failed"

    print("All Number of Operations to Make Network Connected tests passed successfully!")
