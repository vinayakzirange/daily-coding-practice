"""
Problem Name: Binary Tree Level Order Traversal
Problem Statement: Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

Approach: Breadth-First Search (BFS) using a Queue. Process level by level using queue size.

Time Complexity: O(N)
Space Complexity: O(W) where W is max width of the tree
"""

from collections import deque
from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    @staticmethod
    def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
        result = []
        if not root:
            return result

        queue = deque([root])
        while queue:
            level_size = len(queue)
            current_level = []
            for _ in range(level_size):
                node = queue.popleft()
                current_level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            result.append(current_level)

        return result

if __name__ == "__main__":
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20, TreeNode(15), TreeNode(7))
    print("Level Order Traversal:", Solution.levelOrder(root))  # Expected: [[3], [9, 20], [15, 7]]
