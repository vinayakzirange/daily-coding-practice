"""
Problem Name: Lowest Common Ancestor of a Binary Search Tree
Problem Statement: Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.

Approach: Use BST properties. If both p and q are smaller than root, LCA lies in left subtree.
If both are greater, LCA lies in right subtree. Otherwise, root is the LCA.

Time Complexity: O(H) where H is height of BST (O(log N) average, O(N) worst)
Space Complexity: O(1) iterative approach
"""

from typing import Optional

class TreeNode:
    def __init__(self, x: int):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    @staticmethod
    def lowestCommonAncestor(root: Optional[TreeNode], p: TreeNode, q: TreeNode) -> Optional[TreeNode]:
        curr = root
        while curr:
            if p.val < curr.val and q.val < curr.val:
                curr = curr.left
            elif p.val > curr.val and q.val > curr.val:
                curr = curr.right
            else:
                return curr
        return None

if __name__ == "__main__":
    root = TreeNode(6)
    root.left = TreeNode(2)
    root.right = TreeNode(8)
    root.left.left = TreeNode(0)
    root.left.right = TreeNode(4)

    p = root.left        # 2
    q = root.left.right  # 4

    lca = Solution.lowestCommonAncestor(root, p, q)
    print("LCA of 2 and 4 is:", lca.val if lca else None)  # Expected: 2
