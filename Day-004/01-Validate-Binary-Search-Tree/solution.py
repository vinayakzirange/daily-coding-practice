"""
Problem Name: Validate Binary Search Tree
Problem Statement: Given the root of a binary tree, determine if it is a valid binary search tree (BST).

Approach: Recursively validate using minimum and maximum allowable bounds (min < val < max).

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
    def isValidBST(root: Optional[TreeNode]) -> bool:
        def validate(node, low=float('-inf'), high=float('inf')):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)
        return validate(root)

if __name__ == "__main__":
    root = TreeNode(2)
    root.left = TreeNode(1)
    root.right = TreeNode(3)
    print("Is Valid BST:", Solution.isValidBST(root))  # Expected: True
