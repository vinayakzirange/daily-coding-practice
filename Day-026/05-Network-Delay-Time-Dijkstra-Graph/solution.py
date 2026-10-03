"""
Problem: Network Delay Time (LeetCode 743)
Language: Python
Difficulty: Medium
Time Complexity: O(E log V)
Space Complexity: O(V + E)
"""

import heapq
from collections import defaultdict
from typing import List

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        graph = defaultdict(list)
        for u, v, w in times:
            graph[u].append((v, w))

        pq = [(0, k)]
        dist = {}

        while pq:
            d, node = heapq.heappop(pq)
            if node in dist:
                continue
            dist[node] = d

            for next_node, weight in graph[node]:
                if next_node not in dist:
                    heapq.heappush(pq, (d + weight, next_node))

        return max(dist.values()) if len(dist) == n else -1

if __name__ == "__main__":
    sol = Solution()
    times = [[2, 1, 1], [2, 3, 1], [3, 4, 1]]
    print("Output (n=4, k=2):", sol.networkDelayTime(times, 4, 2))  # 2
