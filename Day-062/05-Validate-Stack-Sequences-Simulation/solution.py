r"""
LeetCode 946: Validate Stack Sequences (Medium)
https://leetcode.com/problems/validate-stack-sequences/

Given two integer arrays pushed and popped each with distinct values, return true
if this could have been the result of a sequence of push and pop operations on an
initially empty stack, or false otherwise.

Example 1:
Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
Explanation: We might do the following operations:
push(1), push(2), push(3), push(4), pop() -> 4,
push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1

Example 2:
Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
Output: false
Explanation: 1 cannot be popped before 2.

Constraints:
- 1 <= pushed.length <= 1000
- 0 <= pushed[i] <= 1000
- All the elements of pushed are unique.
- popped.length == pushed.length
- popped is a permutation of pushed.
"""

from typing import List


class Solution:
    def validateStackSequences(self, pushed: List[int], popped: List[int]) -> bool:
        """
        Greedy Stack Simulation:
        Iterate through elements in pushed, appending each to a simulation stack.
        After pushing, greedily pop from the stack as long as the stack is non-empty
        and the top element matches the next expected element in popped.

        If the entire sequence can be validated, the stack will be empty at the end.

        Time Complexity: O(N) where N is len(pushed) - each element is pushed and popped at most once.
        Space Complexity: O(N) for the simulation stack.
        """
        stack = []
        j = 0

        for val in pushed:
            stack.append(val)
            while stack and j < len(popped) and stack[-1] == popped[j]:
                stack.pop()
                j += 1

        return len(stack) == 0


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: Example 1
    assert sol.validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]) is True, "Test 1 Failed"

    # Test Case 2: Example 2
    assert sol.validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]) is False, "Test 2 Failed"

    # Test Case 3: Single element matching
    assert sol.validateStackSequences([1], [1]) is True, "Test 3 Failed"

    # Test Case 4: Reverse order pop (push 1,2,3, pop 3,2,1)
    assert sol.validateStackSequences([1, 2, 3], [3, 2, 1]) is True, "Test 4 Failed"

    # Test Case 5: Immediate pop each element (push 1 pop 1, push 2 pop 2)
    assert sol.validateStackSequences([1, 2, 3], [1, 2, 3]) is True, "Test 5 Failed"

    print("All Validate Stack Sequences tests passed successfully!")

