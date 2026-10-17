"""
Problem: Convert Sorted List to Binary Search Tree (LeetCode 109)
Difficulty: Medium
Topic: Linked List / Divide and Conquer / Tree / Binary Search Tree / Binary Tree

Description:
Given the head of a singly linked list where elements are sorted in ascending order,
convert it to a height-balanced binary search tree.

A height-balanced binary tree is a binary tree in which the depth of the two
subtrees of every node never differs by more than one.

Example 1:
Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the
shown height balanced BST.

Example 2:
Input: head = []
Output: []

Constraints:
- The number of nodes in head is in the range [0, 2 * 10^4].
- -10^5 <= Node.val <= 10^5

Complexity Analysis:
- Time Complexity: O(n log n) finding the middle element at each recursive step.
- Space Complexity: O(log n) recursion call stack for balanced tree construction.
"""

from typing import List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
        if not head:
            return None
        if not head.next:
            return TreeNode(head.val)

        # Find the middle node using slow and fast pointers
        prev = None
        slow = head
        fast = head

        while fast and fast.next:
            prev = slow
            slow = slow.next
            fast = fast.next.next

        # Disconnect the left half from the middle node
        if prev:
            prev.next = None

        # Middle node becomes the root of this balanced subtree
        root = TreeNode(slow.val)

        # Recursively construct left and right subtrees
        root.left = self.sortedListToBST(head)
        root.right = self.sortedListToBST(slow.next)

        return root


# ==========================================
# Helpers for Testing
# ==========================================
def create_linked_list(arr: List[int]) -> Optional[ListNode]:
    dummy = ListNode(0)
    curr = dummy
    for x in arr:
        curr.next = ListNode(x)
        curr = curr.next
    return dummy.next


def bst_to_inorder(root: Optional[TreeNode]) -> List[int]:
    result = []

    def inorder(node):
        if not node:
            return
        inorder(node.left)
        result.append(node.val)
        inorder(node.right)

    inorder(root)
    return result


def is_balanced(root: Optional[TreeNode]) -> bool:
    def height(node):
        if not node:
            return 0
        lh = height(node.left)
        rh = height(node.right)
        if lh == -1 or rh == -1 or abs(lh - rh) > 1:
            return -1
        return 1 + max(lh, rh)

    return height(root) != -1


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([-10, -3, 0, 5, 9]),
        ([]),
        ([0]),
        ([1, 2, 3, 4, 5, 6, 7]),
        ([-5, -3, -1, 1, 3, 5]),
    ]

    for idx, arr in enumerate(test_cases, 1):
        ll = create_linked_list(arr)
        bst = sol.sortedListToBST(ll)

        # Check that inorder traversal reproduces original sorted array
        inorder = bst_to_inorder(bst)
        assert (
            inorder == arr
        ), f"Test {idx} Failed: Inorder mismatch, got {inorder}, expected {arr}"

        # Check height balance
        assert is_balanced(
            bst
        ), f"Test {idx} Failed: Generated tree is not height-balanced!"
        print(f"Test {idx} Passed: list={arr} -> balanced BST verified")

    print(
        "\nAll Convert Sorted List to Binary Search Tree tests passed successfully!"
    )
