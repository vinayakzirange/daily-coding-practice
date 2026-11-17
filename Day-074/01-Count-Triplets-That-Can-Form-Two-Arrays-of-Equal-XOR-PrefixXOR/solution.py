"""
Problem: Count Triplets That Can Form Two Arrays of Equal XOR (LeetCode 1442)
Difficulty: Medium
Category: Array / Bit Manipulation / Prefix XOR

Description:
Given an array of integers arr.

We want to select three indices i, j and k where (0 <= i < j <= k < arr.length).

Let's define a and b as follows:
    a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
    b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]

Note that ^ denotes the bitwise-xor operation.

Return the number of triplets (i, j, k) where a == b.

Example 1:
    Input: arr = [2,3,1,6,7]
    Output: 4
    Explanation: The triplets are (0,1,2), (0,2,2), (2,3,4) and (2,4,4).

Example 2:
    Input: arr = [1,1,1,1,1]
    Output: 10

Constraints:
    - 1 <= arr.length <= 300
    - 1 <= arr[i] <= 10^8
"""

from typing import List


class Solution:
    def countTriplets(self, arr: List[int]) -> int:
        """
        Calculates triplets (i, j, k) with 0 <= i < j <= k < len(arr) such that:
            arr[i] ^ ... ^ arr[j-1] == arr[j] ^ ... ^ arr[k].

        Simple Invariant:
        If a == b, then a ^ b == 0, which means:
            arr[i] ^ ... ^ arr[k] == 0.
        Using prefix XOR: prefix[k + 1] ^ prefix[i] == 0  ==>  prefix[i] == prefix[k + 1].
        For any such valid (i, k) pair, any index j with i < j <= k forms a valid triplet.
        There are exactly (k - i) valid choices for j.

        Time Complexity: O(n^2)
        Space Complexity: O(n)
        """
        n = len(arr)
        prefix = [0] * (n + 1)
        for idx in range(n):
            prefix[idx + 1] = prefix[idx] ^ arr[idx]

        triplets_count = 0
        for i in range(n):
            for k in range(i + 1, n):
                if prefix[i] == prefix[k + 1]:
                    triplets_count += k - i

        return triplets_count


def run_tests():
    sol = Solution()

    # Test 1: Example 1
    assert sol.countTriplets([2, 3, 1, 6, 7]) == 4, "Test 1 Failed"

    # Test 2: Example 2 (all identical elements)
    assert sol.countTriplets([1, 1, 1, 1, 1]) == 10, "Test 2 Failed"

    # Test 3: Two elements equal -> 1 triplet
    assert sol.countTriplets([2, 2]) == 1, "Test 3 Failed"

    # Test 4: Two elements unequal -> 0 triplets
    assert sol.countTriplets([2, 3]) == 0, "Test 4 Failed"

    # Test 5: Three elements forming zero XOR
    assert sol.countTriplets([1, 2, 3]) == 2, "Test 5 Failed"

    print("All tests passed for 01-Count-Triplets-That-Can-Form-Two-Arrays-of-Equal-XOR-PrefixXOR!")


if __name__ == "__main__":
    run_tests()
