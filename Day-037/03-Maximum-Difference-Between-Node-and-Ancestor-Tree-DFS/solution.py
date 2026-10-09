"""
Problem: Maximum Difference Between Node and Ancestor (LeetCode 1026)
Difficulty: Medium
Topic: Binary Tree / DFS / Min-Max Path Tracking

Description:
Given the root of a binary tree, find the maximum value v for which there exist
different nodes a and b where v = |a.val - b.val| and a is an ancestor of b.

A node a is an ancestor of b if either:
- a is the parent of b, or
- a is an ancestor of the parent of b.

Example 1:
Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
Explanation: 
We have various ancestor-descendant differences, some of which are:
|8 - 3| = 5
|3 - 7| = 4
|8 - 1| = 7
|10 - 13| = 3
Among all possible differences, the maximum value is 7 (between 8 and 1).

Example 2:
Input: root = [1,null,2,null,0,3]
Output: 3

Constraints:
  * The number of nodes in the tree is in the range [2, 5000].
  * 0 <= Node.val <= 10^5

Complexity:
  * Time Complexity: O(n) where n is the number of nodes in the binary tree.
  * Space Complexity: O(h) recursion call stack depth where h is height of tree (O(log n) balanced, O(n) worst case).
"""

from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxAncestorDiff(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        def dfs(node: Optional[TreeNode], cur_min: int, cur_max: int) -> int:
            if not node:
                return cur_max - cur_min

            # Update running min and max along path from root to current node
            cur_min = min(cur_min, node.val)
            cur_max = max(cur_max, node.val)

            # Traverse left and right subtrees
            left_diff = dfs(node.left, cur_min, cur_max)
            right_diff = dfs(node.right, cur_min, cur_max)

            return max(left_diff, right_diff)

        return dfs(root, root.val, root.val)


if __name__ == "__main__":
    sol = Solution()

    # Construct Tree 1: [8,3,10,1,6,null,14,null,null,4,7,13]
    root1 = TreeNode(8)
    root1.left = TreeNode(3)
    root1.right = TreeNode(10)
    root1.left.left = TreeNode(1)
    root1.left.right = TreeNode(6)
    root1.left.right.left = TreeNode(4)
    root1.left.right.right = TreeNode(7)
    root1.right.right = TreeNode(14)
    root1.right.right.left = TreeNode(13)

    ans1 = sol.maxAncestorDiff(root1)
    print(f"Test 1: Output={ans1}, Expected=7 | Pass: {ans1 == 7}")

    # Construct Tree 2: [1, null, 2, null, 0, 3]
    root2 = TreeNode(1)
    root2.right = TreeNode(2)
    root2.right.right = TreeNode(0)
    root2.right.right.left = TreeNode(3)

    ans2 = sol.maxAncestorDiff(root2)
    print(f"Test 2: Output={ans2}, Expected=3 | Pass: {ans2 == 3}")
