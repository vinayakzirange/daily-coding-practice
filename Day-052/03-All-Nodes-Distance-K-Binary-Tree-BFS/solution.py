"""
====================================================================
Problem: All Nodes Distance K in Binary Tree (LeetCode 863)
Difficulty: Medium
Topic: Tree, Depth-First Search, Breadth-First Search, Binary Tree
====================================================================

Given the root of a binary tree, the value of a target node target,
and an integer k, return an array of the values of all nodes that have
a distance k from the target node.

You can return the answer in any order.

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [7,4,1]
Explanation: The nodes that are a distance 2 from the target node
(with value 5) have values 7, 4, and 1.

Example 2:
Input: root = [1], target = 1, k = 3
Output: []

Constraints:
- The number of nodes in the tree is in the range [1, 500].
- 0 <= Node.val <= 500
- All the values Node.val are unique.
- target is the value of one of the nodes in the tree.
- 0 <= k <= 1000
====================================================================
"""

from typing import List
from collections import deque

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, k: int) -> List[int]:
        """
        Graph Transformation + BFS:
        1. Traverse tree with DFS to map each child node to its parent,
           turning the directed tree into an undirected graph.
        2. Perform BFS starting from the target node, exploring left, right,
           and parent neighbors up to distance k.

        Time Complexity: O(n) visiting each node once for parent mapping and BFS
        Space Complexity: O(n) for parent map, visited set, and BFS queue
        """
        if not root or not target:
            return []
        if k == 0:
            return [target.val]

        # Step 1: Map child -> parent
        parent_map = {}

        def map_parents(node: TreeNode, parent: TreeNode):
            if not node:
                return
            if parent:
                parent_map[node] = parent
            map_parents(node.left, node)
            map_parents(node.right, node)

        map_parents(root, None)

        # Step 2: BFS from target
        queue = deque([(target, 0)])
        visited = {target}
        result = []

        while queue:
            node, dist = queue.popleft()

            if dist == k:
                result.append(node.val)
            elif dist < k:
                for neighbor in (node.left, node.right, parent_map.get(node)):
                    if neighbor and neighbor not in visited:
                        visited.add(neighbor)
                        queue.append((neighbor, dist + 1))

        return result


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Build Tree:
    #             3
    #           /   \
    #          5     1
    #         / \   / \
    #        6   2 0   8
    #           / \
    #          7   4
    n3 = TreeNode(3)
    n5 = TreeNode(5)
    n1 = TreeNode(1)
    n6 = TreeNode(6)
    n2 = TreeNode(2)
    n0 = TreeNode(0)
    n8 = TreeNode(8)
    n7 = TreeNode(7)
    n4 = TreeNode(4)

    n3.left, n3.right = n5, n1
    n5.left, n5.right = n6, n2
    n1.left, n1.right = n0, n8
    n2.left, n2.right = n7, n4

    # Test 1: target = 5, k = 2 -> [7, 4, 1]
    res1 = sorted(solver.distanceK(n3, n5, 2))
    assert res1 == [1, 4, 7], f"Test 1 failed: {res1}"
    print(f"Test 1 Passed: target=5, k=2 -> {res1}")

    # Test 2: target = 1, k = 3 -> []
    single_node = TreeNode(1)
    res2 = solver.distanceK(single_node, single_node, 3)
    assert res2 == [], f"Test 2 failed: {res2}"
    print(f"Test 2 Passed: single node, k=3 -> {res2}")

    # Test 3: target = 3 (root), k = 1 -> [5, 1]
    res3 = sorted(solver.distanceK(n3, n3, 1))
    assert res3 == [1, 5], f"Test 3 failed: {res3}"
    print(f"Test 3 Passed: target=3, k=1 -> {res3}")

    # Test 4: target = 5, k = 0 -> [5]
    res4 = solver.distanceK(n3, n5, 0)
    assert res4 == [5], f"Test 4 failed: {res4}"
    print(f"Test 4 Passed: target=5, k=0 -> {res4}")

    print("\nAll All Nodes Distance K in Binary Tree tests passed successfully!")
