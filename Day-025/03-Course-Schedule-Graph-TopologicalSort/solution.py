"""
Problem: Course Schedule (LeetCode 207)
Language: Python
Difficulty: Medium
Time Complexity: O(V + E)
Space Complexity: O(V + E)
"""

from collections import deque, defaultdict
from typing import List

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = defaultdict(list)
        in_degree = [0] * numCourses

        for dest, src in prerequisites:
            adj[src].append(dest)
            in_degree[dest] += 1

        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        count = 0

        while queue:
            course = queue.popleft()
            count += 1
            for next_course in adj[course]:
                in_degree[next_course] -= 1
                if in_degree[next_course] == 0:
                    queue.append(next_course)

        return count == numCourses

if __name__ == "__main__":
    sol = Solution()
    print("Can finish 2 courses {{1,0}}:", sol.canFinish(2, [[1, 0]]))          # True
    print("Can finish 2 courses {{1,0},{0,1}}:", sol.canFinish(2, [[1, 0], [0, 1]]))  # False
