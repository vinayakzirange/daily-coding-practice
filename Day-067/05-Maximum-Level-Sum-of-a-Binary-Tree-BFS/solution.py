"""
Problem: Maximum Level Sum of a Binary Tree (LeetCode 1161)
Difficulty: Medium
Language: Python

Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

Example 1:
    Input: root = [1,7,0,7,-8,null,null]
    Output: 2
    Explanation: 
        Level 1 sum = 1.
        Level 2 sum = 7 + 0 = 7.
        Level 3 sum = 7 + -8 = -1.
        So we return the level with the maximum sum, which is level 2.

Example 2:
    Input: root = [989,null,10250,98697,-34358,null,null,null,-89388]
    Output: 2

Constraints:
    The number of nodes in the tree is in the range [1, 10^4].
    -10^5 <= Node.val <= 10^5
"""

from collections import deque
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxLevelSum(self, root: Optional[TreeNode]) -> int:
        """
        Finds the 1-indexed level with the maximal sum of node values using Breadth-First Search (BFS).
        
        Complexity:
            Time: O(N) - Visits every node in the binary tree exactly once.
            Space: O(W) - Queue stores at most W nodes at any time, where W <= N is the maximum tree width.
        """
        if not root:
            return 0

        max_sum = float('-inf')
        best_level = 1
        current_level = 1

        queue = deque([root])

        while queue:
            level_size = len(queue)
            level_sum = 0

            for _ in range(level_size):
                node = queue.popleft()
                level_sum += node.val

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            # Strictly greater ensures we return the smallest level index in case of ties
            if level_sum > max_sum:
                max_sum = level_sum
                best_level = current_level

            current_level += 1

        return best_level


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1 -> root = [1,7,0,7,-8,null,null]
    #         1
    #       /   \
    #      7     0
    #     / \
    #    7  -8
    root1 = TreeNode(1)
    root1.left = TreeNode(7, TreeNode(7), TreeNode(-8))
    root1.right = TreeNode(0)
    assert sol.maxLevelSum(root1) == 2, f"Test 1 Failed: {sol.maxLevelSum(root1)}"

    # Test 2: Single node tree
    root2 = TreeNode(100)
    assert sol.maxLevelSum(root2) == 1, "Test 2 Failed"

    # Test 3: All negative numbers
    #       -100
    #       /  \
    #    -200  -300
    # Level 1 sum: -100
    # Level 2 sum: -500
    # Max sum is -100 at level 1
    root3 = TreeNode(-100, TreeNode(-200), TreeNode(-300))
    assert sol.maxLevelSum(root3) == 1, "Test 3 Failed"

    # Test 4: Tie in sums (must return the smallest level index)
    #        5
    #       / \
    #      2   3
    # Level 1: 5
    # Level 2: 2 + 3 = 5
    # Smallest level index is 1
    root4 = TreeNode(5, TreeNode(2), TreeNode(3))
    assert sol.maxLevelSum(root4) == 1, "Test 4 Failed"

    # Test 5: Deep tree with maximum sum at lowest level
    root5 = TreeNode(1, None, TreeNode(2, None, TreeNode(50)))
    assert sol.maxLevelSum(root5) == 3, "Test 5 Failed"

    print("All Maximum Level Sum of a Binary Tree tests passed successfully!")

