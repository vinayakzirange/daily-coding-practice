"""
Problem: Flatten Binary Tree to Linked List
Topic: Binary Tree / In-Place Morris Traversal
Language: Python

Approach:
At each node, if left child exists, find the rightmost node of left subtree.
Connect rightmost node's right to current node's right. Move current node's left
to its right, and set left to null.

Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    @staticmethod
    def flatten(root: Optional[TreeNode]) -> None:
        curr = root
        while curr:
            if curr.left:
                rightmost = curr.left
                while rightmost.right:
                    rightmost = rightmost.right
                rightmost.right = curr.right
                curr.right = curr.left
                curr.left = None
            curr = curr.right

if __name__ == "__main__":
    root = TreeNode(1, TreeNode(2, TreeNode(3), TreeNode(4)), TreeNode(5, None, TreeNode(6)))
    Solution.flatten(root)

    print("Flattened Tree -> ", end="")
    curr = root
    while curr:
        print(f"{curr.val} ", end="")
        curr = curr.right
    print()  # 1 2 3 4 5 6
