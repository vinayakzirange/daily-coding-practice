r"""
LeetCode 984: String Without AAA or BBB (Medium)
https://leetcode.com/problems/string-without-aaa-or-bbb/

Given two integers a and b, return any string s such that:
- s has length a + b and contains exactly a 'a' letters, and exactly b 'b' letters,
- The substring 'aaa' does not occur in s, and
- The substring 'bbb' does not occur in s.

Example 1:
Input: a = 1, b = 2
Output: "abb"
Explanation: "abb", "bab" and "bba" are all correct answers.

Example 2:
Input: a = 4, b = 1
Output: "aabaa"

Constraints:
- 0 <= a, b <= 100
- It is guaranteed such an s exists for the given a and b.
"""


class Solution:
    def strWithout3a3b(self, a: int, b: int) -> str:
        """
        Greedy Construction:
        At each step, decide whether to append 'a' or 'b':
        1. If the last two characters in our result are 'a's, we MUST append 'b'.
        2. If the last two characters in our result are 'b's, we MUST append 'a'.
        3. Otherwise, append whichever character has a strictly greater remaining count
           (or 'a' if counts are equal).

        Time Complexity: O(a + b)
        Space Complexity: O(a + b) to construct the result string.
        """
        res = []

        while a > 0 or b > 0:
            write_a = False

            if len(res) >= 2 and res[-1] == res[-2]:
                if res[-1] == "a":
                    write_a = False
                else:
                    write_a = True
            else:
                write_a = (a >= b)

            if write_a:
                res.append("a")
                a -= 1
            else:
                res.append("b")
                b -= 1

        return "".join(res)


def validate_result(s: str, expected_a: int, expected_b: int) -> bool:
    if s.count("a") != expected_a or s.count("b") != expected_b:
        return False
    if "aaa" in s or "bbb" in s:
        return False
    return True


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: a = 1, b = 2
    res1 = sol.strWithout3a3b(1, 2)
    assert validate_result(res1, 1, 2), f"Test 1 Failed: {res1}"

    # Test Case 2: a = 4, b = 1
    res2 = sol.strWithout3a3b(4, 1)
    assert validate_result(res2, 4, 1), f"Test 2 Failed: {res2}"

    # Test Case 3: equal counts a = 3, b = 3
    res3 = sol.strWithout3a3b(3, 3)
    assert validate_result(res3, 3, 3), f"Test 3 Failed: {res3}"

    # Test Case 4: extreme ratio a = 5, b = 2
    res4 = sol.strWithout3a3b(5, 2)
    assert validate_result(res4, 5, 2), f"Test 4 Failed: {res4}"

    # Test Case 5: a = 0, b = 2
    res5 = sol.strWithout3a3b(0, 2)
    assert validate_result(res5, 0, 2), f"Test 5 Failed: {res5}"

    print("All String Without AAA or BBB tests passed successfully!")

