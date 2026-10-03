"""
Problem: Gas Station (Circuit Traversal)
Topic: Greedy / Total Accumulator
Language: Python

Approach:
If sum(gas) < sum(cost), circuit completion is impossible, return -1.
Maintain current tank balance 'currentTank'. If currentTank < 0, reset start station to i + 1
and reset currentTank to 0.

Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def canCompleteCircuit(gas: List[int], cost: List[int]) -> int:
        if sum(gas) < sum(cost):
            return -1

        current_tank = 0
        start_index = 0

        for i in range(len(gas)):
            current_tank += gas[i] - cost[i]
            if current_tank < 0:
                start_index = i + 1
                current_tank = 0

        return start_index

if __name__ == "__main__":
    gas = [1, 2, 3, 4, 5]
    cost = [3, 4, 5, 1, 2]
    print("Starting Gas Station ->", Solution.canCompleteCircuit(gas, cost))  # 3
