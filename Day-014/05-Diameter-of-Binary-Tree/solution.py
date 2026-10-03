"""
Problem: Diameter of Binary Tree
Topic: Binary Tree / DFS Postorder
Language: Python

Approach:
Postorder traversal calculates height of left and right subtrees.
At each node, path length through node is (leftHeight + rightHeight).
Maintain global max diameter. Return (1 + max(leftHeight, rightHeight)).

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
    def diameterOfBinaryTree(root: Optional[TreeNode]) -> int:
        max_diameter = 0

        def get_height(node: Optional[TreeNode]) -> int:
            nonlocal max_diameter
            if not node:
                return 0
            left_h = get_height(node.left)
            right_h = get_height(node.right)
            max_diameter = max(max_diameter, left_h + right_h)
            return 1 + max(left_h, right_h)

        get_height(root)
        return max_diameter

if __name__ == "__main__":
    root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
    print("Diameter of Tree ->", Solution.diameterOfBinaryTree(root))  # 3
