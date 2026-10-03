"""
Problem: Construct Binary Tree from Preorder and Inorder Traversal
Topic: Binary Tree / Divide & Conquer / HashMap Indexing
Language: Python

Approach:
Preorder root element dictates root of current subtree. Store inorder index mapping in HashMap.
Locate root position in inorder array to split left and right subtrees. Reconstruct recursively.

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
        inorder_map = {val: i for i, val in enumerate(inorder)}
        pre_idx = 0

        def array_to_tree(left: int, right: int) -> Optional[TreeNode]:
            nonlocal pre_idx
            if left > right:
                return None

            root_val = preorder[pre_idx]
            pre_idx += 1
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
    print("Root val ->", root.val if root else None)  # 3
