r"""
====================================================================
Problem: Find Largest Value in Each Tree Row (LeetCode 515)
Difficulty: Medium
Topic: Tree, Depth-First Search, Breadth-First Search, Binary Tree
====================================================================

Given the root of a binary tree, return an array of the largest value
in each row of the tree (0-indexed).

Example 1:
        1
       / \
      3   2
     / \   \
    5   3   9
Output: [1, 3, 9]

Example 2:
      1
     / \
    2   3
Output: [1, 3]

Constraints:
- The number of nodes in the tree will be in the range [0, 10^4].
- -2^31 <= Node.val <= 2^31 - 1
====================================================================
"""

from collections import deque
from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        """
        Computes the maximum node value per row using BFS level-order traversal.

        Complexity:
        - Time: O(N) visiting each node once
        - Space: O(W) where W is the maximum width of the binary tree
        """
        if not root:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            level_max = float("-inf")

            for _ in range(level_size):
                node = queue.popleft()
                if node.val > level_max:
                    level_max = node.val

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(level_max)

        return result


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: [1, 3, 2, 5, 3, null, 9] -> [1, 3, 9]
    root1 = TreeNode(
        1,
        TreeNode(3, TreeNode(5), TreeNode(3)),
        TreeNode(2, None, TreeNode(9)),
    )
    assert sol.largestValues(root1) == [1, 3, 9], "Test 1 failed"

    # Test 2: [1, 2, 3] -> [1, 3]
    root2 = TreeNode(1, TreeNode(2), TreeNode(3))
    assert sol.largestValues(root2) == [1, 3], "Test 2 failed"

    # Test 3: Empty tree
    assert sol.largestValues(None) == [], "Test 3 failed"

    # Test 4: Single negative node
    root4 = TreeNode(-42)
    assert sol.largestValues(root4) == [-42], "Test 4 failed"

    # Test 5: All negative values
    root5 = TreeNode(-1, TreeNode(-2), TreeNode(-3))
    assert sol.largestValues(root5) == [-1, -2], "Test 5 failed"

    print("All Find Largest Value in Each Tree Row tests passed successfully!")
