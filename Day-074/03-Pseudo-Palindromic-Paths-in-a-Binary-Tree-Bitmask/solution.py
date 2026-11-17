"""
Problem: Pseudo-Palindromic Paths in a Binary Tree (LeetCode 1457)
Difficulty: Medium
Category: Tree / Depth-First Search / Bit Manipulation

Description:
Given a binary tree where node values are digits from 1 to 9. A path in the binary
tree is said to be pseudo-palindromic if at least one permutation of the node values
in the path is a palindrome.

Return the number of pseudo-palindromic paths going from the root node to leaf nodes.

Example 1:
    Input: root = [2,3,1,3,1,null,1]
    Output: 2
    Explanation: The paths are [2,3,3], [2,1,1], [2,3,1].
                 - [2,3,3] can be rearranged to [3,2,3] (palindrome).
                 - [2,1,1] can be rearranged to [1,2,1] (palindrome).
                 - [2,3,1] cannot form a palindrome.
                 Total pseudo-palindromic paths = 2.

Example 2:
    Input: root = [2,1,1,1,3,null,null,null,null,null,1]
    Output: 1

Example 3:
    Input: root = [9]
    Output: 1

Constraints:
    - The number of nodes in the tree is in the range [1, 10^5].
    - 1 <= Node.val <= 9
"""

from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        """
        Counts root-to-leaf paths whose values can form a palindrome.

        Simple Bitmask Logic:
        A sequence can form a palindrome if and only if at most one digit
        has an odd frequency.
        We can track odd/even parities of digits 1-9 using a 10-bit integer mask.
        Each node flips the bit corresponding to its value: mask ^= (1 << node.val).
        At a leaf, mask has at most one bit set iff (mask & (mask - 1)) == 0.

        Time Complexity: O(n)
        Space Complexity: O(h) where h is the height of the tree.
        """
        def dfs(node: Optional[TreeNode], mask: int) -> int:
            if not node:
                return 0

            mask ^= (1 << node.val)

            # If leaf node, check if at most one bit is set
            if not node.left and not node.right:
                return 1 if (mask & (mask - 1)) == 0 else 0

            return dfs(node.left, mask) + dfs(node.right, mask)

        return dfs(root, 0)


def run_tests():
    sol = Solution()

    # Test 1: Example 1 -> paths [2,3,3], [2,1,1], [2,3,1] -> 2 valid
    #         2
    #        / \
    #       3   1
    #      / \   \
    #     3   1   1
    t1 = TreeNode(2,
                  TreeNode(3, TreeNode(3), TreeNode(1)),
                  TreeNode(1, None, TreeNode(1)))
    assert sol.pseudoPalindromicPaths(t1) == 2, "Test 1 Failed"

    # Test 2: Single node -> always 1 valid palindrome
    t2 = TreeNode(9)
    assert sol.pseudoPalindromicPaths(t2) == 1, "Test 2 Failed"

    # Test 3: Path where all digits are identical: 2 -> 2 -> 2
    t3 = TreeNode(2, TreeNode(2, TreeNode(2)), None)
    assert sol.pseudoPalindromicPaths(t3) == 1, "Test 3 Failed"

    # Test 4: Path where all digits are distinct (length 3): 1 -> 2 -> 3
    t4 = TreeNode(1, TreeNode(2, TreeNode(3)), None)
    assert sol.pseudoPalindromicPaths(t4) == 0, "Test 4 Failed"

    # Test 5: Symmetric even-pair tree: 1 -> 1 and 1 -> 1 (both paths [1, 1] are palindromes)
    #      1
    #     / \
    #    1   1
    t5 = TreeNode(1, TreeNode(1), TreeNode(1))
    assert sol.pseudoPalindromicPaths(t5) == 2, "Test 5 Failed"

    print("All tests passed for 03-Pseudo-Palindromic-Paths-in-a-Binary-Tree-Bitmask!")


if __name__ == "__main__":
    run_tests()
