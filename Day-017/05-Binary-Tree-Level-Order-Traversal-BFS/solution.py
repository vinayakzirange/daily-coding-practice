"""
Problem: Binary Tree Level Order Traversal
Topic: Binary Tree / BFS Queue Traversal
Language: Python

Approach:
Use a Queue for Level Order Traversal (BFS). Process node level by level,
capturing node values of each level into a list.

Time Complexity: O(N)
Space Complexity: O(N)
"""

from collections import deque
from typing import List, Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    @staticmethod
    def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
        result = []
        if not root:
            return result

        queue = deque([root])
        while queue:
            level_size = len(queue)
            current_level = []
            for _ in range(level_size):
                node = queue.popleft()
                current_level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            result.append(current_level)

        return result

if __name__ == "__main__":
    root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
    print("Level Order ->", Solution.levelOrder(root))  # [[3], [9, 20], [15, 7]]
