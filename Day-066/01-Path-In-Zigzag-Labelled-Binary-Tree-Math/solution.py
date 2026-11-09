"""
Problem: Path In Zigzag Labelled Binary Tree (LeetCode 1104)
Difficulty: Medium
Language: Python

In an infinite binary tree where every node has two children, the nodes are labelled in row order.
In the odd numbered rows (ie., the first, third, fifth,...), the labelling is left to right, 
while in the even numbered rows (second, fourth, sixth,...), the labelling is right to left.

Given the label of a node in this tree, return the labels in the path from the root of the tree to the node with that label.

Example 1:
    Input: label = 14
    Output: [1, 3, 4, 14]

Example 2:
    Input: label = 26
    Output: [1, 2, 6, 10, 26]

Constraints:
    1 <= label <= 10^6
"""

from typing import List


class Solution:
    def pathInZigZagTree(self, label: int) -> List[int]:
        """
        Finds path from root to target label in a zigzag labelled binary tree.
        
        Complexity:
            Time: O(log(label)) - Number of levels is at most ~20 for label <= 10^6.
            Space: O(log(label)) - To store the path of length equal to tree depth.
        """
        # Find the level/depth of the target label (0-indexed)
        level = 0
        while (1 << (level + 1)) - 1 < label:
            level += 1
            
        path = []
        curr = label
        
        while curr >= 1:
            path.append(curr)
            if curr == 1:
                break
            # Range of current level: [2^level, 2^(level+1) - 1]
            min_val = 1 << level
            max_val = (1 << (level + 1)) - 1
            # In a normal binary tree, parent of curr is curr // 2.
            # Due to zigzag inversion at alternating levels, the inverted value of curr
            # at this level is (min_val + max_val - curr).
            # The parent at the previous level corresponds to this inverted value // 2.
            curr = (min_val + max_val - curr) // 2
            level -= 1
            
        path.reverse()
        return path


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.pathInZigZagTree(14) == [1, 3, 4, 14], f"Test 1 Failed: {sol.pathInZigZagTree(14)}"

    # Test 2: Example 2
    assert sol.pathInZigZagTree(26) == [1, 2, 6, 10, 26], f"Test 2 Failed: {sol.pathInZigZagTree(26)}"

    # Test 3: Root element
    assert sol.pathInZigZagTree(1) == [1], f"Test 3 Failed: {sol.pathInZigZagTree(1)}"

    # Test 4: Node at level 1 (label 2 and 3)
    assert sol.pathInZigZagTree(2) == [1, 2], f"Test 4 Failed: {sol.pathInZigZagTree(2)}"
    assert sol.pathInZigZagTree(3) == [1, 3], f"Test 4 Failed: {sol.pathInZigZagTree(3)}"

    # Test 5: Node at level 3
    assert sol.pathInZigZagTree(16) == [1, 3, 4, 15, 16], f"Test 5 Failed: {sol.pathInZigZagTree(16)}"

    print("All Path In Zigzag Labelled Binary Tree tests passed successfully!")
