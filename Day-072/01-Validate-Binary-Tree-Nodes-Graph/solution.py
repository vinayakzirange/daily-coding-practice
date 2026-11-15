"""
Problem: Validate Binary Tree Nodes (LeetCode 1361)
Difficulty: Medium
Category: Graph / Binary Tree / Depth-First Search / Breadth-First Search / Union Find

Description:
You have n binary tree nodes numbered from 0 to n - 1 where node i has two children
leftChild[i] and rightChild[i].

Return true if and only if all the given nodes form exactly one valid binary tree.

If node i has no left child, then leftChild[i] == -1, and similarly for rightChild[i].

Note that the nodes have no values and that we only use the node numbers in this problem.

Example 1:
    Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,-1,-1,-1]
    Output: true

Example 2:
    Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,3,-1,-1]
    Output: false

Example 3:
    Input: n = 2, leftChild = [1,0], rightChild = [-1,-1]
    Output: false

Constraints:
    - n == leftChild.length == rightChild.length
    - 1 <= n <= 10^4
    - -1 <= leftChild[i], rightChild[i] <= n - 1
"""

from typing import List
from collections import deque


class Solution:
    def validateBinaryTreeNodes(self, n: int, leftChild: List[int], rightChild: List[int]) -> bool:
        """
        Validates whether the given child pointers form a single valid binary tree.

        Key properties of a valid binary tree with n nodes:
        1. Exactly one root node with in-degree 0.
        2. Every other node has in-degree exactly 1.
        3. No cycles and the graph is connected (all n nodes visited from root).

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        in_degree = [0] * n

        # Count in-degrees
        for i in range(n):
            for child in (leftChild[i], rightChild[i]):
                if child != -1:
                    in_degree[child] += 1
                    if in_degree[child] > 1:
                        # A child node cannot have more than 1 parent
                        return False

        # Identify candidate root (in-degree == 0)
        root = -1
        for i in range(n):
            if in_degree[i] == 0:
                if root != -1:
                    # More than one root means multiple disjoint components
                    return False
                root = i

        if root == -1:
            # Cycle among all nodes (no root exists)
            return False

        # Traverse starting from root to ensure all n nodes are reachable
        visited = set()
        queue = deque([root])
        visited.add(root)

        while queue:
            curr = queue.popleft()
            for child in (leftChild[curr], rightChild[curr]):
                if child != -1:
                    if child in visited:
                        # Cycle detected
                        return False
                    visited.add(child)
                    queue.append(child)

        return len(visited) == n


def run_tests():
    sol = Solution()

    # Test 1: Standard single valid binary tree
    assert sol.validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, -1, -1, -1]) is True, "Test 1 Failed"

    # Test 2: Node 3 has two parents (node 0 and node 2)
    assert sol.validateBinaryTreeNodes(4, [1, -1, 3, -1], [2, 3, -1, -1]) is False, "Test 2 Failed"

    # Test 3: Cycle between node 0 and node 1
    assert sol.validateBinaryTreeNodes(2, [1, 0], [-1, -1]) is False, "Test 3 Failed"

    # Test 4: Single isolated node
    assert sol.validateBinaryTreeNodes(1, [-1], [-1]) is True, "Test 4 Failed"

    # Test 5: Multiple disconnected trees (forest)
    assert sol.validateBinaryTreeNodes(6, [1, -1, -1, 4, -1, -1], [2, -1, -1, 5, -1, -1]) is False, "Test 5 Failed"

    # Test 6: Cycle with a dangling node
    assert sol.validateBinaryTreeNodes(4, [3, -1, 1, -1], [-1, -1, 0, -1]) is True, "Test 6 Failed"

    print("All tests passed for 01-Validate-Binary-Tree-Nodes-Graph!")


if __name__ == "__main__":
    run_tests()
