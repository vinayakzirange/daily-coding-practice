"""
Problem: Balance a Binary Search Tree (LeetCode 1382)
Difficulty: Medium
Category: Binary Search Tree / Depth-First Search / Divide and Conquer

Description:
Given the root of a binary search tree, return a balanced binary search tree
with the same node values. If there is more than one answer, return any of them.

A binary search tree is balanced if the depth of the two subtrees of every
node never differs by more than 1.

Example 1:
    Input: root = [1,null,2,null,3,null,4,null,null]
    Output: [2,1,3,null,null,null,4] (or [3,1,4,null,2])
    Explanation: This is not the only correct answer, [3,1,4,null,2] is also accepted.

Example 2:
    Input: root = [2,1,3]
    Output: [2,1,3]

Constraints:
    - The number of nodes in the tree is in the range [1, 10^4].
    - 1 <= Node.val <= 10^5
"""

from typing import Optional, List


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def balanceBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        """
        Rebalances an arbitrary BST into a height-balanced BST.

        Strategy:
        1. In-order traversal to extract all node values in sorted ascending order.
        2. Divide-and-conquer construction: recursively pick the middle element as
           the root, constructing left and right subtrees from the halves.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Step 1: In-order traversal
        sorted_vals: List[int] = []

        def inorder(node: Optional[TreeNode]):
            if not node:
                return
            inorder(node.left)
            sorted_vals.append(node.val)
            inorder(node.right)

        inorder(root)

        # Step 2: Build balanced BST from sorted array
        def build_balanced(left: int, right: int) -> Optional[TreeNode]:
            if left > right:
                return None
            mid = (left + right) // 2
            curr = TreeNode(sorted_vals[mid])
            curr.left = build_balanced(left, mid - 1)
            curr.right = build_balanced(mid + 1, right)
            return curr

        return build_balanced(0, len(sorted_vals) - 1)


def is_balanced(node: Optional[TreeNode]) -> (bool, int):
    """Helper to verify height-balanced property."""
    if not node:
        return True, 0
    balanced_l, h_l = is_balanced(node.left)
    balanced_r, h_r = is_balanced(node.right)
    if not balanced_l or not balanced_r or abs(h_l - h_r) > 1:
        return False, 0
    return True, 1 + max(h_l, h_r)


def inorder_collect(node: Optional[TreeNode]) -> List[int]:
    """Helper to verify in-order values match original sorted values."""
    res = []

    def dfs(n):
        if not n:
            return
        dfs(n.left)
        res.append(n.val)
        dfs(n.right)

    dfs(node)
    return res


def run_tests():
    sol = Solution()

    # Test 1: Completely skewed tree: 1 -> 2 -> 3 -> 4
    t1 = TreeNode(1, None, TreeNode(2, None, TreeNode(3, None, TreeNode(4))))
    balanced1 = sol.balanceBST(t1)
    is_bal, _ = is_balanced(balanced1)
    assert is_bal is True, "Test 1 Failed: Not balanced"
    assert inorder_collect(balanced1) == [1, 2, 3, 4], "Test 1 Failed: Values corrupted"

    # Test 2: Already balanced tree: [2, 1, 3]
    t2 = TreeNode(2, TreeNode(1), TreeNode(3))
    balanced2 = sol.balanceBST(t2)
    is_bal2, _ = is_balanced(balanced2)
    assert is_bal2 is True, "Test 2 Failed: Not balanced"
    assert inorder_collect(balanced2) == [1, 2, 3], "Test 2 Failed: Values corrupted"

    # Test 3: Single node tree
    t3 = TreeNode(50)
    balanced3 = sol.balanceBST(t3)
    is_bal3, _ = is_balanced(balanced3)
    assert is_bal3 is True, "Test 3 Failed"
    assert inorder_collect(balanced3) == [50], "Test 3 Failed"

    # Test 4: Larger skewed tree (values 1 through 15)
    curr = None
    for v in reversed(range(1, 16)):
        curr = TreeNode(v, None, curr)
    balanced4 = sol.balanceBST(curr)
    is_bal4, h4 = is_balanced(balanced4)
    assert is_bal4 is True, "Test 4 Failed: Not balanced"
    assert h4 <= 4, f"Test 4 Failed: Height {h4} exceeds ceil(log2(16)) = 4"
    assert inorder_collect(balanced4) == list(range(1, 16)), "Test 4 Failed: Values corrupted"

    print("All tests passed for 07-Balance-a-Binary-Search-Tree-BST!")


if __name__ == "__main__":
    run_tests()
