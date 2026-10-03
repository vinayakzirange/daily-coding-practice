"""
Problem: Path Sum II (LeetCode 113)
Language: Python
Difficulty: Medium
Time Complexity: O(N^2) worst case copying paths
Space Complexity: O(H)
"""

from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> List[List[int]]:
        result = []

        def dfs(node: Optional[TreeNode], remaining: int, path: List[int]):
            if not node:
                return

            path.append(node.val)
            if not node.left and not node.right and remaining == node.val:
                result.append(list(path))
            else:
                dfs(node.left, remaining - node.val, path)
                dfs(node.right, remaining - node.val, path)
            path.pop()

        dfs(root, targetSum, [])
        return result

if __name__ == "__main__":
    sol = Solution()
    root = TreeNode(5,
        TreeNode(4, TreeNode(11, TreeNode(7), TreeNode(2))),
        TreeNode(8, TreeNode(13), TreeNode(4, TreeNode(5), TreeNode(1)))
    )
    print("Paths matching sum 22:", sol.pathSum(root, 22))  # [[5, 4, 11, 2], [5, 8, 4, 5]]
