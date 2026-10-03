"""
Problem: Decode Ways (LeetCode 91)
Language: Python
Difficulty: Medium
Time Complexity: O(N)
Space Complexity: O(N) or O(1)
"""

class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == '0':
            return 0

        n = len(s)
        dp = [0] * (n + 1)
        dp[0] = 1
        dp[1] = 1

        for i in range(2, n + 1):
            single_digit = int(s[i - 1:i])
            double_digit = int(s[i - 2:i])

            if 1 <= single_digit <= 9:
                dp[i] += dp[i - 1]

            if 10 <= double_digit <= 26:
                dp[i] += dp[i - 2]

        return dp[n]

if __name__ == "__main__":
    sol = Solution()
    print("Output ('12'):", sol.numDecodings("12"))    # 2 ("AB", "L")
    print("Output ('226'):", sol.numDecodings("226"))  # 3 ("BZ", "VF", "BBF")
    print("Output ('06'):", sol.numDecodings("06"))    # 0
