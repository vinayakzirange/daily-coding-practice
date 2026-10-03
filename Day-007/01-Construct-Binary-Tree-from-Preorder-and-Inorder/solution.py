"""
Problem Name: Construct Binary Tree from Preorder and Inorder Traversal
Problem Statement: Given two integer arrays preorder and inorder, construct and return the binary tree.

Approach: Preorder gives the root node. Inorder gives left and right subtrees split around root node index.
Use a HashMap to store inorder value-to-index mapping for O(1) lookup.

Time Complexity: O(N)
Space Complexity: O(N)
"""

from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    @staticmethod
    def buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        inorder_map = {val: idx for idx, val in enumerate(inorder)}
        preorder_idx = 0

        def array_to_tree(left: int, right: int) -> Optional[TreeNode]:
            nonlocal preorder_idx
            if left > right:
                return None

            root_val = preorder[preorder_idx]
            preorder_idx += 1
            root = TreeNode(root_val)

            root_idx = inorder_map[root_val]
            root.left = array_to_tree(left, root_idx - 1)
            root.right = array_to_tree(root_idx + 1, right)

            return root

        return array_to_tree(0, len(inorder) - 1)

if __name__ == "__main__":
    preorder = [3, 9, 20, 15, 7]
    inorder = [9, 3, 15, 20, 7]
    root = Solution.buildTree(preorder, inorder)
    print("Root Node:", root.val)  # Expected: 3
    print("Root Left:", root.left.val)  # Expected: 9
    print("Root Right:", root.right.val)  # Expected: 20
