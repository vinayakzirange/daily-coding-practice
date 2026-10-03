"""
Problem: Leaf-Similar Trees
Topic: Binary Tree / DFS Leaf Sequence
Language: Python

Approach:
Collect leaf node values of root1 and root2 into two separate lists using DFS.
Compare the leaf lists for equality.

Time Complexity: O(N1 + N2)
Space Complexity: O(H1 + H2)
"""

from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    @staticmethod
    def leafSimilar(root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def get_leaves(node: Optional[TreeNode]) -> List[int]:
            if not node:
                return []
            if not node.left and not node.right:
                return [node.val]
            return get_leaves(node.left) + get_leaves(node.right)

        return get_leaves(root1) == get_leaves(root2)

if __name__ == "__main__":
    root1 = TreeNode(3, TreeNode(5), TreeNode(1))
    root2 = TreeNode(3, TreeNode(5), TreeNode(1))
    print("Leaf Similar ->", Solution.leafSimilar(root1, root2))  # True
