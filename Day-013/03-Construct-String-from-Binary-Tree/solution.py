"""
Problem: Construct String from Binary Tree
Topic: Binary Tree / DFS Preorder
Language: Python

Approach:
Recursively perform preorder traversal. Omit empty parenthesis pairs except when right child
exists and left child is None (to preserve 1-to-1 relationship).

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
    def tree2str(root: Optional[TreeNode]) -> str:
        if not root:
            return ""
        if not root.left and not root.right:
            return str(root.val)
        if not root.right:
            return f"{root.val}({Solution.tree2str(root.left)})"
        return f"{root.val}({Solution.tree2str(root.left)})({Solution.tree2str(root.right)})"

if __name__ == "__main__":
    root = TreeNode(1, TreeNode(2, TreeNode(4)), TreeNode(3))
    print("Tree to String ->", Solution.tree2str(root))  # 1(2(4))(3)
