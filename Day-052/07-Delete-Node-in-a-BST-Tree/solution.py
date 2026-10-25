"""
====================================================================
Problem: Delete Node in a BST (LeetCode 450)
Difficulty: Medium
Topic: Tree, Binary Search Tree, Binary Tree
====================================================================

Given a root node reference of a BST and a key, delete the node with
the given key in the BST. Return the root node reference (possibly updated)
of the BST.

Basically, the deletion can be divided into two stages:
1. Search for a node to remove.
2. If the node is found, delete the node.

Example 1:
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3
and delete it.
One valid answer is [5,4,6,2,null,null,7].
Another valid answer is [5,2,6,null,4,null,7].

Example 2:
Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value = 0.

Example 3:
Input: root = [], key = 0
Output: []

Constraints:
- The number of nodes in the tree is in the range [0, 10^4].
- -10^5 <= Node.val <= 10^5
- Each node has a unique value.
- root is a valid binary search tree.
- -10^5 <= key <= 10^5

Follow up: Could you solve it with time complexity O(height of tree)?
====================================================================
"""

from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        """
        Deletes a node from BST maintaining BST invariants:
        1. If key < root.val: root.left = deleteNode(root.left, key)
        2. If key > root.val: root.right = deleteNode(root.right, key)
        3. If key == root.val:
           - Case 1: Leaf node -> return None
           - Case 2: One child -> return non-empty child
           - Case 3: Two children -> find in-order successor (min node in right subtree),
                     copy successor's value to root, and recursively delete successor from right subtree.

        Time Complexity: O(h) where h is tree height
        Space Complexity: O(h) for recursion stack
        """
        if not root:
            return None

        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            # Node to delete found
            if not root.left:
                return root.right
            elif not root.right:
                return root.left

            # Node with two children: get in-order successor (min in right subtree)
            successor = root.right
            while successor.left:
                successor = successor.left

            root.val = successor.val
            root.right = self.deleteNode(root.right, successor.val)

        return root


# --- Test Suite ---
def tree_to_inorder(node: Optional[TreeNode]) -> List[int]:
    res = []
    def inorder(curr):
        if not curr:
            return
        inorder(curr.left)
        res.append(curr.val)
        inorder(curr.right)
    inorder(node)
    return res


if __name__ == "__main__":
    solver = Solution()

    # Build Tree: [5, 3, 6, 2, 4, null, 7]
    root1 = TreeNode(5)
    root1.left = TreeNode(3, TreeNode(2), TreeNode(4))
    root1.right = TreeNode(6, None, TreeNode(7))

    # Test 1: Delete node with two children: 3
    # Inorder before: [2, 3, 4, 5, 6, 7] -> Inorder after: [2, 4, 5, 6, 7]
    new_root1 = solver.deleteNode(root1, 3)
    in1 = tree_to_inorder(new_root1)
    assert in1 == [2, 4, 5, 6, 7], f"Test 1 failed: {in1}"
    print(f"Test 1 Passed: deleted 3 -> {in1}")

    # Test 2: Delete non-existent key: 0
    new_root2 = solver.deleteNode(new_root1, 0)
    assert tree_to_inorder(new_root2) == [2, 4, 5, 6, 7], "Test 2 failed"
    print("Test 2 Passed: non-existent key 0 unchanged")

    # Test 3: Delete leaf node: 7
    new_root3 = solver.deleteNode(new_root2, 7)
    assert tree_to_inorder(new_root3) == [2, 4, 5, 6], "Test 3 failed"
    print("Test 3 Passed: deleted leaf 7 -> [2, 4, 5, 6]")

    # Test 4: Delete root node: 5
    new_root4 = solver.deleteNode(new_root3, 5)
    assert tree_to_inorder(new_root4) == [2, 4, 6], "Test 4 failed"
    print("Test 4 Passed: deleted root 5 -> [2, 4, 6]")

    # Test 5: Empty tree
    assert solver.deleteNode(None, 10) is None, "Test 5 failed"
    print("Test 5 Passed: empty tree -> None")

    print("\nAll Delete Node in a BST tests passed successfully!")
