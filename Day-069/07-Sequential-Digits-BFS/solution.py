"""
Problem: Sequential Digits (LeetCode 1291)
Difficulty: Medium
Language: Python

An integer has sequential digits if and only if each digit in the number is one more than the previous digit.
Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.

Example 1:
    Input: low = 100, high = 300
    Output: [123, 234]

Example 2:
    Input: low = 1000, high = 13000
    Output: [1234, 2345, 3456, 4567, 5678, 6789, 12345]

Constraints:
    10 <= low <= high <= 10^9
"""

from collections import deque
from typing import List


class Solution:
    def sequentialDigits(self, low: int, high: int) -> List[int]:
        """
        Generates all valid sequential digits in range [low, high] using Queue / BFS.
        
        Complexity:
            Time: O(1) - There are only at most 36 possible sequential numbers up to 10^9.
            Space: O(1) - Queue holds at most 9 numbers at any time.
        """
        result = []
        queue = deque(range(1, 10))

        while queue:
            num = queue.popleft()

            if low <= num <= high:
                result.append(num)

            last_digit = num % 10
            # Can only append next sequential digit if last_digit < 9
            if last_digit < 9:
                next_num = num * 10 + (last_digit + 1)
                if next_num <= high:
                    queue.append(next_num)

        return result


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.sequentialDigits(100, 300) == [123, 234], f"Test 1 Failed: {sol.sequentialDigits(100, 300)}"

    # Test 2: Example 2
    assert sol.sequentialDigits(1000, 13000) == [1234, 2345, 3456, 4567, 5678, 6789, 12345], "Test 2 Failed"

    # Test 3: Range with only one sequential number [300, 400] -> [345]
    assert sol.sequentialDigits(300, 400) == [345], "Test 3 Failed"

    # Test 4: Range with truly no sequential digits
    assert sol.sequentialDigits(346, 455) == [], "Test 4 Failed"

    # Test 4: Single match
    assert sol.sequentialDigits(12, 12) == [12], "Test 4 Failed"

    # Test 5: Entire domain [10, 10^9]
    all_seq = sol.sequentialDigits(10, 10**9)
    assert len(all_seq) == 36, f"Expected 36 total sequential numbers, got {len(all_seq)}"

    print("All Sequential Digits tests passed successfully!")
