r"""
LeetCode 894: All Possible Full Binary Trees (Medium)
https://leetcode.com/problems/all-possible-full-binary-trees/

Given an integer n, return a list of all possible full binary trees with n nodes.
Each node of each tree in the answer must have Node.val == 0.

Each element of the answer is the root node of one possible tree. You may return the
final list of trees in any order.

A full binary tree is a binary tree where each node has exactly 0 or 2 children.

Example 1:
Input: n = 7
Output: 5 possible full binary trees.

Example 2:
Input: n = 3
Output: [[0,0,0]]

Constraints:
- 1 <= n <= 20
"""

from typing import List, Optional, Dict


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def __init__(self):
        self.memo: Dict[int, List[Optional[TreeNode]]] = {}

    def allPossibleFBT(self, n: int) -> List[Optional[TreeNode]]:
        """
        Recursive construction with memoization:
        - A full binary tree always has an odd number of nodes. If n is even, return [].
        - Base case: n == 1 -> single root TreeNode(0).
        - For odd n > 1:
            The root takes 1 node.
            Left subtree can have i nodes (where i is odd, 1 <= i < n).
            Right subtree has j = (n - 1 - i) nodes.
            Combine every valid left subtree with every valid right subtree.

        Time Complexity: O(2^n / n^(3/2)) corresponding to Catalan numbers.
        Space Complexity: O(2^n / n^(3/2)) for storing unique tree structures.
        """
        if n % 2 == 0:
            return []
        if n == 1:
            return [TreeNode(0)]
        if n in self.memo:
            return self.memo[n]

        result = []
        for i in range(1, n, 2):
            j = n - 1 - i
            left_subtrees = self.allPossibleFBT(i)
            right_subtrees = self.allPossibleFBT(j)

            for left in left_subtrees:
                for right in right_subtrees:
                    root = TreeNode(0, left, right)
                    result.append(root)

        self.memo[n] = result
        return result


def count_nodes(root: Optional[TreeNode]) -> int:
    if not root:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)


def is_fbt(root: Optional[TreeNode]) -> bool:
    if not root:
        return True
    if (root.left is None and root.right is not None) or (root.left is not None and root.right is None):
        return False
    return is_fbt(root.left) and is_fbt(root.right)


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: n = 7 -> exactly 5 trees
    trees7 = sol.allPossibleFBT(7)
    assert len(trees7) == 5, f"Test 1 Failed: got {len(trees7)}, expected 5"
    for t in trees7:
        assert count_nodes(t) == 7 and is_fbt(t)

    # Test Case 2: n = 3 -> 1 tree
    trees3 = sol.allPossibleFBT(3)
    assert len(trees3) == 1, f"Test 2 Failed: got {len(trees3)}, expected 1"
    assert count_nodes(trees3[0]) == 3 and is_fbt(trees3[0])

    # Test Case 3: n is even -> impossible for FBT
    trees4 = sol.allPossibleFBT(4)
    assert len(trees4) == 0, f"Test 3 Failed: expected 0, got {len(trees4)}"

    # Test Case 4: n = 1 -> 1 tree
    trees1 = sol.allPossibleFBT(1)
    assert len(trees1) == 1 and count_nodes(trees1[0]) == 1

    # Test Case 5: n = 5 -> 2 trees
    trees5 = sol.allPossibleFBT(5)
    assert len(trees5) == 2, f"Test 5 Failed: got {len(trees5)}, expected 2"

    print("All All Possible Full Binary Trees tests passed successfully!")

