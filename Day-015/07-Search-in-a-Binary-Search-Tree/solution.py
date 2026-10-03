"""
Problem: Search in a Binary Search Tree
Topic: Binary Search Tree / Search recursion
Language: Python

Approach:
If node is null or node.val == val, return node.
If val < node.val, search left subtree; otherwise search right subtree.

Time Complexity: O(H) where H is tree height
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
    def searchBST(root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        if not root or root.val == val:
            return root
        return Solution.searchBST(root.left, val) if val < root.val else Solution.searchBST(root.right, val)

if __name__ == "__main__":
    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7))
    res = Solution.searchBST(root, 2)
    print("Search BST for 2 ->", res.val if res else "null")  # 2
