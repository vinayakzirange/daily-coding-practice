"""
Problem: Maximum Depth of Binary Tree
Topic: Binary Tree / Recursion
Language: Python

Approach:
Depth = 1 + max(depth(left), depth(right)). Base case returns 0 for None.

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
    def maxDepth(root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(Solution.maxDepth(root.left), Solution.maxDepth(root.right))

if __name__ == "__main__":
    root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
    print("Max Depth:", Solution.maxDepth(root))  # Expected: 3
