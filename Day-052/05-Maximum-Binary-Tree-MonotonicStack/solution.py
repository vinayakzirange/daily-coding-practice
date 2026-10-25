"""
====================================================================
Problem: Maximum Binary Tree (LeetCode 654)
Difficulty: Medium
Topic: Array, Divide and Conquer, Stack, Tree, Monotonic Stack, Binary Tree
====================================================================

You are given an integer array nums with no duplicates. A maximum
binary tree can be built recursively from nums using the following
algorithm:
1. Create a root node whose value is the maximum value in nums.
2. Recursively build the left subtree on the subarray prefix to the
   left of the maximum value.
3. Recursively build the right subtree on the subarray suffix to the
   right of the maximum value.

Return the maximum binary tree built from nums.

Example 1:
Input: nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,1]

Example 2:
Input: nums = [3,2,1]
Output: [3,null,2,null,1]

Constraints:
- 1 <= nums.length <= 1000
- 0 <= nums[i] <= 1000
- All integers in nums are unique.
====================================================================
"""

from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def constructMaximumBinaryTree(self, nums: List[int]) -> Optional[TreeNode]:
        """
        Monotonic Decreasing Stack for O(n) construction (Cartesian Tree):
        We maintain a stack of TreeNodes with decreasing values.
        For each num:
        - Pop nodes smaller than num; the last popped node becomes the left child of num.
        - If the stack is not empty, num becomes the right child of stack top.
        - Push num to stack.
        The bottom of the stack (first element) is the root of the tree.

        Time Complexity: O(n) each node pushed and popped at most once
        Space Complexity: O(n) for stack
        """
        stack = []

        for num in nums:
            curr = TreeNode(num)

            # Pop nodes smaller than current num
            while stack and stack[-1].val < num:
                curr.left = stack.pop()

            # If stack still has a larger node, curr becomes its right child
            if stack:
                stack[-1].right = curr

            stack.append(curr)

        return stack[0] if stack else None


# --- Test Suite ---
def tree_to_inorder(root: Optional[TreeNode]) -> List[int]:
    res = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        res.append(node.val)
        inorder(node.right)
    inorder(root)
    return res


if __name__ == "__main__":
    solver = Solution()

    # Test 1: [3, 2, 1, 6, 0, 5]
    # Root must be 6, and in-order traversal of Cartesian tree must reproduce original nums!
    nums1 = [3, 2, 1, 6, 0, 5]
    root1 = solver.constructMaximumBinaryTree(nums1)
    assert root1.val == 6, "Test 1 root failed"
    assert tree_to_inorder(root1) == nums1, "Test 1 inorder failed"
    print(f"Test 1 Passed: {nums1} -> root=6, inorder matches")

    # Test 2: [3, 2, 1]
    nums2 = [3, 2, 1]
    root2 = solver.constructMaximumBinaryTree(nums2)
    assert root2.val == 3 and tree_to_inorder(root2) == nums2, "Test 2 failed"
    print(f"Test 2 Passed: {nums2} -> root=3, right skewed")

    # Test 3: [1, 2, 3]
    nums3 = [1, 2, 3]
    root3 = solver.constructMaximumBinaryTree(nums3)
    assert root3.val == 3 and tree_to_inorder(root3) == nums3, "Test 3 failed"
    print(f"Test 3 Passed: {nums3} -> root=3, left skewed")

    # Test 4: Single element [42]
    root4 = solver.constructMaximumBinaryTree([42])
    assert root4.val == 42 and not root4.left and not root4.right, "Test 4 failed"
    print("Test 4 Passed: [42] -> single node root")

    print("\nAll Maximum Binary Tree tests passed successfully!")
