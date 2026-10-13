"""
Problem: Course Schedule (LeetCode 207)
Difficulty: Medium
Topic: Depth-First Search / Breadth-First Search / Graph / Topological Sort

Description:
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
You are given an array prerequisites where prerequisites[i] = [a_i, b_i] indicates that
you must take course b_i first if you want to take course a_i.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

Return true if you can finish all courses. Otherwise, return false.

Example 1:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.

Example 2:
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should
also have finished course 1. So it is impossible.

Constraints:
- 1 <= numCourses <= 2000
- 0 <= prerequisites.length <= 5000
- prerequisites[i].length == 2
- 0 <= a_i, b_i < numCourses
- All the pairs prerequisites[i] are unique.

Complexity Analysis:
- Time Complexity: O(V + E) where V = numCourses and E = len(prerequisites).
- Space Complexity: O(V + E) to store the adjacency list and in-degree counts.
"""

from collections import deque
from typing import List


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Build adjacency list and compute in-degrees
        # Edge b -> a means b must be taken before a
        adj = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses

        for dest, src in prerequisites:
            adj[src].append(dest)
            in_degree[dest] += 1

        # Kahn's Algorithm: start with all courses having 0 prerequisites
        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        courses_completed = 0

        while queue:
            node = queue.popleft()
            courses_completed += 1

            for neighbor in adj[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        # If we were able to process all courses, there are no cycles
        return courses_completed == numCourses


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        (2, [[1, 0]], True),
        (2, [[1, 0], [0, 1]], False),
        (4, [[1, 0], [2, 0], [3, 1], [3, 2]], True),
        (3, [[0, 1], [1, 2], [2, 0]], False),
        (1, [], True),
        (5, [[1, 4], [2, 4], [3, 1], [3, 2]], True),
        (4, [[0, 1], [2, 3], [1, 2], [3, 0]], False),
    ]

    for idx, (numCourses, prereqs, expected) in enumerate(test_cases, 1):
        res = sol.canFinish(numCourses, prereqs)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: numCourses={numCourses}, prereqs_count={len(prereqs)} -> canFinish = {res}")

    print("\nAll Course Schedule tests passed successfully!")
