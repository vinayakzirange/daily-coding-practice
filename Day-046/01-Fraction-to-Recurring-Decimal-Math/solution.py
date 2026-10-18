"""
====================================================================
Problem: Fraction to Recurring Decimal (LeetCode 166)
Difficulty: Medium
Topic: Hash Table, Math, String
====================================================================

Given two integers representing the numerator and denominator of a
fraction, return the fraction in string format.

If the fractional part is repeating, enclose the repeating part in
parentheses.

If multiple answers are possible, return any of them.

It is guaranteed that the length of the answer string is less than 10^4
for all the given inputs.

Example 1:
Input: numerator = 1, denominator = 2
Output: "0.5"

Example 2:
Input: numerator = 2, denominator = 1
Output: "2"

Example 3:
Input: numerator = 4, denominator = 333
Output: "0.(012)"

Constraints:
- -2^31 <= numerator, denominator <= 2^31 - 1
- denominator != 0
====================================================================
"""

class Solution:
    def fractionToDecimal(self, numerator: int, denominator: int) -> str:
        """
        Computes fraction to decimal representation.
        Uses long division simulation and a hash map to detect repeating remainders.
        Time Complexity: O(denominator) bounded by precision <= 10^4
        Space Complexity: O(denominator) for hash map storing remainder positions
        """
        if numerator == 0:
            return "0"

        res = []

        # Determine sign
        if (numerator < 0) ^ (denominator < 0):
            res.append("-")

        num = abs(numerator)
        den = abs(denominator)

        # Integer part
        res.append(str(num // den))
        remainder = num % den

        if remainder == 0:
            return "".join(res)

        res.append(".")
        # Map: remainder -> index in res where decimal digit starts
        remainder_pos = {}

        while remainder != 0:
            if remainder in remainder_pos:
                idx = remainder_pos[remainder]
                res.insert(idx, "(")
                res.append(")")
                break

            remainder_pos[remainder] = len(res)
            remainder *= 10
            res.append(str(remainder // den))
            remainder %= den

        return "".join(res)


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: Simple terminating decimal
    assert solver.fractionToDecimal(1, 2) == "0.5", "Test 1 failed"
    print("Test 1 Passed: 1 / 2 = 0.5")

    # Test 2: Exact integer division
    assert solver.fractionToDecimal(2, 1) == "2", "Test 2 failed"
    print("Test 2 Passed: 2 / 1 = 2")

    # Test 3: Recurring decimal
    assert solver.fractionToDecimal(4, 333) == "0.(012)", "Test 3 failed"
    print("Test 3 Passed: 4 / 333 = 0.(012)")

    # Test 4: Negative numerator
    assert solver.fractionToDecimal(-1, 2) == "-0.5", "Test 4 failed"
    print("Test 4 Passed: -1 / 2 = -0.5")

    # Test 5: Negative denominator
    assert solver.fractionToDecimal(1, -2) == "-0.5", "Test 5 failed"
    print("Test 5 Passed: 1 / -2 = -0.5")

    # Test 6: Both negative
    assert solver.fractionToDecimal(-50, -8) == "6.25", "Test 6 failed"
    print("Test 6 Passed: -50 / -8 = 6.25")

    # Test 7: Repeating with non-repeating prefix
    assert solver.fractionToDecimal(1, 6) == "0.1(6)", "Test 7 failed"
    print("Test 7 Passed: 1 / 6 = 0.1(6)")

    # Test 8: Numerator 0
    assert solver.fractionToDecimal(0, 3) == "0", "Test 8 failed"
    print("Test 8 Passed: 0 / 3 = 0")

    print("\nAll Fraction to Recurring Decimal tests passed successfully!")
