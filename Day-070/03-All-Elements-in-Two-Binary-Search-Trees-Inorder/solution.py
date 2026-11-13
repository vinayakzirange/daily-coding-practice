"""
Problem: All Elements in Two Binary Search Trees (LeetCode 1305)
Difficulty: Medium
Language: Python

Given two binary search trees root1 and root2, return a list containing
all the integers from both trees sorted in ascending order.

Example 1:
    Input: root1 = [2,1,4], root2 = [1,0,3]
    Output: [0,1,1,2,3,4]

Example 2:
    Input: root1 = [1,null,8], root2 = [8,1]
    Output: [1,1,8,8]

Constraints:
    The number of nodes in each tree is in the range [0, 5000].
    -10^5 <= Node.val <= 10^5
"""

from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def getAllElements(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> List[int]:
        """
        Retrieves all elements sorted using In-Order BST Traversals followed by a Two-Pointer Merge.
        
        Complexity:
            Time: O(M + N) - In-order traversal of both trees takes O(M + N), and merging takes O(M + N).
            Space: O(M + N) - Result list and in-order value buffers.
        """
        list1: List[int] = []
        list2: List[int] = []

        def inorder(node: Optional[TreeNode], arr: List[int]) -> None:
            if not node:
                return
            inorder(node.left, arr)
            arr.append(node.val)
            inorder(node.right, arr)

        inorder(root1, list1)
        inorder(root2, list2)

        # Merge two sorted lists using two pointers
        merged: List[int] = []
        i, j = 0, 0
        n1, n2 = len(list1), len(list2)

        while i < n1 and j < n2:
            if list1[i] <= list2[j]:
                merged.append(list1[i])
                i += 1
            else:
                merged.append(list2[j])
                j += 1

        if i < n1:
            merged.extend(list1[i:])
        if j < n2:
            merged.extend(list2[j:])

        return merged


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    # Tree 1:   2       Tree 2:   1
    #          / \               / \
    #         1   4             0   3
    t1 = TreeNode(2, TreeNode(1), TreeNode(4))
    t2 = TreeNode(1, TreeNode(0), TreeNode(3))
    assert sol.getAllElements(t1, t2) == [0, 1, 1, 2, 3, 4], "Test 1 Failed"

    # Test 2: Example 2
    # Tree 1: 1 -> right: 8    Tree 2: 8 -> left: 1
    t3 = TreeNode(1, None, TreeNode(8))
    t4 = TreeNode(8, TreeNode(1))
    assert sol.getAllElements(t3, t4) == [1, 1, 8, 8], "Test 2 Failed"

    # Test 3: One tree is empty
    t5 = TreeNode(5, TreeNode(3), TreeNode(7))
    assert sol.getAllElements(t5, None) == [3, 5, 7], "Test 3 Failed"

    # Test 4: Both trees are empty
    assert sol.getAllElements(None, None) == [], "Test 4 Failed"

    # Test 5: Negative values
    t6 = TreeNode(-10)
    t7 = TreeNode(-5, TreeNode(-20), TreeNode(0))
    assert sol.getAllElements(t6, t7) == [-20, -10, -5, 0], "Test 5 Failed"

    print("All All Elements in Two Binary Search Trees tests passed successfully!")
