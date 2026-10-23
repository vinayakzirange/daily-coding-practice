"""
====================================================================
Problem: Minimum Height Trees (LeetCode 310)
Difficulty: Medium
Topic: Depth-First Search, Breadth-First Search, Graph, Topological Sort
====================================================================

A tree is an undirected graph in which any two vertices are connected by
exactly one path. In other words, any connected graph without simple cycles
is a tree.

Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1
edges where edges[i] = [a_i, b_i] indicates that there is an undirected
edge between the two nodes a_i and b_i in the tree, you can choose any node
of the tree as the root. When you select a node x as the root, the result
tree has height h. Among all possible rooted trees, those with minimum height
are called minimum height trees (MHTs).

Return a list of all MHTs' root labels. You can return the answer in any order.

The height of a rooted tree is the number of edges on the longest downward
path between the root and a leaf.

Example 1:
Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the
node with label 1 which is the only MHT.

Example 2:
Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]

Constraints:
- 1 <= n <= 2 * 10^4
- edges.length == n - 1
- 0 <= a_i, b_i < n
- a_i != b_i
- All the pairs (a_i, b_i) are distinct.
- The given input is guaranteed to be a tree and there will be no repeated edges.
====================================================================
"""

from typing import List
from collections import deque

class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        """
        Topological Sort / Onion Peeling:
        For any tree, there can be at most 2 centroids (roots of MHTs).
        We iteratively trim all leaves (degree == 1) layer by layer until
        <= 2 nodes remain. The remaining nodes are the roots of the MHTs.

        Time Complexity: O(n) each node and edge processed constant times
        Space Complexity: O(n) for adjacency set representation
        """
        if n <= 2:
            return list(range(n))

        # Build adjacency graph
        adj = [set() for _ in range(n)]
        for u, v in edges:
            adj[u].add(v)
            adj[v].add(u)

        # Initialize leaves
        leaves = deque([i for i in range(n) if len(adj[i]) == 1])

        remaining_nodes = n
        while remaining_nodes > 2:
            leaves_count = len(leaves)
            remaining_nodes -= leaves_count

            for _ in range(leaves_count):
                leaf = leaves.popleft()
                neighbor = adj[leaf].pop()
                adj[neighbor].remove(leaf)

                if len(adj[neighbor]) == 1:
                    leaves.append(neighbor)

        return list(leaves)


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: n = 4, edges = [[1,0],[1,2],[1,3]] -> [1]
    res1 = solver.findMinHeightTrees(4, [[1, 0], [1, 2], [1, 3]])
    assert res1 == [1], f"Test 1 failed: {res1}"
    print(f"Test 1 Passed: n=4 -> {res1}")

    # Test 2: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]] -> [3, 4]
    res2 = sorted(solver.findMinHeightTrees(6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]))
    assert res2 == [3, 4], f"Test 2 failed: {res2}"
    print(f"Test 2 Passed: n=6 -> {res2}")

    # Test 3: n = 1, edges = [] -> [0]
    res3 = solver.findMinHeightTrees(1, [])
    assert res3 == [0], f"Test 3 failed: {res3}"
    print(f"Test 3 Passed: n=1 -> {res3}")

    # Test 4: n = 2, edges = [[0,1]] -> [0, 1]
    res4 = sorted(solver.findMinHeightTrees(2, [[0, 1]]))
    assert res4 == [0, 1], f"Test 4 failed: {res4}"
    print(f"Test 4 Passed: n=2 -> {res4}")

    # Test 5: Linear chain: 0 - 1 - 2 - 3 - 4 -> center is [2]
    res5 = solver.findMinHeightTrees(5, [[0, 1], [1, 2], [2, 3], [3, 4]])
    assert res5 == [2], f"Test 5 failed: {res5}"
    print(f"Test 5 Passed: linear chain 5 nodes -> {res5}")

    print("\nAll Minimum Height Trees tests passed successfully!")
