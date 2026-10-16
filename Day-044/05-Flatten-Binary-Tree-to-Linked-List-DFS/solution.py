"""
Problem: Flatten Binary Tree to Linked List (LeetCode 114)
Difficulty: Medium
Topic: Linked List / Stack / Tree / Depth-First Search / Binary Tree

Description:
Given the root of a binary tree, flatten the tree into a "linked list":
- The "linked list" should use the same TreeNode class where the right child pointer
  points to the next node in the list and the left child pointer is always null.
- The "linked list" should be in the same order as a pre-order traversal of the
  binary tree.

Example 1:
Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [0]
Output: [0]

Constraints:
- The number of nodes in the tree is in the range [0, 2000].
- -100 <= Node.val <= 100

Follow-up: Can you flatten the tree in-place (with O(1) extra space)?

Complexity Analysis:
- Time Complexity: O(n) each node is processed at most twice in Morris traversal.
- Space Complexity: O(1) true in-place restructuring without recursion stack.
"""

from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        Uses O(1) space Morris-style pointer rewiring.
        """
        curr = root

        while curr:
            if curr.left:
                # Find the rightmost node in the left subtree
                predecessor = curr.left
                while predecessor.right:
                    predecessor = predecessor.right

                # Wire predecessor's right to current's right subtree
                predecessor.right = curr.right

                # Move left subtree to the right
                curr.right = curr.left
                curr.left = None

            # Move to next node in the flattened right spine
            curr = curr.right


# ==========================================
# Helpers for Testing
# ==========================================
def build_tree(arr: List) -> Optional[TreeNode]:
    if not arr:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        curr = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            curr.left = TreeNode(arr[i])
            queue.append(curr.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            curr.right = TreeNode(arr[i])
            queue.append(curr.right)
        i += 1
    return root


def tree_to_linked_list_vals(root: Optional[TreeNode]) -> List:
    vals = []
    curr = root
    while curr:
        assert (
            curr.left is None
        ), f"Node {curr.val} still has non-null left child!"
        vals.append(curr.val)
        curr = curr.right
    return vals


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([1, 2, 5, 3, 4, None, 6], [1, 2, 3, 4, 5, 6]),
        ([], []),
        ([0], [0]),
        ([1, 2, None, 3], [1, 2, 3]),
        ([1, None, 2, 3], [1, 2, 3]),
    ]

    for idx, (arr, expected) in enumerate(test_cases, 1):
        root = build_tree(arr)
        sol.flatten(root)
        result = tree_to_linked_list_vals(root)
        assert (
            result == expected
        ), f"Test {idx} Failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: {arr} -> flattened={result}")

    print(
        "\nAll Flatten Binary Tree to Linked List tests passed successfully!"
    )
