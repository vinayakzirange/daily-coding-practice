"""
Problem: All Paths From Source to Target (LeetCode 797)
Difficulty: Medium
Topic: Graph / Depth-First Search / Backtracking / Directed Acyclic Graph

Description:
Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible
paths from node 0 to node n - 1 and return them in any order.

The graph is given as follows: graph[i] is a list of all nodes you can visit from node i
(i.e., there is a directed edge from node i to node graph[i][j]).

Example 1:
Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

Example 2:
Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

Constraints:
  * n == graph.length
  * 2 <= n <= 15
  * 0 <= graph[i][j] < n
  * graph[i][j] != i (no self-loops)
  * All elements of graph[i] are unique.
  * The input graph is guaranteed to be a DAG.

Complexity:
  * Time Complexity: O(2^(V - 1) * V) - In the worst-case DAG, there can be 2^(V-1) paths, each taking O(V) to copy.
  * Space Complexity: O(V) auxiliary recursion stack space.
"""

from typing import List


class Solution:
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        target = len(graph) - 1
        result = []
        path = [0]

        def dfs(node: int) -> None:
            if node == target:
                result.append(list(path))
                return

            for neighbor in graph[node]:
                path.append(neighbor)
                dfs(neighbor)
                path.pop()  # Backtrack

        dfs(0)
        return result


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([[1, 2], [3], [3], []], [[0, 1, 3], [0, 2, 3]]),
        ([[4, 3, 1], [3, 2, 4], [3], [4], []], [[0, 4], [0, 3, 4], [0, 1, 3, 4], [0, 1, 2, 3, 4], [0, 1, 4]]),
        ([[1], []], [[0, 1]]),
        ([[1, 2, 3], [2, 3], [3], []], [[0, 1, 2, 3], [0, 1, 3], [0, 2, 3], [0, 3]]),
    ]

    for idx, (graph, expected) in enumerate(test_cases, 1):
        result = sol.allPathsSourceTarget(graph)
        assert sorted(result) == sorted(expected), f"Test {idx} failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: graph size {len(graph)} -> {len(result)} paths: {result}")

    print("\nAll All Paths From Source to Target tests passed successfully!")
