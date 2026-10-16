"""
Problem: Edit Distance (LeetCode 72)
Difficulty: Medium
Topic: String / Dynamic Programming

Description:
Given two strings word1 and word2, return the minimum number of operations
required to convert word1 to word2.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

Example 1:
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

Example 2:
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')

Constraints:
- 0 <= word1.length, word2.length <= 500
- word1 and word2 consist of lowercase English letters.

Complexity Analysis:
- Time Complexity: O(m * n) where m = len(word1) and n = len(word2).
- Space Complexity: O(n) space-optimized 1D rolling DP array.
"""


class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)

        # dp[j] stores the edit distance between word1[0:i] and word2[0:j]
        dp = list(range(n + 1))

        for i in range(1, m + 1):
            prev_diagonal = dp[0]
            dp[0] = i

            for j in range(1, n + 1):
                temp = dp[j]
                if word1[i - 1] == word2[j - 1]:
                    dp[j] = prev_diagonal
                else:
                    dp[j] = 1 + min(
                        dp[j],  # Deletion from word1
                        dp[j - 1],  # Insertion into word1
                        prev_diagonal,  # Replacement
                    )
                prev_diagonal = temp

        return dp[n]


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ("horse", "ros", 3),
        ("intention", "execution", 5),
        ("", "", 0),
        ("a", "", 1),
        ("", "abc", 3),
        ("kitten", "sitting", 3),
        ("flaw", "lawn", 2),
    ]

    for idx, (w1, w2, expected) in enumerate(test_cases, 1):
        res = sol.minDistance(w1, w2)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: '{w1}' -> '{w2}' = {res} operations")

    print("\nAll Edit Distance tests passed successfully!")
