"""
Problem: Subtree of Another Tree
Topic: Binary Tree / Tree Matching
Language: Python

Approach:
For every node in root, check if the tree rooted at that node is identical to subRoot
using an is_same_tree helper function.

Time Complexity: O(N * M)
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
    def isSubtree(root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not root:
            return False

        def is_same_tree(s: Optional[TreeNode], t: Optional[TreeNode]) -> bool:
            if not s and not t:
                return True
            if not s or not t:
                return False
            if s.val != t.val:
                return False
            return is_same_tree(s.left, t.left) and is_same_tree(s.right, t.right)

        if is_same_tree(root, subRoot):
            return True
        return Solution.isSubtree(root.left, subRoot) or Solution.isSubtree(root.right, subRoot)

if __name__ == "__main__":
    root = TreeNode(3, TreeNode(4, TreeNode(1), TreeNode(2)), TreeNode(5))
    sub_root = TreeNode(4, TreeNode(1), TreeNode(2))
    print("Is Subtree ->", Solution.isSubtree(root, sub_root))  # True
