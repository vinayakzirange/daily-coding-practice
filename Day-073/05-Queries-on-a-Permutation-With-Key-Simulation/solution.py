"""
Problem: Queries on a Permutation With Key (LeetCode 1409)
Difficulty: Medium
Category: Array / Simulation / Binary Indexed Tree

Description:
Given the array queries of positive integers between 1 and m, you have to
process all queries[i] (from i=0 to i=queries.length-1) according to the following rules:
- In the beginning, you have the permutation P = [1,2,3,...,m].
- For the current i, find the position of queries[i] in the permutation P
  (indexing from 0) and then move this at the beginning of the permutation P.
  Notice that the position of queries[i] in P is the result for queries[i].

Return an array containing the result for the given queries.

Example 1:
    Input: queries = [3,1,2,1], m = 5
    Output: [2,1,2,1]
    Explanation:
        - For i=0: queries[i]=3, P=[1,2,3,4,5], position of 3 in P is 2, then we move 3 to the beginning of P resulting in P=[3,1,2,4,5].
        - For i=1: queries[i]=1, P=[3,1,2,4,5], position of 1 in P is 1, then we move 1 to the beginning of P resulting in P=[1,3,2,4,5].
        - For i=2: queries[i]=2, P=[1,3,2,4,5], position of 2 in P is 2, then we move 2 to the beginning of P resulting in P=[2,1,3,4,5].
        - For i=3: queries[i]=1, P=[2,1,3,4,5], position of 1 in P is 1, then we move 1 to the beginning of P resulting in P=[1,2,3,4,5].
        Therefore, the array result is [2,1,2,1].

Example 2:
    Input: queries = [4,1,2,2], m = 4
    Output: [3,1,2,0]

Example 3:
    Input: queries = [7,5,5,8,3], m = 8
    Output: [6,5,0,7,5]

Constraints:
    - 1 <= m <= 10^3
    - 1 <= queries.length <= 10^3
    - 1 <= queries[i] <= m
"""

from typing import List


class Solution:
    def processQueries(self, queries: List[int], m: int) -> List[int]:
        """
        Processes permutation queries by simulating the move-to-front operation.

        Permutation P starts as [1, 2, ..., m].
        For each query:
            1. Find index of query key in P.
            2. Remove key from its position and insert at index 0.

        Time Complexity: O(q * m) where q = len(queries)
        Space Complexity: O(m)
        """
        p = list(range(1, m + 1))
        ans = []

        for q in queries:
            idx = p.index(q)
            ans.append(idx)
            # Move to front
            p.pop(idx)
            p.insert(0, q)

        return ans


def run_tests():
    sol = Solution()

    # Test 1: Example 1
    assert sol.processQueries([3, 1, 2, 1], 5) == [2, 1, 2, 1], "Test 1 Failed"

    # Test 2: Example 2
    assert sol.processQueries([4, 1, 2, 2], 4) == [3, 1, 2, 0], "Test 2 Failed"

    # Test 3: Example 3
    assert sol.processQueries([7, 5, 5, 8, 3], 8) == [6, 5, 0, 7, 5], "Test 3 Failed"

    # Test 4: Single element query
    assert sol.processQueries([1], 1) == [0], "Test 4 Failed"

    # Test 5: Repeated query of the same element
    assert sol.processQueries([2, 2, 2], 3) == [1, 0, 0], "Test 5 Failed"

    print("All tests passed for 05-Queries-on-a-Permutation-With-Key-Simulation!")


if __name__ == "__main__":
    run_tests()
