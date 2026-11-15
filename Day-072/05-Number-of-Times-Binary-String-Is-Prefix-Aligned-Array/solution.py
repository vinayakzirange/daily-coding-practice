"""
Problem: Number of Times Binary String Is Prefix-Aligned (LeetCode 1375)
Difficulty: Medium
Category: Array / Simulation

Description:
You have an 1-indexed binary string of length n where all bits are initially zero.
We will apply n operations. In the ith operation (0-indexed), you flip the bit
at index flips[i] (i.e. flips[i] becomes 1).

A binary string is prefix-aligned if, after the ith step, all the bits from
1 to x are set to 1 and all other bits from x + 1 to n are set to 0
(where x is the number of operations performed, so x = i + 1).

Return the number of times the binary string is prefix-aligned.

Example 1:
    Input: flips = [3,2,4,1,5]
    Output: 2
    Explanation:
        - Step 1: "00100", not aligned.
        - Step 2: "01100", not aligned.
        - Step 3: "01110", not aligned.
        - Step 4: "11110", prefix-aligned (x = 4, first 4 bits are 1).
        - Step 5: "11111", prefix-aligned (x = 5, first 5 bits are 1).
        Total prefix-aligned times = 2.

Example 2:
    Input: flips = [4,1,2,3]
    Output: 1
    Explanation: The binary string is prefix-aligned only after the 4th step.

Constraints:
    - n == flips.length
    - 1 <= n <= 5 * 10^4
    - flips is a permutation of the integers in the range [1, n].
"""

from typing import List


class Solution:
    def numTimesAllBlue(self, flips: List[int]) -> int:
        """
        Calculates the number of times the binary string is prefix-aligned.

        Observation:
        At step i (0-indexed), exactly (i + 1) numbers have been flipped.
        Since flips is a permutation of [1, n], the flipped bits will occupy
        exactly the prefix [1, i + 1] if and only if the maximum index flipped
        so far equals (i + 1).

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        aligned_count = 0
        max_flipped = 0

        for i, flip in enumerate(flips):
            if flip > max_flipped:
                max_flipped = flip
            if max_flipped == i + 1:
                aligned_count += 1

        return aligned_count


def run_tests():
    sol = Solution()

    # Test 1: Standard example
    assert sol.numTimesAllBlue([3, 2, 4, 1, 5]) == 2, "Test 1 Failed"

    # Test 2: Only prefix-aligned at the very end
    assert sol.numTimesAllBlue([4, 1, 2, 3]) == 1, "Test 2 Failed"

    # Test 3: Already sorted permutation (aligned at every step)
    assert sol.numTimesAllBlue([1, 2, 3, 4, 5]) == 5, "Test 3 Failed"

    # Test 4: Single element
    assert sol.numTimesAllBlue([1]) == 1, "Test 4 Failed"

    # Test 5: Reverse permutation (only aligned at the end)
    assert sol.numTimesAllBlue([5, 4, 3, 2, 1]) == 1, "Test 5 Failed"

    # Test 6: Intermediate alignments
    assert sol.numTimesAllBlue([2, 1, 3, 5, 4]) == 3, "Test 6 Failed"

    print("All tests passed for 05-Number-of-Times-Binary-String-Is-Prefix-Aligned-Array!")


if __name__ == "__main__":
    run_tests()
