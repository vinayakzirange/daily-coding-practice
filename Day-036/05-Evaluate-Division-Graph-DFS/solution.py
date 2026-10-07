"""
Problem: Evaluate Division (LeetCode 399)
Difficulty: Medium
Topic: Graph / Depth-First Search / Breadth-First Search / Union-Find

Description:
You are given an array of variable pairs equations and an array of real numbers values,
where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i].
Each Ai or Bi is a string representing a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query
where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid. You may assume that evaluating the queries will not
result in division by zero and that there is no contradiction.

Example 1:
Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0],
queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]

Example 2:
Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0],
queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]

Example 3:
Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]

Constraints:
  * 1 <= equations.length <= 20
  * equations[i].length == 2
  * 1 <= |Ai|, |Bi| <= 5
  * values.length == equations.length
  * 0.0 < values[i] <= 20.0
  * 1 <= queries.length <= 20
  * queries[i].length == 2
  * 1 <= |Cj|, |Dj| <= 5
  * Ai, Bi, Cj, Dj consist of lower case English letters and digits.

Complexity:
  * Time Complexity: O(Q * (V + E)) where Q is len(queries), V is number of unique variables, E is len(equations).
  * Space Complexity: O(V + E) for the graph representation.
"""

from collections import defaultdict
from typing import List


class Solution:
    def calcEquation(
        self,
        equations: List[List[str]],
        values: List[float],
        queries: List[List[str]],
    ) -> List[float]:
        # Build graph: graph[u] = {v: weight} representing u / v = weight
        graph = defaultdict(dict)
        for (u, v), val in zip(equations, values):
            graph[u][v] = val
            graph[v][u] = 1.0 / val

        def dfs(start: str, target: str, visited: set) -> float:
            if start not in graph or target not in graph:
                return -1.0
            if start == target:
                return 1.0

            visited.add(start)
            for neighbor, weight in graph[start].items():
                if neighbor not in visited:
                    res = dfs(neighbor, target, visited)
                    if res != -1.0:
                        return weight * res

            return -1.0

        results = []
        for c, d in queries:
            results.append(dfs(c, d, set()))

        return results


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    eq1 = [["a", "b"], ["b", "c"]]
    val1 = [2.0, 3.0]
    q1 = [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]]
    res1 = sol.calcEquation(eq1, val1, q1)
    exp1 = [6.0, 0.5, -1.0, 1.0, -1.0]

    for r, e in zip(res1, exp1):
        assert abs(r - e) < 1e-5, f"Expected {e}, got {r}"
    print(f"Test 1 Passed: queries evaluated correctly: {res1}")

    eq2 = [["a", "b"]]
    val2 = [0.5]
    q2 = [["a", "b"], ["b", "a"], ["a", "c"], ["x", "y"]]
    res2 = sol.calcEquation(eq2, val2, q2)
    exp2 = [0.5, 2.0, -1.0, -1.0]
    for r, e in zip(res2, exp2):
        assert abs(r - e) < 1e-5, f"Expected {e}, got {r}"
    print(f"Test 2 Passed: queries evaluated correctly: {res2}")

    print("\nAll Evaluate Division tests passed successfully!")
