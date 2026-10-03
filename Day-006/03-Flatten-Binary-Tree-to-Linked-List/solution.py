"""
Problem Name: Flatten Binary Tree to Linked List
Problem Statement: Given the root of a binary tree, flatten the tree into a "linked list" in-place using right pointers.
The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and left pointer is always null.

Approach: Reverse Preorder Traversal (Right -> Left -> Root). Keep track of prev node.

Time Complexity: O(N)
Space Complexity: O(H) recursion stack
"""

from typing import Optional

class TreeNode:
    def __init__(self, val: int = 0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def __init__(self):
        self.prev = None

    def flatten(self, root: Optional[TreeNode]) -> None:
        if not root:
            return

        self.flatten(root.right)
        self.flatten(root.left)

        root.right = self.prev
        root.left = None
        self.prev = root

if __name__ == "__main__":
    root = TreeNode(1, TreeNode(2, TreeNode(3), TreeNode(4)), TreeNode(5, None, TreeNode(6)))
    sol = Solution()
    sol.flatten(root)

    curr = root
    print("Flattened List: ", end="")
    while curr:
        print(f"{curr.val} -> ", end="")
        curr = curr.right
    print("None")  # Expected: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> None
