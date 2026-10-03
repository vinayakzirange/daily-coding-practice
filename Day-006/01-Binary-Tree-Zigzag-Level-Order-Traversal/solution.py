"""
Problem Name: Binary Tree Zigzag Level Order Traversal
Problem Statement: Given the root of a binary tree, return the zigzag level order traversal of its nodes' values.
(i.e., from left to right, then right to left for the next level and alternate between).

Approach: BFS using a Queue. Use a boolean flag `left_to_right` to alternate insertion order for each level.

Time Complexity: O(N)
Space Complexity: O(W) where W is max tree width
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
    def zigzagLevelOrder(root: Optional[TreeNode]) -> List[List[int]]:
        result = []
        if not root:
            return result

        queue = deque([root])
        left_to_right = True

        while queue:
            level_size = len(queue)
            current_level = deque()

            for _ in range(level_size):
                node = queue.popleft()
                if left_to_right:
                    current_level.append(node.val)
                else:
                    current_level.appendleft(node.val)

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(list(current_level))
            left_to_right = not left_to_right

        return result

if __name__ == "__main__":
    root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
    print("Zigzag Level Order:", Solution.zigzagLevelOrder(root))  # Expected: [[3], [20, 9], [15, 7]]
