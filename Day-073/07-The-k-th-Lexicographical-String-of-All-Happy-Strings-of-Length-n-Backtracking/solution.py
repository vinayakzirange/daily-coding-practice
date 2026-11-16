"""
Problem: The k-th Lexicographical String of All Happy Strings of Length n (LeetCode 1415)
Difficulty: Medium
Category: String / Backtracking / Recursion / Combinatorics

Description:
A happy string is a string that:
- consists only of letters of the set ['a', 'b', 'c'].
- s[i] != s[i + 1] for all values from 1 to s.length - 1 (string is 1-indexed).

For example, strings "abc", "ac", "b" and "abcbabcbcb" are all happy strings
and strings "aa", "baa" and "ababbc" are not happy strings.

Given two integers n and k, consider a list of all happy strings of length n
sorted in lexicographical order.

Return the kth string of this list or return an empty string "" if there are
less than k happy strings of length n.

Example 1:
    Input: n = 1, k = 3
    Output: "c"
    Explanation: The list ["a", "b", "c"] contains all happy strings of length 1. The third string is "c".

Example 2:
    Input: n = 1, k = 4
    Output: ""
    Explanation: There are only 3 happy strings of length 1.

Example 3:
    Input: n = 3, k = 9
    Output: "cab"
    Explanation: There are 12 different happy strings of length 3:
                 ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "caa", "cab", "cba", "cbc"].
                 Wait: Note that "caa" is not happy ("aa").
                 The 12 happy strings of length 3 are:
                 ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"].
                 The 9th string is "cab".

Constraints:
    - 1 <= n <= 10
    - 1 <= k <= 100
"""


class Solution:
    def getHappyString(self, n: int, k: int) -> str:
        """
        Finds the k-th lexicographical happy string of length n.

        Combinatorics:
        - First character has 3 choices ('a', 'b', 'c').
        - Each subsequent position has 2 choices (any letter different from the preceding one).
        - Total number of happy strings of length n = 3 * 2^(n - 1).
        - If k > 3 * 2^(n - 1), return "".

        We can generate them in lexicographical order via backtracking and stop at the k-th string.

        Time Complexity: O(min(k, 3 * 2^(n-1)) * n)
        Space Complexity: O(n) for recursion depth
        """
        total = 3 * (1 << (n - 1))
        if k > total:
            return ""

        happy_strings = []

        def backtrack(curr: list):
            if len(curr) == n:
                happy_strings.append("".join(curr))
                return

            last_char = curr[-1] if curr else ""
            for ch in ('a', 'b', 'c'):
                if ch != last_char:
                    curr.append(ch)
                    backtrack(curr)
                    if len(happy_strings) == k:
                        return
                    curr.pop()

        backtrack([])
        return happy_strings[k - 1] if len(happy_strings) >= k else ""


def run_tests():
    sol = Solution()

    # Test 1: n = 1, k = 3
    assert sol.getHappyString(1, 3) == "c", "Test 1 Failed"

    # Test 2: n = 1, k = 4 (out of bounds)
    assert sol.getHappyString(1, 4) == "", "Test 2 Failed"

    # Test 3: n = 3, k = 9
    assert sol.getHappyString(3, 9) == "cab", "Test 3 Failed"

    # Test 4: n = 2, k = 1 -> "ab"
    assert sol.getHappyString(2, 1) == "ab", "Test 4 Failed"

    # Test 5: n = 2, k = 6 -> "cb"
    assert sol.getHappyString(2, 6) == "cb", "Test 5 Failed"

    # Test 6: n = 2, k = 7 -> ""
    assert sol.getHappyString(2, 7) == "", "Test 6 Failed"

    print("All tests passed for 07-The-k-th-Lexicographical-String-of-All-Happy-Strings-of-Length-n-Backtracking!")


if __name__ == "__main__":
    run_tests()
