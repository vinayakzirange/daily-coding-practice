r"""
====================================================================
Problem: Convert BST to Greater Tree (LeetCode 538)
Difficulty: Medium
Topic: Tree, Depth-First Search, Binary Search Tree, Binary Tree
====================================================================

Given the root of a Binary Search Tree (BST), convert it to a Greater Tree
such that every key of the original BST is changed to the original key plus
the sum of all keys greater than the original key in BST.

Example 1:
        4 (30)
       /     \
    1 (36)   6 (21)
    /   \    /   \
  0(36) 2(35) 5(26) 7(15)
         \           \
         3(33)       8(8)

Example 2:
Input: root = [0, null, 1]
Output: [1, null, 1]

Constraints:
- The number of nodes in the tree is in the range [0, 10^4].
- -10^4 <= Node.val <= 10^4
- All the values in the tree are unique.
- root is guaranteed to be a valid binary search tree.
====================================================================
"""

from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        """
        Reverse in-order traversal (Right -> Root -> Left) to visit nodes in
        descending order and accumulate the running sum.

        Complexity:
        - Time: O(N) visiting each node exactly once
        - Space: O(H) where H is tree height for the recursion stack
        """
        self.running_sum = 0

        def reverse_inorder(node: Optional[TreeNode]) -> None:
            if not node:
                return

            # Traverse right subtree (greater elements first)
            reverse_inorder(node.right)

            # Update accumulator and node value
            self.running_sum += node.val
            node.val = self.running_sum

            # Traverse left subtree
            reverse_inorder(node.left)

        reverse_inorder(root)
        return root


# --- Helper for in-order traversal list ---
def inorder_list(node: Optional[TreeNode]):
    return inorder_list(node.left) + [node.val] + inorder_list(node.right) if node else []


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: [4, 1, 6, 0, 2, 5, 7, null, null, null, 3, null, null, null, 8]
    root1 = TreeNode(
        4,
        TreeNode(1, TreeNode(0), TreeNode(2, None, TreeNode(3))),
        TreeNode(6, TreeNode(5), TreeNode(7, None, TreeNode(8))),
    )
    res1 = sol.convertBST(root1)
    assert inorder_list(res1) == [36, 36, 35, 33, 30, 26, 21, 15, 8], f"Test 1 failed: {inorder_list(res1)}"

    # Test 2: [0, null, 1]
    root2 = TreeNode(0, None, TreeNode(1))
    res2 = sol.convertBST(root2)
    assert inorder_list(res2) == [1, 1], f"Test 2 failed: {inorder_list(res2)}"

    # Test 3: Empty tree
    assert sol.convertBST(None) is None, "Test 3 failed"

    # Test 4: Single node
    root4 = TreeNode(5)
    assert sol.convertBST(root4).val == 5, "Test 4 failed"

    print("All Convert BST to Greater Tree tests passed successfully!")
