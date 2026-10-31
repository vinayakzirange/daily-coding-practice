r"""
====================================================================
Problem: Find Duplicate Subtrees (LeetCode 652)
Difficulty: Medium
Topic: Hash Table, Tree, Depth-First Search, Binary Tree
====================================================================

Given the root of a binary tree, return all duplicate subtrees.

For each kind of duplicate subtrees, you only need to return the root
node of any one of them.

Two trees are duplicate if they have the same structure with the same
node values.

Example 1:
        1
       / \
      2   3
     /   / \
    4   2   4
       /
      4
The duplicate subtrees are:
    2
   /
  4
and
  4
Output: [[2,4],[4]]

Example 2:
      2
     / \
    1   1
Output: [[1]]

Example 3:
      2
     / \
    2   2
   /   /
  3   3
Output: [[2,3],[3]]

Constraints:
- The number of the nodes in the tree will be in the range [1, 5000]
- -200 <= Node.val <= 200
====================================================================
"""

from collections import defaultdict
from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:
        """
        Identifies duplicate subtrees by mapping each unique subtree structure
        (val, left_id, right_id) to a unique integer ID.

        Complexity:
        - Time: O(N) where N is number of nodes
        - Space: O(N) for ID dictionaries and recursion stack
        """
        trees = defaultdict()
        trees.default_factory = trees.__len__
        count = defaultdict(int)
        duplicates = []

        def lookup(node: Optional[TreeNode]) -> int:
            if not node:
                return 0

            # Subtree key is tuple of (value, left_subtree_id, right_subtree_id)
            uid = trees[(node.val, lookup(node.left), lookup(node.right))]
            count[uid] += 1
            if count[uid] == 2:
                duplicates.append(node)
            return uid

        lookup(root)
        return duplicates


# --- Helper for tree serialization to test ---
def preorder(node: Optional[TreeNode]) -> List:
    if not node:
        return [None]
    return [node.val] + preorder(node.left) + preorder(node.right)


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    #       1
    #      / \
    #     2   3
    #    /   / \
    #   4   2   4
    #      /
    #     4
    root1 = TreeNode(
        1,
        TreeNode(2, TreeNode(4), None),
        TreeNode(3, TreeNode(2, TreeNode(4), None), TreeNode(4)),
    )
    res1 = sol.findDuplicateSubtrees(root1)
    res1_vals = sorted([preorder(n) for n in res1], key=lambda x: str(x))
    expected1_vals = sorted(
        [[4, None, None], [2, 4, None, None, None]], key=lambda x: str(x)
    )
    assert res1_vals == expected1_vals, f"Test 1 failed: {res1_vals}"

    # Test 2: [2, 1, 1] -> duplicate [1]
    root2 = TreeNode(2, TreeNode(1), TreeNode(1))
    res2 = sol.findDuplicateSubtrees(root2)
    assert len(res2) == 1 and res2[0].val == 1, "Test 2 failed"

    # Test 3: No duplicates
    root3 = TreeNode(1, TreeNode(2), TreeNode(3))
    assert sol.findDuplicateSubtrees(root3) == [], "Test 3 failed"

    print("All Find Duplicate Subtrees tests passed successfully!")
