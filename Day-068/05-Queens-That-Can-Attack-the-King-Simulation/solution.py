"""
Problem: Queens That Can Attack the King (LeetCode 1222)
Difficulty: Medium
Language: Python

On an 8x8 chessboard, there can be multiple black queens and one white king.
Given an array of integer coordinates queens that represents the positions of the black queens,
and a pair of coordinates king that represents the position of the white king,
return the coordinates of all the queens (in any order) that can directly attack the king.

A queen can attack the king if:
    - It is in the same row, column, or diagonal as the king.
    - There are no other queens between it and the king.

Example 1:
    Input: queens = [[0,1],[1,0],[4,0],[0,4],[3,3],[2,4]], king = [0,0]
    Output: [[0,1],[1,0],[3,3]]

Example 2:
    Input: queens = [[0,0],[1,1],[2,2],[3,4],[3,5],[4,4],[4,5]], king = [3,3]
    Output: [[2,2],[3,4],[4,4]]

Constraints:
    1 <= queens.length <= 63
    queens[i].length == 2
    0 <= queens[i][j] < 8
    king.length == 2
    0 <= king[0], king[1] < 8
    At most one piece occupies any cell.
"""

from typing import List


class Solution:
    def queensAttacktheKing(self, queens: List[List[int]], king: List[int]) -> List[List[int]]:
        """
        Simulates ray tracing in all 8 directions from the king to find the first queen in each line of sight.
        
        Complexity:
            Time: O(1) - Board size is fixed 8x8; each of the 8 directions traverses at most 7 steps.
            Space: O(Q) where Q = len(queens) <= 63 for the queen coordinate hash set.
        """
        queen_set = {(r, c) for r, c in queens}
        kr, kc = king
        res = []

        # 8 possible directions: N, S, W, E, NW, NE, SW, SE
        directions = [
            (-1, 0), (1, 0), (0, -1), (0, 1),
            (-1, -1), (-1, 1), (1, -1), (1, 1)
        ]

        for dr, dc in directions:
            r, c = kr + dr, kc + dc
            while 0 <= r < 8 and 0 <= c < 8:
                if (r, c) in queen_set:
                    res.append([r, c])
                    break  # This queen blocks any further queens in this direction
                r += dr
                c += dc

        return res


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    q1 = [[0, 1], [1, 0], [4, 0], [0, 4], [3, 3], [2, 4]]
    k1 = [0, 0]
    res1 = sorted(sol.queensAttacktheKing(q1, k1))
    assert res1 == sorted([[0, 1], [1, 0], [3, 3]]), f"Test 1 Failed: {res1}"

    # Test 2: Example 2
    q2 = [[0, 0], [1, 1], [2, 2], [3, 4], [3, 5], [4, 4], [4, 5]]
    k2 = [3, 3]
    res2 = sorted(sol.queensAttacktheKing(q2, k2))
    assert res2 == sorted([[2, 2], [3, 4], [4, 4]]), f"Test 2 Failed: {res2}"

    # Test 3: No queens can attack
    q3 = []
    k3 = [4, 4]
    assert sol.queensAttacktheKing(q3, k3) == [], "Test 3 Failed"

    # Test 4: All 8 directions blocked by immediately adjacent queens
    q4 = [[3, 4], [5, 4], [4, 3], [4, 5], [3, 3], [3, 5], [5, 3], [5, 5]]
    k4 = [4, 4]
    res4 = sorted(sol.queensAttacktheKing(q4, k4))
    assert res4 == sorted(q4), "Test 4 Failed"

    print("All Queens That Can Attack the King tests passed successfully!")
