"""
Problem: Invert Binary Tree
Topic: Binary Tree / DFS
Language: Python

Approach:
Recursively swap left and right child nodes for every node in the binary tree.

Time Complexity: O(N)
Space Complexity: O(H) where H is tree height
"""

from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    @staticmethod
    def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = Solution.invertTree(root.right), Solution.invertTree(root.left)
        return root

if __name__ == "__main__":
    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7, TreeNode(6), TreeNode(9)))
    inverted = Solution.invertTree(root)
    print("Inverted root left val:", inverted.left.val if inverted and inverted.left else None)  # 7
    print("Inverted root right val:", inverted.right.val if inverted and inverted.right else None)  # 2
