"""
Problem Name: Kth Smallest Element in a BST
Problem Statement: Given the root of a binary search tree, and an integer k,
return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

Approach: Inorder Traversal (Left -> Root -> Right) visits nodes in strictly sorted order.
Stop when count reaches k.

Time Complexity: O(H + K)
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
        result = -1

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
    print("1st Smallest:", Solution.kthSmallest(root, 1))  # Expected: 1
    print("3rd Smallest:", Solution.kthSmallest(root, 3))  # Expected: 3
