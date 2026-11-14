"""
Problem: Delete Leaves With a Given Value (LeetCode 1325)
Difficulty: Medium
Language: Python

Given a binary tree root and an integer target, delete all the leaf nodes with value target.

Note that once you delete a leaf node with value target, if its parent node becomes a leaf node
and has the value target, it should also be deleted (you need to continue doing that until you cannot).

Example 1:
    Input: root = [1,2,3,2,null,2,4], target = 2
    Output: [1,null,3,null,4]
    Explanation: Leaf nodes in green with value (target = 2) are removed (Left picture).
    After removal, node with value 2 (parent of left leaf 2) becomes a leaf with value 2,
    so it is also removed (Middle picture).

Example 2:
    Input: root = [1,3,3,3,2], target = 3
    Output: [1,3,null,null,2]

Example 3:
    Input: root = [1,2,null,2,null,2], target = 2
    Output: [1]

Constraints:
    The number of nodes in the tree is in the range [1, 3000].
    1 <= Node.val, target <= 1000
"""

from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def removeLeafNodes(self, root: Optional[TreeNode], target: int) -> Optional[TreeNode]:
        """
        Recursively prunes leaf nodes matching target in Post-Order Traversal.
        
        Complexity:
            Time: O(N) - Visits each node in the tree once.
            Space: O(H) - Recursion call stack bounded by tree height H.
        """
        if not root:
            return None

        # Post-order: process children first so parents become leaves before being evaluated
        root.left = self.removeLeafNodes(root.left, target)
        root.right = self.removeLeafNodes(root.right, target)

        # If current node is now a leaf and matches target, delete it
        if root.left is None and root.right is None and root.val == target:
            return None

        return root


def serialize_tree(root: Optional[TreeNode]) -> List[Optional[int]]:
    """Helper to convert binary tree into level-order list."""
    if not root:
        return []
    queue = [root]
    result = []
    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    while result and result[-1] is None:
        result.pop()
    return result


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1 -> root = [1,2,3,2,null,2,4], target = 2
    #         1
    #       /   \
    #      2     3
    #     /     / \
    #    2     2   4
    root1 = TreeNode(1)
    root1.left = TreeNode(2, TreeNode(2), None)
    root1.right = TreeNode(3, TreeNode(2), TreeNode(4))
    res1 = sol.removeLeafNodes(root1, 2)
    # Expected: 1 -> right: 3 -> right: 4
    assert serialize_tree(res1) == [1, None, 3, None, 4], f"Test 1 Failed: {serialize_tree(res1)}"

    # Test 2: Example 2 -> root = [1,3,3,3,2], target = 3
    root2 = TreeNode(1, TreeNode(3, TreeNode(3), TreeNode(2)), TreeNode(3))
    res2 = sol.removeLeafNodes(root2, 3)
    assert serialize_tree(res2) == [1, 3, None, None, 2], f"Test 2 Failed: {serialize_tree(res2)}"

    # Test 3: Entire tree is target -> becomes empty
    root3 = TreeNode(2, TreeNode(2), TreeNode(2))
    res3 = sol.removeLeafNodes(root3, 2)
    assert res3 is None, "Test 3 Failed"

    # Test 4: Target not in tree
    root4 = TreeNode(1, TreeNode(2), TreeNode(3))
    res4 = sol.removeLeafNodes(root4, 99)
    assert serialize_tree(res4) == [1, 2, 3], "Test 4 Failed"

    print("All Delete Leaves With a Given Value tests passed successfully!")
