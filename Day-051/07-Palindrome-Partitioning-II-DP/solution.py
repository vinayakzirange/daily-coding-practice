"""
====================================================================
Problem: Palindrome Partitioning II (LeetCode 132)
Difficulty: Hard (Solved in Medium Practice)
Topic: String, Dynamic Programming
====================================================================

Given a string s, partition s such that every substring of the
partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of s.

Example 1:
Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.

Example 2:
Input: s = "a"
Output: 0

Example 3:
Input: s = "ab"
Output: 1

Constraints:
- 1 <= s.length <= 2000
- s consists of lowercase English letters only.
====================================================================
"""

class Solution:
    def minCut(self, s: str) -> int:
        """
        Two-stage Dynamic Programming:
        1. Precompute is_pal[i][j] in O(n^2) where is_pal[i][j] indicates whether s[i:j+1] is a palindrome.
        2. min_cuts[i] = min cuts needed for s[0:i+1].
           If s[0:i+1] is a palindrome, min_cuts[i] = 0.
           Otherwise, min_cuts[i] = min(min_cuts[j] + 1) for all j < i such that s[j+1:i+1] is a palindrome.

        Time Complexity: O(n^2)
        Space Complexity: O(n^2) for palindrome table (or O(n) expanding around centers)
        """
        n = len(s)
        if n <= 1:
            return 0

        # min_cuts[i] stores min cuts for s[0:i+1]
        # Worst case: i cuts (every single char is cut)
        min_cuts = list(range(n))

        # Expand around center for both odd and even lengths
        for mid in range(n):
            # Odd length palindromes centered at mid
            left = mid
            right = mid
            while left >= 0 and right < n and s[left] == s[right]:
                cuts = 0 if left == 0 else min_cuts[left - 1] + 1
                if cuts < min_cuts[right]:
                    min_cuts[right] = cuts
                left -= 1
                right += 1

            # Even length palindromes centered between mid and mid + 1
            left = mid
            right = mid + 1
            while left >= 0 and right < n and s[left] == s[right]:
                cuts = 0 if left == 0 else min_cuts[left - 1] + 1
                if cuts < min_cuts[right]:
                    min_cuts[right] = cuts
                left -= 1
                right += 1

        return min_cuts[n - 1]


# --- Test Suite ---
if __name__ == "__main__":
    solver = Solution()

    # Test 1: "aab" -> 1 ("aa" | "b")
    assert solver.minCut("aab") == 1, "Test 1 failed"
    print("Test 1 Passed: 'aab' -> 1")

    # Test 2: "a" -> 0
    assert solver.minCut("a") == 0, "Test 2 failed"
    print("Test 2 Passed: 'a' -> 0")

    # Test 3: "ab" -> 1
    assert solver.minCut("ab") == 1, "Test 2 failed"
    print("Test 3 Passed: 'ab' -> 1")

    # Test 4: Already a palindrome: "racecar" -> 0
    assert solver.minCut("racecar") == 0, "Test 4 failed"
    print("Test 4 Passed: 'racecar' -> 0")

    # Test 5: All distinct letters: "abcdef" -> 5
    assert solver.minCut("abcdef") == 5, "Test 5 failed"
    print("Test 5 Passed: 'abcdef' -> 5")

    # Test 6: Repeating characters: "aaaa" -> 0
    assert solver.minCut("aaaa") == 0, "Test 6 failed"
    print("Test 6 Passed: 'aaaa' -> 0")

    print("\nAll Palindrome Partitioning II tests passed successfully!")
