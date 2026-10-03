"""
Problem: Reconstruct Itinerary (LeetCode 332)
Language: Python
Difficulty: Hard / Medium-Hard
Time Complexity: O(E log E) where E is number of tickets
Space Complexity: O(E)
"""

from collections import defaultdict
from typing import List

class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        targets = defaultdict(list)
        for origin, dest in sorted(tickets, reverse=True):
            targets[origin].append(dest)

        route = []

        def visit(airport: str):
            while targets[airport]:
                visit(targets[airport].pop())
            route.append(airport)

        visit("JFK")
        return route[::-1]

if __name__ == "__main__":
    sol = Solution()
    tickets = [
        ["MUC", "LHR"],
        ["JFK", "MUC"],
        ["SFO", "SJC"],
        ["LHR", "SFO"]
    ]
    print("Itinerary:", sol.findItinerary(tickets))  # ['JFK', 'MUC', 'LHR', 'SFO', 'SJC']
