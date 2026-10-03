"""
Problem: Cheapest Flights Within K Stops (LeetCode 787)
Language: Python
Difficulty: Medium
Time Complexity: O(K * E)
Space Complexity: O(V)
"""

from typing import List

class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        dist = [float('inf')] * n
        dist[src] = 0

        for _ in range(k + 1):
            temp = list(dist)
            for u, v, w in flights:
                if dist[u] != float('inf') and dist[u] + w < temp[v]:
                    temp[v] = dist[u] + w
            dist = temp

        return dist[dst] if dist[dst] != float('inf') else -1

if __name__ == "__main__":
    sol = Solution()
    flights = [[0, 1, 100], [1, 2, 100], [0, 2, 500]]
    print("Cheapest Price (k=1):", sol.findCheapestPrice(3, flights, 0, 2, 1))  # 200
    print("Cheapest Price (k=0):", sol.findCheapestPrice(3, flights, 0, 2, 0))  # 500
