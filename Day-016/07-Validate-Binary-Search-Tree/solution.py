"""
Problem: Validate Binary Search Tree
Topic: Binary Search Tree / Tree Recursion with Bounds
Language: Python

Approach:
Recursively validate BST properties by passing strict valid ranges [min, max] for each node.
Left child must strictly be inside [min, val-1], right child inside [val+1, max].

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
    def isValidBST(root: Optional[TreeNode]) -> bool:
        def validate(node, low=float('-inf'), high=float('inf')):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)

        return validate(root)

if __name__ == "__main__":
    root = TreeNode(2, TreeNode(1), TreeNode(3))
    print("Valid BST ->", Solution.isValidBST(root))  # True
