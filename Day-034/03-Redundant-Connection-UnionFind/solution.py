"""
Problem: Redundant Connection (LeetCode 684)
Difficulty: Medium
Topic: Graph / Disjoint Set Union (Union-Find) / Cycle Detection

Description:
In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one
additional edge added. The added edge has two different vertices chosen from 1 to n, and
was not an edge that already existed. The graph is represented as an array edges of length n
where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there
are multiple answers, return the answer that occurs last in the input.

Example 1:
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]

Example 2:
Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]

Constraints:
  * n == edges.length
  * 3 <= n <= 1000
  * edges[i].length == 2
  * 1 <= ai < bi <= edges.length
  * ai != bi
  * There are no repeated edges.
  * The given graph is connected.

Complexity:
  * Time Complexity: O(n * alpha(n)) ≈ O(n) using path compression and union by rank.
  * Space Complexity: O(n) for parent and rank arrays.
"""

from typing import List


class UnionFind:
    def __init__(self, size: int):
        self.parent = list(range(size + 1))
        self.rank = [1] * (size + 1)

    def find(self, u: int) -> int:
        if self.parent[u] != u:
            self.parent[u] = self.find(self.parent[u])  # Path compression
        return self.parent[u]

    def union(self, u: int, v: int) -> bool:
        root_u = self.find(u)
        root_v = self.find(v)

        if root_u == root_v:
            return False  # Already in the same connected component -> cycle!

        # Union by rank
        if self.rank[root_u] < self.rank[root_v]:
            self.parent[root_u] = root_v
        elif self.rank[root_u] > self.rank[root_v]:
            self.parent[root_v] = root_u
        else:
            self.parent[root_v] = root_u
            self.rank[root_u] += 1

        return True


class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        uf = UnionFind(n)

        for u, v in edges:
            # If u and v are already connected, this edge creates a cycle and is redundant
            if not uf.union(u, v):
                return [u, v]

        return []


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([[1, 2], [1, 3], [2, 3]], [2, 3]),
        ([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]], [1, 4]),
        ([[1, 4], [3, 4], [1, 3], [1, 2], [4, 5]], [1, 3]),
        ([[1, 2], [2, 3], [3, 1]], [3, 1]),
    ]

    for idx, (edges, expected) in enumerate(test_cases, 1):
        result = sol.findRedundantConnection(edges)
        assert result == expected, f"Test {idx} failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: edges={edges} -> redundant edge = {result}")

    print("\nAll Redundant Connection tests passed successfully!")
