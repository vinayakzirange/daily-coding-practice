r"""
LeetCode 802: Find Eventual Safe States (Medium)
https://leetcode.com/problems/find-eventual-safe-states/

There is a directed graph of n nodes with each node labeled from 0 to n - 1.
The graph is represented by a 0-indexed 2D integer array graph where graph[i]
is an integer array of nodes adjacent to node i.

A node is a terminal node if there are no outgoing edges. A node is a safe node
if every possible path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be
sorted in ascending order.

Example 1:
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]

Example 2:
Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]

Constraints:
- n == graph.length
- 1 <= n <= 10^4
- 0 <= graph[i].length <= n
- 0 <= graph[i][j] <= n - 1
- graph[i] is sorted in a strictly increasing order.
- The graph may contain self-loops.
- The number of edges in the graph will be in the range [1, 4 * 10^4].
"""

from typing import List


class Solution:
    def eventualSafeNodes(self, graph: List[List[int]]) -> List[int]:
        """
        3-Color DFS Cycle Detection:
        State:
          0 = unvisited
          1 = visiting (on active DFS stack - cycle detected if encountered)
          2 = safe (all outgoing paths terminate at safe nodes)

        Time Complexity: O(V + E)
        Space Complexity: O(V) for color array and recursion stack
        """
        n = len(graph)
        color = [0] * n  # 0: unvisited, 1: visiting, 2: safe

        def is_safe(u: int) -> bool:
            if color[u] != 0:
                return color[u] == 2

            color[u] = 1  # mark visiting
            for v in graph[u]:
                if color[v] == 1 or not is_safe(v):
                    return False

            color[u] = 2  # mark safe
            return True

        return [i for i in range(n) if is_safe(i)]


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1
    graph1 = [[1, 2], [2, 3], [5], [0], [5], [], []]
    res1 = sol.eventualSafeNodes(graph1)
    assert res1 == [2, 4, 5, 6], f"Test 1 Failed: {res1} != [2, 4, 5, 6]"

    # Test Case 2
    graph2 = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]
    res2 = sol.eventualSafeNodes(graph2)
    assert res2 == [4], f"Test 2 Failed: {res2} != [4]"

    # Test Case 3: Empty graph / single terminal node
    graph3 = [[]]
    res3 = sol.eventualSafeNodes(graph3)
    assert res3 == [0], f"Test 3 Failed: {res3} != [0]"

    # Test Case 4: Disconnected with self loop
    graph4 = [[0], []]
    res4 = sol.eventualSafeNodes(graph4)
    assert res4 == [1], f"Test 4 Failed: {res4} != [1]"

    print("All tests passed for Find Eventual Safe States!")
