r"""
LeetCode 958: Check Completeness of a Binary Tree (Medium)
https://leetcode.com/problems/check-completeness-of-a-binary-tree/

Given the root of a binary tree, determine if it is a complete binary tree.

In a complete binary tree, every level, except possibly the last, is completely
filled, and all nodes in the last level are as far left as possible. It can have
between 1 and 2^h nodes inclusive at the last level h.

Example 1:
Input: root = [1,2,3,4,5,6]
Output: true
Explanation: Every level before the last is full, and all nodes in the last level are as far left as possible.

Example 2:
Input: root = [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 isn't as far left as possible.

Constraints:
- The number of nodes in the tree is in the range [1, 100].
- 1 <= Node.val <= 1000
"""

from typing import Optional
from collections import deque


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        """
        Level-Order BFS Traversal:
        In a complete binary tree, once a None node is encountered in level-order
        traversal, no non-None nodes can appear afterward.

        We push both left and right children (including None) into a queue.
        If we pop a None node, we set a flag seen_none = True.
        If we ever pop a non-None node after seen_none is True, the tree is not complete.

        Time Complexity: O(N) where N is the number of nodes in the tree.
        Space Complexity: O(N) for the BFS queue.
        """
        if not root:
            return True

        queue = deque([root])
        seen_none = False

        while queue:
            node = queue.popleft()

            if node is None:
                seen_none = True
            else:
                if seen_none:
                    return False
                queue.append(node.left)
                queue.append(node.right)

        return True


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: [1, 2, 3, 4, 5, 6] -> True
    #        1
    #       / \
    #      2   3
    #     / \  /
    #    4   5 6
    root1 = TreeNode(1)
    root1.left = TreeNode(2, TreeNode(4), TreeNode(5))
    root1.right = TreeNode(3, TreeNode(6))
    assert sol.isCompleteTree(root1) is True, "Test 1 Failed"

    # Test Case 2: [1, 2, 3, 4, 5, None, 7] -> False
    #        1
    #       / \
    #      2   3
    #     / \   \
    #    4   5   7
    root2 = TreeNode(1)
    root2.left = TreeNode(2, TreeNode(4), TreeNode(5))
    root2.right = TreeNode(3, None, TreeNode(7))
    assert sol.isCompleteTree(root2) is False, "Test 2 Failed"

    # Test Case 3: Single node -> True
    root3 = TreeNode(1)
    assert sol.isCompleteTree(root3) is True, "Test 3 Failed"

    # Test Case 4: Perfect binary tree of depth 2 -> True
    root4 = TreeNode(1, TreeNode(2), TreeNode(3))
    assert sol.isCompleteTree(root4) is True, "Test 4 Failed"

    # Test Case 5: Skewed tree -> False
    root5 = TreeNode(1, None, TreeNode(2))
    assert sol.isCompleteTree(root5) is False, "Test 5 Failed"

    print("All Check Completeness of Binary Tree tests passed successfully!")

