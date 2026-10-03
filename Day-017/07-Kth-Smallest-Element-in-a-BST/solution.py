"""
Problem: Kth Smallest Element in a BST
Topic: Binary Search Tree / Inorder Traversal
Language: Python

Approach:
Perform in-order traversal (which visits BST nodes in sorted order). Maintain a count and
stop traversal once the k-th node is visited.

Time Complexity: O(H + k)
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
    def kthSmallest(root: Optional[TreeNode], k: int) -> int:
        count = 0
        result = 0

        def inorder(node):
            nonlocal count, result
            if not node or count >= k:
                return
            inorder(node.left)
            count += 1
            if count == k:
                result = node.val
                return
            inorder(node.right)

        inorder(root)
        return result

if __name__ == "__main__":
    root = TreeNode(3, TreeNode(1, None, TreeNode(2)), TreeNode(4))
    print("1st Smallest ->", Solution.kthSmallest(root, 1))  # 1
