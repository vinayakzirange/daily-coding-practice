"""
Problem: Decode String (LeetCode 394)
Difficulty: Medium
Topic: String / Stack / Recursion

Description:
Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the
square brackets is being repeated exactly k times. Note that k is guaranteed
to be a positive integer.

You may assume that the input string is always valid; there are no extra white
spaces, square brackets are well-formed, etc. Furthermore, you may assume that
the original data does not contain any digits and that digits are only for those
repeat numbers, k. For example, there will not be input like 3a or 2[4].

The test cases are generated so that the length of the output will never exceed 10^5.

Example 1:
Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Example 2:
Input: s = "3[a2[c]]"
Output: "accaccacc"

Example 3:
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"

Constraints:
- 1 <= s.length <= 30
- s consists of lowercase English letters, digits, and square brackets '[]'.
- s is guaranteed to be a valid input.
- All the integers in s are in the range [1, 300].

Complexity Analysis:
- Time Complexity: O(max_k * count + len(s)) proportional to the size of decoded string.
- Space Complexity: O(m) where m is the depth of nesting of brackets in the stack.
"""


class Solution:
    def decodeString(self, s: str) -> str:
        stack = []  # Stores tuples of (prev_string, repeat_count)
        current_str = ""
        current_num = 0

        for char in s:
            if char.isdigit():
                current_num = current_num * 10 + int(char)
            elif char == "[":
                # Push the accumulated string context and count to stack
                stack.append((current_str, current_num))
                current_str = ""
                current_num = 0
            elif char == "]":
                # Pop previous context and repeat count
                prev_str, repeat_count = stack.pop()
                current_str = prev_str + current_str * repeat_count
            else:
                current_str += char

        return current_str


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ("3[a]2[bc]", "aaabcbc"),
        ("3[a2[c]]", "accaccacc"),
        ("2[abc]3[cd]ef", "abcabccdcdcdef"),
        ("abc3[cd]xyz", "abccdcdcdxyz"),
        ("10[a]", "aaaaaaaaaa"),
        ("2[2[y]pq4[2[jk]e]]", "yypqjkjkejkjkejkjkejkjkeyypqjkjkejkjkejkjkejkjke"),
    ]

    for idx, (s, expected) in enumerate(test_cases, 1):
        res = sol.decodeString(s)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: s='{s}' -> decoded = '{res[:30]}...'")

    print("\nAll Decode String tests passed successfully!")
