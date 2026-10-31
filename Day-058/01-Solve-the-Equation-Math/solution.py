r"""
====================================================================
Problem: Solve the Equation (LeetCode 640)
Difficulty: Medium
Topic: Math, String, Simulation
====================================================================

Solve a given equation and return the value of 'x' in the form of a
string "x=#value". The equation contains only '+', '-' operation,
the variable 'x' and its coefficient, and the integers.

If there is no solution for the equation, return "No solution".
If there are infinite solutions for the equation, return "Infinite solutions".

If there is exactly one solution for the equation, we ensure that
the value of 'x' is an integer.

Example 1:
Input: equation = "x+5-3+x=6+x-2"
Output: "x=2"

Example 2:
Input: equation = "x=x"
Output: "Infinite solutions"

Example 3:
Input: equation = "2x=x"
Output: "x=0"

Constraints:
- 3 <= equation.length <= 1000
- equation has exactly one '='.
- equation consists of integers with an absolute value in the range [0, 100]
  without any leading zeros, and the variable 'x'.
====================================================================
"""

import re


class Solution:
    def solveEquation(self, equation: str) -> str:
        """
        Parses both sides of the linear equation into coefficients of x
        and constants, reducing the equation to:
            total_x * x = total_const

        Complexity:
        - Time: O(N) where N is the length of the equation
        - Space: O(N) for parsed token lists
        """
        left_side, right_side = equation.split("=")

        def parse_side(expr: str):
            coeff_x = 0
            const_val = 0
            # Matches signed tokens like '+3x', '-x', '5', '+x', '-10'
            tokens = re.findall(r"[+-]?[0-9]*x|[+-]?[0-9]+", expr)

            for token in tokens:
                if not token:
                    continue
                if token.endswith("x"):
                    num_part = token[:-1]
                    if num_part == "" or num_part == "+":
                        coeff_x += 1
                    elif num_part == "-":
                        coeff_x -= 1
                    else:
                        coeff_x += int(num_part)
                else:
                    const_val += int(token)

            return coeff_x, const_val

        lx, lc = parse_side(left_side)
        rx, rc = parse_side(right_side)

        # Move x to left, constants to right:
        # (lx - rx) * x = rc - lc
        total_x = lx - rx
        total_const = rc - lc

        if total_x == 0:
            if total_const == 0:
                return "Infinite solutions"
            return "No solution"

        return f"x={total_const // total_x}"


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: "x+5-3+x=6+x-2" -> "x=2"
    assert sol.solveEquation("x+5-3+x=6+x-2") == "x=2", "Test 1 failed"

    # Test 2: "x=x" -> "Infinite solutions"
    assert sol.solveEquation("x=x") == "Infinite solutions", "Test 2 failed"

    # Test 3: "2x=x" -> "x=0"
    assert sol.solveEquation("2x=x") == "x=0", "Test 3 failed"

    # Test 4: "x=x+2" -> "No solution"
    assert sol.solveEquation("x=x+2") == "No solution", "Test 4 failed"

    # Test 5: "2x+4=4-x" -> 3x = 0 -> "x=0"
    assert sol.solveEquation("2x+4=4-x") == "x=0", "Test 5 failed"

    # Test 6: "-x=-1" -> "x=1"
    assert sol.solveEquation("-x=-1") == "x=1", "Test 6 failed"

    print("All Solve the Equation tests passed successfully!")
