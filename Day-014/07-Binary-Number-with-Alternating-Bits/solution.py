"""
Problem: Binary Number with Alternating Bits
Topic: Bit Manipulation
Language: Python

Approach:
Shift n right by 1 (n >> 1) and XOR with n: x = n ^ (n >> 1).
If n has alternating bits, x will be all 1s (e.g. 101 ^ 010 = 111).
Check if (x & (x + 1)) == 0.

Time Complexity: O(1)
Space Complexity: O(1)
"""

class Solution:
    @staticmethod
    def hasAlternatingBits(n: int) -> bool:
        x = n ^ (n >> 1)
        return (x & (x + 1)) == 0

if __name__ == "__main__":
    print("5 (101) ->", Solution.hasAlternatingBits(5))    # True
    print("7 (111) ->", Solution.hasAlternatingBits(7))    # False
    print("11 (1011) ->", Solution.hasAlternatingBits(11))  # False
