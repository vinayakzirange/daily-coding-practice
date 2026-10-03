"""
Problem Name: Lowest Common Ancestor of a Binary Tree
Problem Statement: Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q.

Approach: Post-order recursive traversal. If a subtree returns non-null for both left and right,
current node is the LCA.

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
    def lowestCommonAncestor(root: Optional[TreeNode], p: TreeNode, q: TreeNode) -> Optional[TreeNode]:
        if not root or root == p or root == q:
            return root

        left = Solution.lowestCommonAncestor(root.left, p, q)
        right = Solution.lowestCommonAncestor(root.right, p, q)

        if left and right:
            return root
        return left if left else right

if __name__ == "__main__":
    root = TreeNode(3)
    p = TreeNode(5)
    q = TreeNode(1)
    root.left = p
    root.right = q
    root.left.left = TreeNode(6)
    root.left.right = TreeNode(2)

    lca = Solution.lowestCommonAncestor(root, p, q)
    print("LCA of 5 and 1 is:", lca.val if lca else None)  # Expected: 3
