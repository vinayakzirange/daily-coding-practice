"""
Problem: Sum Root to Leaf Numbers (LeetCode 129)
Difficulty: Medium
Topic: Binary Tree / Depth-First Search / Tree Path Numbers

Description:
You are given the root of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.
For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.

Return the total sum of all root-to-leaf numbers. Test cases are generated so that
the answer will fit in a 32-bit integer.

A leaf node is a node with no children.

Example 1:
Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.
Therefore, sum = 12 + 13 = 25.

Example 2:
Input: root = [4,9,0,5,1]
Output: 1026
Explanation:
The root-to-leaf path 4->9->5 represents the number 495.
The root-to-leaf path 4->9->1 represents the number 491.
The root-to-leaf path 4->0 represents the number 40.
Therefore, sum = 495 + 491 + 40 = 1026.

Constraints:
  * The number of nodes in the tree is in the range [1, 1000].
  * 0 <= Node.val <= 9
  * The depth of the tree will not exceed 10.

Complexity:
  * Time Complexity: O(n) - Every node in the binary tree is visited once.
  * Space Complexity: O(h) - Auxiliary recursion stack space proportional to height h.
"""

from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(node: Optional[TreeNode], current_val: int) -> int:
            if not node:
                return 0

            current_val = current_val * 10 + node.val

            # If leaf node, return the completed path number
            if not node.left and not node.right:
                return current_val

            return dfs(node.left, current_val) + dfs(node.right, current_val)

        return dfs(root, 0)


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    # Tree 1: [1, 2, 3] -> 12 + 13 = 25
    tree1 = TreeNode(1, TreeNode(2), TreeNode(3))
    res1 = sol.sumNumbers(tree1)
    assert res1 == 25, f"Test 1 Failed: got {res1}, expected 25"
    print(f"Test 1 Passed: [1, 2, 3] -> sum = {res1}")

    # Tree 2: [4, 9, 0, 5, 1] -> 495 + 491 + 40 = 1026
    tree2 = TreeNode(
        4,
        TreeNode(9, TreeNode(5), TreeNode(1)),
        TreeNode(0)
    )
    res2 = sol.sumNumbers(tree2)
    assert res2 == 1026, f"Test 2 Failed: got {res2}, expected 1026"
    print(f"Test 2 Passed: [4, 9, 0, 5, 1] -> sum = {res2}")

    # Tree 3: Single node [9]
    tree3 = TreeNode(9)
    res3 = sol.sumNumbers(tree3)
    assert res3 == 9, f"Test 3 Failed: got {res3}, expected 9"
    print(f"Test 3 Passed: [9] -> sum = {res3}")

    print("\nAll Sum Root to Leaf Numbers tests passed successfully!")
