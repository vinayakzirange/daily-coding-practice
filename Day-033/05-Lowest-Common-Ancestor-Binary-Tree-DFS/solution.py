"""
Problem: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
Difficulty: Medium
Topic: Binary Tree / Depth-First Search / Divide and Conquer

Description:
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined
between two nodes p and q as the lowest node in T that has both p and q as descendants
(where we allow a node to be a descendant of itself)."

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself
according to the LCA definition.

Example 3:
Input: root = [1,2], p = 1, q = 2
Output: 1

Constraints:
  * The number of nodes in the tree is in the range [2, 10^5].
  * -10^9 <= Node.val <= 10^9
  * All Node.val are unique.
  * p != q
  * p and q will exist in the tree.

Complexity:
  * Time Complexity: O(n) - We visit every node in the worst case.
  * Space Complexity: O(h) - Auxiliary stack space proportional to tree height h.
"""

from typing import Optional


class TreeNode:
    def __init__(self, x: int):
        self.val = x
        self.left: Optional["TreeNode"] = None
        self.right: Optional["TreeNode"] = None


class Solution:
    def lowestCommonAncestor(
        self, root: "TreeNode", p: "TreeNode", q: "TreeNode"
    ) -> Optional["TreeNode"]:
        # Base case: if root is None or matches either p or q
        if not root or root == p or root == q:
            return root

        # Search in left and right subtrees
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        # If both subtrees return non-null, root is the LCA
        if left and right:
            return root

        # Otherwise return whichever subtree found a target
        return left if left else right


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    # Construct tree:
    #         3
    #       /   \
    #      5     1
    #     / \   / \
    #    6   2 0   8
    #       / \
    #      7   4
    node3 = TreeNode(3)
    node5 = TreeNode(5)
    node1 = TreeNode(1)
    node6 = TreeNode(6)
    node2 = TreeNode(2)
    node0 = TreeNode(0)
    node8 = TreeNode(8)
    node7 = TreeNode(7)
    node4 = TreeNode(4)

    node3.left = node5
    node3.right = node1
    node5.left = node6
    node5.right = node2
    node2.left = node7
    node2.right = node4
    node1.left = node0
    node1.right = node8

    sol = Solution()

    # Test 1: p = 5, q = 1 -> LCA should be 3
    lca1 = sol.lowestCommonAncestor(node3, node5, node1)
    assert lca1.val == 3, f"Expected 3, got {lca1.val}"
    print(f"Test 1 Passed: LCA(5, 1) = {lca1.val}")

    # Test 2: p = 5, q = 4 -> LCA should be 5
    lca2 = sol.lowestCommonAncestor(node3, node5, node4)
    assert lca2.val == 5, f"Expected 5, got {lca2.val}"
    print(f"Test 2 Passed: LCA(5, 4) = {lca2.val}")

    # Test 3: p = 6, q = 4 -> LCA should be 5
    lca3 = sol.lowestCommonAncestor(node3, node6, node4)
    assert lca3.val == 5, f"Expected 5, got {lca3.val}"
    print(f"Test 3 Passed: LCA(6, 4) = {lca3.val}")

    # Test 4: p = 7, q = 8 -> LCA should be 3
    lca4 = sol.lowestCommonAncestor(node3, node7, node8)
    assert lca4.val == 3, f"Expected 3, got {lca4.val}"
    print(f"Test 4 Passed: LCA(7, 8) = {lca4.val}")

    print("\nAll Lowest Common Ancestor tests passed successfully!")
