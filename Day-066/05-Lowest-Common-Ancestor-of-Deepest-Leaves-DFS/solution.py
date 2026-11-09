"""
Problem: Lowest Common Ancestor of Deepest Leaves (LeetCode 1123 / 865)
Difficulty: Medium
Language: Python

Given the root of a binary tree, return the lowest common ancestor of its deepest leaves.

Recall that:
    - The depth of a node is the shortest distance to the root.
    - A node is called a deepest leaf if it has the maximum depth among all nodes in the tree.
    - The lowest common ancestor of a set of nodes S is the node A with the largest depth such that every node in S is in the subtree with root A.

Example 1:
    Input: root = [3,5,1,6,2,0,8,null,null,7,4]
    Output: [2,7,4] (node 2)

Example 2:
    Input: root = [1]
    Output: [1]

Example 3:
    Input: root = [0,1,3,null,2]
    Output: [2]

Constraints:
    The number of nodes in the tree will be in the range [1, 1000].
    0 <= Node.val <= 1000
    The values of the nodes in the tree are unique.
"""

from typing import Optional, Tuple


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def lcaDeepestLeaves(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        """
        Finds the lowest common ancestor of the deepest leaves in the binary tree.
        
        Complexity:
            Time: O(N) - Visits each node once in post-order traversal.
            Space: O(H) - Recursion call stack proportional to tree height H (at most N).
        """
        def dfs(node: Optional[TreeNode]) -> Tuple[int, Optional[TreeNode]]:
            if not node:
                return 0, None

            left_depth, left_lca = dfs(node.left)
            right_depth, right_lca = dfs(node.right)

            # If both subtrees have the same max depth, current node is the LCA
            if left_depth == right_depth:
                return left_depth + 1, node
            # If left subtree is strictly deeper, the LCA lies within the left subtree
            elif left_depth > right_depth:
                return left_depth + 1, left_lca
            # If right subtree is strictly deeper, the LCA lies within the right subtree
            else:
                return right_depth + 1, right_lca

        return dfs(root)[1]


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    #              3
    #           /     \
    #          5       1
    #         / \     / \
    #        6   2   0   8
    #           / \
    #          7   4
    # Deepest leaves are 7 and 4 at depth 4. Their LCA is node 2.
    root1 = TreeNode(3)
    root1.left = TreeNode(5, TreeNode(6), TreeNode(2, TreeNode(7), TreeNode(4)))
    root1.right = TreeNode(1, TreeNode(0), TreeNode(8))
    res1 = sol.lcaDeepestLeaves(root1)
    assert res1 is not None and res1.val == 2, f"Test 1 Failed: {res1.val if res1 else None}"

    # Test 2: Single node
    root2 = TreeNode(1)
    res2 = sol.lcaDeepestLeaves(root2)
    assert res2 is not None and res2.val == 1, "Test 2 Failed"

    # Test 3: Example 3
    #        0
    #       / \
    #      1   3
    #       \
    #        2
    root3 = TreeNode(0, TreeNode(1, None, TreeNode(2)), TreeNode(3))
    res3 = sol.lcaDeepestLeaves(root3)
    assert res3 is not None and res3.val == 2, "Test 3 Failed"

    # Test 4: Symmetric tree with two deepest leaves
    #        1
    #       / \
    #      2   3
    root4 = TreeNode(1, TreeNode(2), TreeNode(3))
    res4 = sol.lcaDeepestLeaves(root4)
    assert res4 is not None and res4.val == 1, "Test 4 Failed"

    # Test 5: Linear chain
    #  1 -> 2 -> 3
    root5 = TreeNode(1, None, TreeNode(2, None, TreeNode(3)))
    res5 = sol.lcaDeepestLeaves(root5)
    assert res5 is not None and res5.val == 3, "Test 5 Failed"

    print("All Lowest Common Ancestor of Deepest Leaves tests passed successfully!")
