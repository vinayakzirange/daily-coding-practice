"""
Problem Name: Serialize and Deserialize Binary Tree
Problem Statement: Serialization is converting a data structure into a sequence of bits/strings.
Design an algorithm to serialize and deserialize a binary tree.

Approach: Preorder DFS Traversal. Use 'X' or 'null' for None nodes, separated by commas.

Time Complexity: O(N)
Space Complexity: O(N)
"""

from collections import deque
from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        vals = []
        def dfs(node):
            if not node:
                vals.append("X")
                return
            vals.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(vals)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        queue = deque(data.split(","))

        def dfs():
            val = queue.popleft()
            if val == "X":
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node

        return dfs()

if __name__ == "__main__":
    codec = Codec()
    root = TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4), TreeNode(5)))
    serialized = codec.serialize(root)
    print("Serialized:", serialized)
    deserialized = codec.deserialize(serialized)
    print("Deserialized Root Value:", deserialized.val if deserialized else None)  # Expected: 1
