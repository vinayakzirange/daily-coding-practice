r"""
LeetCode 814: Binary Tree Pruning (Medium)
https://leetcode.com/problems/binary-tree-pruning/

Given the root of a binary tree, return the same tree where every subtree
(of the given tree) not containing a 1 has been removed.

A subtree of a node is node plus every node that is a descendant of node.

Example 1:
Input: root = [1,null,0,0,1]
Output: [1,null,0,null,1]
Explanation:
Only the red nodes satisfy the property "every subtree not containing a 1".
The diagram on the right represents the answer.

Example 2:
Input: root = [1,0,1,0,0,0,1]
Output: [1,null,1,null,1]

Example 3:
Input: root = [1,1,0,1,1,0,1,0]
Output: [1,1,0,1,1,null,1]

Constraints:
- The number of nodes in the tree is in the range [1, 200].
- Node.val is either 0 or 1.
"""

from typing import Optional, List


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        """
        Post-order traversal:
        Recursively prune left and right subtrees first.
        If a subtree contains no 1s, the recursive call returns None.
        If after pruning both children, the current node value is 0 and both children are None,
        then this entire subtree contains no 1s, so prune it by returning None.

        Time Complexity: O(N) where N is the number of nodes in the tree.
        Space Complexity: O(H) recursion stack where H is the height of the tree.
        """
        if not root:
            return None

        root.left = self.pruneTree(root.left)
        root.right = self.pruneTree(root.right)

        if root.val == 0 and not root.left and not root.right:
            return None

        return root


# Helper function to serialize tree level-order for test validation
def tree_to_list(root: Optional[TreeNode]) -> List[Optional[int]]:
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    # Strip trailing None values
    while result and result[-1] is None:
        result.pop()
    return result


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: [1, None, 0, 0, 1]
    #       1
    #        \
    #         0
    #        / \
    #       0   1
    root1 = TreeNode(1)
    root1.right = TreeNode(0)
    root1.right.left = TreeNode(0)
    root1.right.right = TreeNode(1)
    pruned1 = sol.pruneTree(root1)
    assert tree_to_list(pruned1) == [1, None, 0, None, 1], f"Test 1 Failed: {tree_to_list(pruned1)}"

    # Test Case 2: [1, 0, 1, 0, 0, 0, 1]
    root2 = TreeNode(1)
    root2.left = TreeNode(0, TreeNode(0), TreeNode(0))
    root2.right = TreeNode(1, TreeNode(0), TreeNode(1))
    pruned2 = sol.pruneTree(root2)
    assert tree_to_list(pruned2) == [1, None, 1, None, 1], f"Test 2 Failed: {tree_to_list(pruned2)}"

    # Test Case 3: All zeros -> should prune entirely to None
    root3 = TreeNode(0, TreeNode(0), TreeNode(0))
    pruned3 = sol.pruneTree(root3)
    assert pruned3 is None, f"Test 3 Failed: expected None, got {tree_to_list(pruned3)}"

    # Test Case 4: Single 1 node
    root4 = TreeNode(1)
    pruned4 = sol.pruneTree(root4)
    assert tree_to_list(pruned4) == [1], f"Test 4 Failed: {tree_to_list(pruned4)}"

    print("All Binary Tree Pruning tests passed successfully!")
