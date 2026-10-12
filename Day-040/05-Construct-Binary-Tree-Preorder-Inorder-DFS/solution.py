"""
Problem: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
Difficulty: Medium
Topic: Tree / Array / Hash Table / Divide and Conquer / Binary Tree

Description:
Given two integer arrays preorder and inorder where preorder is the preorder
traversal of a binary tree and inorder is the inorder traversal of the same
tree, construct and return the binary tree.

Example 1:
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
Explanation:
    3
   / \
  9  20
    /  \
   15   7

Example 2:
Input: preorder = [-1], inorder = [-1]
Output: [-1]

Constraints:
- 1 <= preorder.length <= 3000
- inorder.length == preorder.length
- -3000 <= preorder[i], inorder[i] <= 3000
- preorder and inorder consist of unique values.
- Each value of inorder also appears in preorder.
- preorder is guaranteed to be the preorder traversal of the tree.
- inorder is guaranteed to be the inorder traversal of the tree.

Complexity Analysis:
- Time Complexity: O(n) where n is the number of nodes. Each node is processed once.
- Space Complexity: O(n) for the hash map and recursion stack.
"""

from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        # Hash map for O(1) lookup of root index in inorder array
        inorder_idx_map = {val: idx for idx, val in enumerate(inorder)}
        pre_idx = 0

        def helper(in_left: int, in_right: int) -> Optional[TreeNode]:
            nonlocal pre_idx
            if in_left > in_right:
                return None

            # The current root value is at preorder[pre_idx]
            root_val = preorder[pre_idx]
            root = TreeNode(root_val)
            pre_idx += 1

            # Root splits inorder into left and right subtrees
            mid = inorder_idx_map[root_val]

            # Build left and right subtrees
            root.left = helper(in_left, mid - 1)
            root.right = helper(mid + 1, in_right)

            return root

        return helper(0, len(inorder) - 1)


# Helper function to serialize tree level by level for testing
def tree_to_list(root: Optional[TreeNode]) -> List:
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
    # Trim trailing Nones
    while result and result[-1] is None:
        result.pop()
    return result


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        (
            [3, 9, 20, 15, 7],
            [9, 3, 15, 20, 7],
            [3, 9, 20, None, None, 15, 7],
        ),
        ([-1], [-1], [-1]),
        (
            [1, 2, 4, 5, 3, 6, 7],
            [4, 2, 5, 1, 6, 3, 7],
            [1, 2, 3, 4, 5, 6, 7],
        ),
        (
            [1, 2, 3],
            [3, 2, 1],
            [1, 2, None, 3],
        ),
    ]

    for idx, (pre, inord, expected) in enumerate(test_cases, 1):
        root = sol.buildTree(pre, inord)
        res_list = tree_to_list(root)
        assert res_list == expected, f"Test {idx} Failed: got {res_list}, expected {expected}"
        print(f"Test {idx} Passed: preorder={pre} -> tree serialized = {res_list}")

    print("\nAll Construct Binary Tree tests passed successfully!")
