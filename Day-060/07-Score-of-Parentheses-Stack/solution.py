r"""
LeetCode 856: Score of Parentheses (Medium)
https://leetcode.com/problems/score-of-parentheses/

Given a balanced parentheses string s, return the score of the string.

The score of a balanced parentheses string is based on the following rule:
- "()" has score 1.
- AB has score A + B, where A and B are balanced parentheses strings.
- (A) has score 2 * A, where A is a balanced parentheses string.

Example 1:
Input: s = "()"
Output: 1

Example 2:
Input: s = "(())"
Output: 2

Example 3:
Input: s = "()()"
Output: 2

Example 4:
Input: s = "(()(()))"
Output: 6

Constraints:
- 2 <= s.length <= 50
- s consists of only '(' and ')'.
- s is a balanced parentheses string.
"""


class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        """
        Stack-based approach:
        Maintain a stack with an initial 0 representing the score at the outer layer.
        - When encountering '(': push 0 representing the score of this new inner scope.
        - When encountering ')': pop the score v of the completed inner scope.
          If v == 0, it was an empty pair "()", which scores 1.
          Otherwise, it was "(A)", which scores 2 * v.
          Add this score (max(2 * v, 1)) to the enclosing scope at the top of the stack.

        Time Complexity: O(N) where N is the length of string s.
        Space Complexity: O(N) for the stack.
        """
        stack = [0]

        for ch in s:
            if ch == "(":
                stack.append(0)
            else:
                v = stack.pop()
                stack[-1] += max(2 * v, 1)

        return stack[0]


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: single pair
    assert sol.scoreOfParentheses("()") == 1

    # Test Case 2: nested pair
    assert sol.scoreOfParentheses("(())") == 2

    # Test Case 3: adjacent pairs
    assert sol.scoreOfParentheses("()()") == 2

    # Test Case 4: complex nesting
    assert sol.scoreOfParentheses("(()(()))") == 6

    # Test Case 5: deeply nested (((()))) = 8
    assert sol.scoreOfParentheses("(((())))") == 8

    print("All Score of Parentheses tests passed successfully!")
