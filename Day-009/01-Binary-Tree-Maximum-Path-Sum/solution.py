"""
Problem Name: Binary Tree Maximum Path Sum
Problem Statement: A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them.
Given the root of a binary tree, return the maximum path sum of any non-empty path.

Approach: Post-order recursive traversal. At each node, compute max gain from left and right children (floored at 0).
Update global max sum with (node.val + leftGain + rightGain). Return node.val + max(leftGain, rightGain).

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
    def maxPathSum(root: Optional[TreeNode]) -> int:
        max_sum = float('-inf')

        def gain_from_subtree(node: Optional[TreeNode]) -> int:
            nonlocal max_sum
            if not node:
                return 0

            left_gain = max(0, gain_from_subtree(node.left))
            right_gain = max(0, gain_from_subtree(node.right))

            price_newpath = node.val + left_gain + right_gain
            max_sum = max(max_sum, price_newpath)

            return node.val + max(left_gain, right_gain)

        gain_from_subtree(root)
        return max_sum

if __name__ == "__main__":
    root = TreeNode(-10, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
    print("Maximum Path Sum:", Solution.maxPathSum(root))  # Expected: 42
