"""
Problem: Number of Provinces (LeetCode 547)
Language: Python
Difficulty: Medium
Time Complexity: O(N^2 * alpha(N))
Space Complexity: O(N) Union-Find parent array
"""

from typing import List

class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n

    def find(self, p: int) -> int:
        if self.parent[p] != p:
            self.parent[p] = self.find(self.parent[p])
        return self.parent[p]

    def union(self, p: int, q: int) -> bool:
        root_p = self.find(p)
        root_q = self.find(q)
        if root_p == root_q:
            return False

        if self.rank[root_p] < self.rank[root_q]:
            self.parent[root_p] = root_q
        elif self.rank[root_p] > self.rank[root_q]:
            self.parent[root_q] = root_p
        else:
            self.parent[root_q] = root_p
            self.rank[root_p] += 1
        self.count -= 1
        return True

class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        uf = UnionFind(n)

        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j] == 1:
                    uf.union(i, j)

        return uf.count

if __name__ == "__main__":
    sol = Solution()
    grid1 = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 1]
    ]
    print("Number of Provinces (Grid 1):", sol.findCircleNum(grid1))  # 2

    grid2 = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ]
    print("Number of Provinces (Grid 2):", sol.findCircleNum(grid2))  # 3
