"""
Problem Name: Graph Valid Tree
Problem Statement: Given n nodes labeled from 0 to n - 1 and a list of undirected edges, write a function to check
whether these edges make up a valid tree.

Approach: Disjoint Set Union (Union-Find).
A graph of n nodes is a valid tree if and only if it has exactly n - 1 edges and contains no cycles.

Time Complexity: O(N * alpha(N)) ~ O(N)
Space Complexity: O(N) for parent array
"""

from typing import List

class Solution:
    @staticmethod
    def validTree(n: int, edges: List[List[int]]) -> bool:
        if len(edges) != n - 1:
            return False

        parent = list(range(n))

        def find(node: int) -> int:
            if parent[node] == node:
                return node
            parent[node] = find(parent[node])
            return parent[node]

        for u, v in edges:
            root1 = find(u)
            root2 = find(v)
            if root1 == root2:
                return False  # Cycle detected
            parent[root1] = root2

        return True

if __name__ == "__main__":
    edges1 = [[0, 1], [0, 2], [0, 3], [1, 4]]
    print("Is Valid Tree (5 nodes, 4 edges):", Solution.validTree(5, edges1))  # Expected: True

    edges2 = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]
    print("Is Valid Tree (5 nodes with cycle):", Solution.validTree(5, edges2))  # Expected: False
