"""
Problem Name: Binary Tree Inorder Traversal
Problem Statement: Given the root of a binary tree, return the inorder traversal of its nodes' values.

Approach: Recursive Traversal (Left -> Root -> Right).

Time Complexity: O(N)
Space Complexity: O(H) where H is tree height (stack space)
"""

from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    @staticmethod
    def inorderTraversal(root: Optional[TreeNode]) -> List[int]:
        result = []
        def helper(node):
            if not node:
                return
            helper(node.left)
            result.append(node.val)
            helper(node.right)
        helper(root)
        return result

if __name__ == "__main__":
    root = TreeNode(1)
    root.right = TreeNode(2)
    root.right.left = TreeNode(3)
    print("Inorder Traversal:", Solution.inorderTraversal(root))  # Expected: [1, 3, 2]
