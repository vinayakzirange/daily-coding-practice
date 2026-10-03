"""
Problem: Evaluate Reverse Polish Notation (LeetCode 150)
Language: Python
Difficulty: Medium
Time Complexity: O(N)
Space Complexity: O(N)
"""

from typing import List

class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []
        for token in tokens:
            if token == '+':
                stack.append(stack.pop() + stack.pop())
            elif token == '-':
                b, a = stack.pop(), stack.pop()
                stack.append(a - b)
            elif token == '*':
                stack.append(stack.pop() * stack.pop())
            elif token == '/':
                b, a = stack.pop(), stack.pop()
                stack.append(int(a / b))  # truncate towards zero
            else:
                stack.append(int(token))
        return stack[0]

if __name__ == "__main__":
    sol = Solution()
    print("Output:", sol.evalRPN(["2", "1", "+", "3", "*"]))  # 9
    print("Output 2:", sol.evalRPN(["4", "13", "5", "/", "+"]))  # 6
