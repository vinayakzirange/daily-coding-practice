"""
Problem: Minimum Cost Tree From Leaf Values (LeetCode 1130)
Difficulty: Medium
Language: Python

Given an array arr of positive integers, consider the (full) binary trees where:
    - Each node has either 0 or 2 children;
    - The values of arr correspond to the values of each leaf in an in-order traversal of the tree.
    - The value of each non-leaf node is equal to the product of the largest leaf value in its left and right subtree, respectively.

Among all possible binary trees considering all possible ways to partition arr,
return the smallest possible sum of the values of each non-leaf node.

Example 1:
    Input: arr = [6, 2, 4]
    Output: 32
    Explanation: There are two possible trees. The first has non-leaf nodes 2*4=8 and 6*4=24, sum = 32.
                 The second has non-leaf nodes 6*2=12 and 6*4=24, sum = 36. Minimum is 32.

Example 2:
    Input: arr = [4, 11]
    Output: 44

Constraints:
    2 <= arr.length <= 40
    1 <= arr[i] <= 15
    It is guaranteed that the answer fits into a 32-bit signed integer (ie. it is less than 2^31).
"""

from typing import List


class Solution:
    def mctFromLeafValues(self, arr: List[int]) -> int:
        """
        Calculates the minimum cost tree non-leaf sum using a monotonic decreasing stack.
        
        Greedy intuition:
            We want smaller leaf nodes to be eliminated as deep as possible.
            When a leaf node is strictly smaller than both its neighbors, we should
            pair it with min(left_neighbor, right_neighbor) to produce the smallest
            intermediate non-leaf cost.
            
        Complexity:
            Time: O(N) - Every element is pushed and popped from the stack at most once.
            Space: O(N) - Monotonic stack storage.
        """
        # Sentinel infinity on top of stack simplifies boundary handling
        stack = [float('inf')]
        total_cost = 0

        for x in arr:
            # When x is larger than stack top, the stack top is a local minimum
            while stack[-1] <= x:
                mid = stack.pop()
                total_cost += mid * min(stack[-1], x)
            stack.append(x)

        # Process remaining elements in decreasing stack
        while len(stack) > 2:
            total_cost += stack.pop() * stack[-1]

        return int(total_cost)


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.mctFromLeafValues([6, 2, 4]) == 32, f"Test 1 Failed: {sol.mctFromLeafValues([6, 2, 4])}"

    # Test 2: Example 2
    assert sol.mctFromLeafValues([4, 11]) == 44, f"Test 2 Failed: {sol.mctFromLeafValues([4, 11])}"

    # Test 3: Strictly increasing array
    assert sol.mctFromLeafValues([1, 2, 3, 4]) == 20, f"Test 3 Failed: {sol.mctFromLeafValues([1, 2, 3, 4])}"

    # Test 4: Strictly decreasing array
    assert sol.mctFromLeafValues([4, 3, 2, 1]) == 20, f"Test 4 Failed: {sol.mctFromLeafValues([4, 3, 2, 1])}"

    # Test 5: All elements identical
    # [3, 3, 3] -> pair two 3s (cost 9), remaining 3 and 3 (cost 9) -> total 18
    assert sol.mctFromLeafValues([3, 3, 3]) == 18, f"Test 5 Failed: {sol.mctFromLeafValues([3, 3, 3])}"

    print("All Minimum Cost Tree From Leaf Values tests passed successfully!")
