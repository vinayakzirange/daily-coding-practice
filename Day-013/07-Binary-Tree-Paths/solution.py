"""
Problem: Binary Tree Paths
Topic: Binary Tree / Backtracking / DFS
Language: Python

Approach:
DFS traversal accumulating path string. When reaching leaf node (no left/right child),
add complete path string to result list.

Time Complexity: O(N)
Space Complexity: O(H) recursion stack
"""

from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    @staticmethod
    def binaryTreePaths(root: Optional[TreeNode]) -> List[str]:
        paths = []
        if not root:
            return paths

        def dfs(node: TreeNode, path: str):
            if not node.left and not node.right:
                paths.append(path + str(node.val))
                return
            if node.left:
                dfs(node.left, path + str(node.val) + "->")
            if node.right:
                dfs(node.right, path + str(node.val) + "->")

        dfs(root, "")
        return paths

if __name__ == "__main__":
    root = TreeNode(1, TreeNode(2, None, TreeNode(5)), TreeNode(3))
    print("Tree Paths ->", Solution.binaryTreePaths(root))  # ["1->2->5", "1->3"]
