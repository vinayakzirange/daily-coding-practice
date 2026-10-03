"""
Problem: Minimum Absolute Difference in BST
Topic: Binary Search Tree / Inorder Traversal
Language: Python

Approach:
Inorder traversal of a BST yields values in sorted order.
Maintain a 'prev' pointer to track previous node value and calculate min difference.

Time Complexity: O(N)
Space Complexity: O(H) recursion stack
"""

from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    @staticmethod
    def getMinimumDifference(root: Optional[TreeNode]) -> int:
        min_diff = float('inf')
        prev = None

        def inorder(node):
            nonlocal min_diff, prev
            if not node:
                return
            inorder(node.left)
            if prev is not None:
                min_diff = min(min_diff, node.val - prev)
            prev = node.val
            inorder(node.right)

        inorder(root)
        return int(min_diff)

if __name__ == "__main__":
    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(6))
    print("Min Difference in BST ->", Solution.getMinimumDifference(root))  # 1
