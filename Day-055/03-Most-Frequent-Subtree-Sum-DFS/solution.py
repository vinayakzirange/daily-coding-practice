r"""
====================================================================
Problem: Most Frequent Subtree Sum (LeetCode 508)
Difficulty: Medium
Topic: Hash Table, Tree, Depth-First Search, Binary Tree
====================================================================

Given the root of a binary tree, return the most frequent subtree sum.
If there is a tie, return all the values with the highest frequency
in any order.

The subtree sum of a node is the sum of all values for a subtree rooted
at that node, which includes the node itself and all its descendants.

Example 1:
      5
     / \
    2  -3
Subtree sums: 2, -3, 4 (5 + 2 + -3 = 4).
All occur 1 time, so return [2, -3, 4] in any order.

Example 2:
      5
     / \
    2  -5
Subtree sums: 2, -5, 2 (5 + 2 + -5 = 2).
2 occurs twice, -5 occurs once, return [2].

Constraints:
- The number of nodes in the tree is in the range [1, 10^4].
- -10^5 <= Node.val <= 10^5
====================================================================
"""

from collections import Counter
from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def findFrequentTreeSum(self, root: Optional[TreeNode]) -> List[int]:
        """
        Computes all subtree sums using bottom-up post-order DFS and
        finds the sum(s) with highest frequency.

        Complexity:
        - Time: O(N) where N is the number of nodes in the tree
        - Space: O(N) for frequency map and recursion call stack
        """
        if not root:
            return []

        counts = Counter()

        def post_order(node: Optional[TreeNode]) -> int:
            if not node:
                return 0

            left_sum = post_order(node.left)
            right_sum = post_order(node.right)
            curr_sum = node.val + left_sum + right_sum

            counts[curr_sum] += 1
            return curr_sum

        post_order(root)
        max_freq = max(counts.values())

        return [s for s, freq in counts.items() if freq == max_freq]


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: [5, 2, -3]
    t1 = TreeNode(5, TreeNode(2), TreeNode(-3))
    res1 = sol.findFrequentTreeSum(t1)
    assert sorted(res1) == sorted([2, -3, 4]), f"Test 1 failed: {res1}"

    # Test 2: [5, 2, -5]
    t2 = TreeNode(5, TreeNode(2), TreeNode(-5))
    res2 = sol.findFrequentTreeSum(t2)
    assert res2 == [2], f"Test 2 failed: {res2}"

    # Test 3: Single node [10]
    t3 = TreeNode(10)
    assert sol.findFrequentTreeSum(t3) == [10], "Test 3 failed"

    # Test 4: All zeros
    t4 = TreeNode(0, TreeNode(0), TreeNode(0))
    assert sol.findFrequentTreeSum(t4) == [0], "Test 4 failed"

    print("All Most Frequent Subtree Sum tests passed successfully!")
