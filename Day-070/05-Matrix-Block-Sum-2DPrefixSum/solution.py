"""
Problem: Matrix Block Sum (LeetCode 1314)
Difficulty: Medium
Language: Python

Given a m x n matrix mat and an integer k, return a matrix answer where each answer[i][j]
is the sum of all elements mat[r][c] for:
    i - k <= r <= i + k,
    j - k <= c <= j + k, and
    (r, c) is a valid position in the matrix.

Example 1:
    Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
    Output: [[12,21,16],[27,45,33],[24,39,28]]

Example 2:
    Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2
    Output: [[45,45,45],[45,45,45],[45,45,45]]

Constraints:
    m == mat.length
    n == mat[i].length
    1 <= m, n, k <= 100
    1 <= mat[i][j] <= 100
"""

from typing import List


class Solution:
    def matrixBlockSum(self, mat: List[List[int]], k: int) -> List[List[int]]:
        """
        Computes the k-radius block sums using a 2D Prefix Sum Array.
        
        Complexity:
            Time: O(M * N) - O(M*N) to precompute prefix sums and O(1) per cell query.
            Space: O(M * N) - Auxiliary 2D prefix table.
        """
        m, n = len(mat), len(mat[0])

        # 2D prefix sum table of size (m + 1) x (n + 1)
        pref = [[0] * (n + 1) for _ in range(m + 1)]
        for r in range(m):
            for c in range(n):
                pref[r + 1][c + 1] = (
                    mat[r][c] 
                    + pref[r][c + 1] 
                    + pref[r + 1][c] 
                    - pref[r][c]
                )

        ans = [[0] * n for _ in range(m)]

        for i in range(m):
            for j in range(n):
                r1 = max(0, i - k)
                r2 = min(m - 1, i + k)
                c1 = max(0, j - k)
                c2 = min(n - 1, j + k)

                # Inclusion-exclusion on 2D prefix sum table
                ans[i][j] = (
                    pref[r2 + 1][c2 + 1]
                    - pref[r1][c2 + 1]
                    - pref[r2 + 1][c1]
                    + pref[r1][c1]
                )

        return ans


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    m1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    res1 = sol.matrixBlockSum(m1, 1)
    expected1 = [[12, 21, 16], [27, 45, 33], [24, 39, 28]]
    assert res1 == expected1, f"Test 1 Failed: {res1}"

    # Test 2: Example 2
    res2 = sol.matrixBlockSum(m1, 2)
    expected2 = [[45, 45, 45], [45, 45, 45], [45, 45, 45]]
    assert res2 == expected2, f"Test 2 Failed: {res2}"

    # Test 3: k = 0 (each cell is just its own value)
    res3 = sol.matrixBlockSum(m1, 0)
    assert res3 == m1, "Test 3 Failed"

    # Test 4: 1x1 matrix
    res4 = sol.matrixBlockSum([[7]], 5)
    assert res4 == [[7]], "Test 4 Failed"

    print("All Matrix Block Sum tests passed successfully!")
