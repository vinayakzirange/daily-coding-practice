"""
Problem: Delete Nodes And Return Forest (LeetCode 1110)
Difficulty: Medium
Language: Python

Given the root of a binary tree, each node in the tree has a distinct value.
After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).
Return the roots of the trees in the remaining forest. You may return the result in any order.

Example 1:
    Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
    Output: [[1,2,4],[6],[7]]

Example 2:
    Input: root = [1,2,4,null,3], to_delete = [3]
    Output: [[1,2,4]]

Constraints:
    The number of nodes in the given tree is at most 1000.
    Each node has a distinct value between 1 and 1000.
    to_delete.length <= 1000
    to_delete contains distinct values between 1 and 1000.
"""

from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: List[int]) -> List[TreeNode]:
        """
        Deletes nodes in to_delete and returns a forest of remaining disjoint trees.
        
        Complexity:
            Time: O(N) - Single post-order traversal visiting every node once.
            Space: O(H + D) - Recursion stack bounded by tree height H, plus set of D values to delete.
        """
        delete_set = set(to_delete)
        forest: List[TreeNode] = []

        def dfs(node: Optional[TreeNode], is_root: bool) -> Optional[TreeNode]:
            if not node:
                return None

            deleted = node.val in delete_set

            # If current node is a root and is not deleted, it belongs to the forest
            if is_root and not deleted:
                forest.append(node)

            # Children of a deleted node become roots of their own subtrees
            node.left = dfs(node.left, deleted)
            node.right = dfs(node.right, deleted)

            # Return None to disconnect this node from its parent if it is deleted
            return None if deleted else node

        dfs(root, is_root=True)
        return forest


def serialize_tree(root: Optional[TreeNode]) -> List[Optional[int]]:
    """Helper to serialize binary tree to level-order list for easy testing."""
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    while result and result[-1] is None:
        result.pop()
    return result


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1 -> root = [1,2,3,4,5,6,7], to_delete = [3,5]
    #         1
    #       /   \
    #      2     3
    #     / \   / \
    #    4   5 6   7
    root1 = TreeNode(1)
    root1.left = TreeNode(2, TreeNode(4), TreeNode(5))
    root1.right = TreeNode(3, TreeNode(6), TreeNode(7))

    forest1 = sol.delNodes(root1, [3, 5])
    trees1 = sorted([serialize_tree(t) for t in forest1])
    # Expected roots: 1 (with 2->4), 6, 7
    expected1 = sorted([[1, 2, None, 4], [6], [7]])
    assert trees1 == expected1, f"Test 1 Failed: {trees1} != {expected1}"

    # Test 2: Example 2 -> root = [1,2,4,null,3], to_delete = [3]
    root2 = TreeNode(1, TreeNode(2, None, TreeNode(3)), TreeNode(4))
    forest2 = sol.delNodes(root2, [3])
    trees2 = sorted([serialize_tree(t) for t in forest2])
    expected2 = sorted([[1, 2, 4]])
    assert trees2 == expected2, f"Test 2 Failed: {trees2} != {expected2}"

    # Test 3: Delete root itself
    root3 = TreeNode(1, TreeNode(2), TreeNode(3))
    forest3 = sol.delNodes(root3, [1])
    trees3 = sorted([serialize_tree(t) for t in forest3])
    expected3 = sorted([[2], [3]])
    assert trees3 == expected3, f"Test 3 Failed: {trees3} != {expected3}"

    # Test 4: Delete all nodes
    root4 = TreeNode(1, TreeNode(2))
    forest4 = sol.delNodes(root4, [1, 2])
    assert len(forest4) == 0, f"Test 4 Failed: {forest4}"

    # Test 5: Delete nothing
    root5 = TreeNode(1, TreeNode(2))
    forest5 = sol.delNodes(root5, [99])
    assert len(forest5) == 1 and serialize_tree(forest5[0]) == [1, 2], "Test 5 Failed"

    print("All Delete Nodes And Return Forest tests passed successfully!")
