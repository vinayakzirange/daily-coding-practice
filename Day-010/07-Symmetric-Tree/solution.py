"""
Problem Name: Symmetric Tree
Problem Statement: Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

Approach: Recursive check. Two trees are mirror reflection if their roots have same value, and left subtree is mirror of right subtree.

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
    def isSymmetric(root: Optional[TreeNode]) -> bool:
        if not root:
            return True

        def is_mirror(t1: Optional[TreeNode], t2: Optional[TreeNode]) -> bool:
            if not t1 and not t2:
                return True
            if not t1 or not t2:
                return False
            return t1.val == t2.val and is_mirror(t1.left, t2.right) and is_mirror(t1.right, t2.left)

        return is_mirror(root.left, root.right)

if __name__ == "__main__":
    root = TreeNode(1, TreeNode(2, TreeNode(3), TreeNode(4)), TreeNode(2, TreeNode(4), TreeNode(3)))
    print("Is Symmetric:", Solution.isSymmetric(root))  # Expected: True
