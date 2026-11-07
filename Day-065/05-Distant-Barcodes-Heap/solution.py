r"""
LeetCode 1054: Distant Barcodes (Medium)
https://leetcode.com/problems/distant-barcodes/

In a warehouse, there is a row of barcodes, where the ith barcode is barcodes[i].

Rearrange the barcodes so that no two adjacent barcodes are equal. You may return any valid answer.
It is guaranteed that an answer exists.

Example 1:
Input: barcodes = [1,1,1,2,2,2]
Output: [2,1,2,1,2,1]

Example 2:
Input: barcodes = [1,1,1,1,2,2,3,3]
Output: [1,3,1,3,1,2,1,2]

Constraints:
- 1 <= barcodes.length <= 10000
- 1 <= barcodes[i] <= 10000
"""

from typing import List
from collections import Counter


class Solution:
    def rearrangeBarcodes(self, barcodes: List[int]) -> List[int]:
        """
        Greedy Interleaving Strategy:
        1. Count the frequencies of all barcodes.
        2. Sort unique barcodes by frequency in descending order.
        3. Fill the most frequent elements into alternating even indices (0, 2, 4, ...).
        4. Once the even indices are exhausted, wrap around to odd indices (1, 3, 5, ...).

        Because the problem guarantees a valid answer exists (max frequency <= (N + 1) // 2),
        the most frequent element will never collide with itself across adjacent indices.

        Time Complexity: O(N + K log K) where N is len(barcodes) and K is distinct barcodes.
        Space Complexity: O(N) for result and frequency counts.
        """
        n = len(barcodes)
        counts = Counter(barcodes)
        sorted_codes = sorted(counts.keys(), key=lambda c: counts[c], reverse=True)

        res = [0] * n
        idx = 0

        for code in sorted_codes:
            freq = counts[code]
            for _ in range(freq):
                res[idx] = code
                idx += 2
                if idx >= n:
                    idx = 1

        return res


def is_valid_barcodes(res: List[int], original: List[int]) -> bool:
    if sorted(res) != sorted(original):
        return False
    for i in range(len(res) - 1):
        if res[i] == res[i + 1]:
            return False
    return True


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: Example 1
    input1 = [1, 1, 1, 2, 2, 2]
    res1 = sol.rearrangeBarcodes(input1)
    assert is_valid_barcodes(res1, input1), f"Test 1 Failed: {res1}"

    # Test Case 2: Example 2
    input2 = [1, 1, 1, 1, 2, 2, 3, 3]
    res2 = sol.rearrangeBarcodes(input2)
    assert is_valid_barcodes(res2, input2), f"Test 2 Failed: {res2}"

    # Test Case 3: Single element
    input3 = [7]
    res3 = sol.rearrangeBarcodes(input3)
    assert is_valid_barcodes(res3, input3), f"Test 3 Failed: {res3}"

    # Test Case 4: Already alternating
    input4 = [1, 2, 1, 2]
    res4 = sol.rearrangeBarcodes(input4)
    assert is_valid_barcodes(res4, input4), f"Test 4 Failed: {res4}"

    # Test Case 5: Odd length with strict max frequency (n=5, max=3)
    input5 = [1, 1, 1, 2, 3]
    res5 = sol.rearrangeBarcodes(input5)
    assert is_valid_barcodes(res5, input5), f"Test 5 Failed: {res5}"

    print("All Distant Barcodes tests passed successfully!")
