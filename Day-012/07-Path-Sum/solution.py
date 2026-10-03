"""
Problem: Path Sum
Topic: Binary Tree / DFS
Language: Python

Approach:
Recursively subtract current node value from targetSum. Return true if a leaf node
is reached and remaining targetSum equals leaf value.

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
    def hasPathSum(root: Optional[TreeNode], targetSum: int) -> bool:
        if not root:
            return False
        if not root.left and not root.right:
            return targetSum == root.val
        return Solution.hasPathSum(root.left, targetSum - root.val) or                Solution.hasPathSum(root.right, targetSum - root.val)

if __name__ == "__main__":
    root = TreeNode(5, TreeNode(4, TreeNode(11, TreeNode(7), TreeNode(2))), TreeNode(8))
    print("Has Path Sum 22 ->", Solution.hasPathSum(root, 22))  # True
