"""
Problem: Break a Palindrome (LeetCode 1328)
Difficulty: Medium
Language: Python

Given a palindromic string of lowercase English letters palindrome, replace exactly
one character with any lowercase English letter so that the resulting string is not
a palindrome and that it is the lexicographically smallest one possible.

Return the resulting string. If there is no way to do so, return the empty string "".

Example 1:
    Input: palindrome = "abccba"
    Output: "aaccba"
    Explanation: There are many ways to make "abccba" not a palindrome, such as "zbccba", "aaccba", and "abacba".
                 Of all the ways, "aaccba" is the lexicographically smallest.

Example 2:
    Input: palindrome = "a"
    Output: ""
    Explanation: There is no way to replace a single character to make "a" not a palindrome, so return "".

Constraints:
    1 <= palindrome.length <= 1000
    palindrome consists of only lowercase English letters.
"""


class Solution:
    def breakPalindrome(self, palindrome: str) -> str:
        """
        Greedily replaces first non-'a' character in first half with 'a', or changes last char to 'b'.
        
        Complexity:
            Time: O(N) - Checks at most N // 2 characters.
            Space: O(N) - To construct the returned string.
        """
        n = len(palindrome)
        if n <= 1:
            return ""

        chars = list(palindrome)

        # Greedily change the first non-'a' in the first half to 'a'
        for i in range(n // 2):
            if chars[i] != 'a':
                chars[i] = 'a'
                return "".join(chars)

        # If all characters in the first half are 'a', change the very last character to 'b'
        chars[-1] = 'b'
        return "".join(chars)


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1
    assert sol.breakPalindrome("abccba") == "aaccba", f"Test 1 Failed: {sol.breakPalindrome('abccba')}"

    # Test 2: Example 2 (Length 1 -> impossible)
    assert sol.breakPalindrome("a") == "", "Test 2 Failed"

    # Test 3: All 'a's odd length "aba" -> "abb"
    assert sol.breakPalindrome("aba") == "abb", f"Test 3 Failed: {sol.breakPalindrome('aba')}"

    # Test 4: All 'a's even length "aa" -> "ab"
    assert sol.breakPalindrome("aa") == "ab", f"Test 4 Failed: {sol.breakPalindrome('aa')}"

    # Test 5: "aabaa" -> middle character change wouldn't break palindrome, so changes last to 'b' -> "aabab"
    assert sol.breakPalindrome("aabaa") == "aabab", f"Test 5 Failed: {sol.breakPalindrome('aabaa')}"

    print("All Break a Palindrome tests passed successfully!")
