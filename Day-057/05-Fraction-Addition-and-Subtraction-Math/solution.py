r"""
====================================================================
Problem: Fraction Addition and Subtraction (LeetCode 592)
Difficulty: Medium
Topic: Math, String, Simulation
====================================================================

Given a string expression representing an expression of fraction
addition and subtraction, return the calculation result in string format.

The final result should be an irreducible fraction. If your final result
is an integer, say 2, you need to change it to the format of a fraction
that has a denominator 1. So in this case 2 should be converted to 2/1.

Example 1:
Input: expression = "-1/2+1/2"
Output: "0/1"

Example 2:
Input: expression = "-1/2+1/2+1/3"
Output: "1/3"

Example 3:
Input: expression = "1/3-1/2"
Output: "-1/6"

Constraints:
- The input string only contains '0' to '9', '/', '+' and '-'. So does the output.
- Each fraction (input and output) has the format ±numerator/denominator.
  If the first input fraction has no sign, it is treated as positive.
- The input only contains valid irreducible fractions, where the numerator
  and denominator of each fraction will always be in the range [1, 10].
  If the denominator is 1, it means this fraction is an integer in its fraction format.
- The number of given fractions will be in the range [1, 10].
- The numerator and denominator of the final result are guaranteed to fit in 32-bit int.
====================================================================
"""

import math
import re


class Solution:
    def fractionAddition(self, expression: str) -> str:
        """
        Parses signed fractions from the expression string and accumulates
        them by finding common denominators and reducing with greatest common divisor (GCD).

        Complexity:
        - Time: O(K log D) where K is number of fractions and D is maximum denominator
        - Space: O(1) auxiliary space beyond regex matches
        """
        # Find all fractions of format ±A/B
        tokens = re.findall(r"[+-]?\d+/\d+", expression)

        total_num = 0
        total_den = 1

        for token in tokens:
            num_str, den_str = token.split("/")
            num, den = int(num_str), int(den_str)

            # A/B + a/b = (A*b + a*B) / (B*b)
            total_num = total_num * den + num * total_den
            total_den = total_den * den

            # Reduce running fraction
            common = math.gcd(abs(total_num), total_den)
            total_num //= common
            total_den //= common

        return f"{total_num}/{total_den}"


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: "-1/2+1/2" -> "0/1"
    assert sol.fractionAddition("-1/2+1/2") == "0/1", "Test 1 failed"

    # Test 2: "-1/2+1/2+1/3" -> "1/3"
    assert sol.fractionAddition("-1/2+1/2+1/3") == "1/3", "Test 2 failed"

    # Test 3: "1/3-1/2" -> "-1/6"
    assert sol.fractionAddition("1/3-1/2") == "-1/6", "Test 3 failed"

    # Test 4: Single fraction "5/1" -> "5/1"
    assert sol.fractionAddition("5/1") == "5/1", "Test 4 failed"

    # Test 5: "1/1+1/1" -> "2/1"
    assert sol.fractionAddition("1/1+1/1") == "2/1", "Test 5 failed"

    print("All Fraction Addition and Subtraction tests passed successfully!")
