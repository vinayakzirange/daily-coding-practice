r"""
====================================================================
Problem: Magical String (LeetCode 481)
Difficulty: Medium
Topic: Two Pointers, String, Simulation
====================================================================

A magical string s consists of only '1' and '2' and obeys the following rules:
- The string s is magical because concatenating the number of contiguous
  occurrences of characters '1' and '2' generates the string s itself.

The first few elements of s is s = "1221121221221121122...". If we group
the consecutive occurrences of '1's and '2's in s, it looks like:
"1" "22" "11" "2" "1" "22" "1" "22" "11" "2" "11" "22" ...
and the occurrences of '1's and '2's in each group are:
1 2 2 1 1 2 1 2 2 1 2 2 ...

Given an integer n, return the number of '1's in the first n number
in the magical string s.

Example 1:
Input: n = 6
Output: 3
Explanation: The first 6 elements of magical string s is "122112" and it
contains three 1's, so return 3.

Example 2:
Input: n = 1
Output: 1

Constraints:
- 1 <= n <= 10^5
====================================================================
"""


class Solution:
    def magicalString(self, n: int) -> int:
        """
        Generates the magical string up to length n using two pointers / simulation.

        Complexity:
        - Time: O(n) generating elements sequentially
        - Space: O(n) to store the prefix of the sequence
        """
        if n <= 0:
            return 0
        if n <= 3:
            return 1  # For n=1, "1" has 1; for n=2, "12" has 1; for n=3, "122" has 1

        s = [1, 2, 2]
        head = 2  # points to the group count indicator
        next_val = 1  # next digit to append (toggles between 1 and 2)

        while len(s) < n:
            times = s[head]
            s.extend([next_val] * times)
            next_val = 3 - next_val  # toggles: 3 - 1 = 2, 3 - 2 = 1
            head += 1

        # Count 1s in the first n elements
        return s[:n].count(1)


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: n = 6 -> "122112" has three 1s
    assert sol.magicalString(6) == 3, f"Test 1 failed: {sol.magicalString(6)}"

    # Test 2: n = 1 -> "1" has one 1
    assert sol.magicalString(1) == 1, f"Test 2 failed: {sol.magicalString(1)}"

    # Test 3: n = 2 -> "12" has one 1
    assert sol.magicalString(2) == 1, f"Test 3 failed: {sol.magicalString(2)}"

    # Test 4: n = 3 -> "122" has one 1
    assert sol.magicalString(3) == 1, f"Test 4 failed: {sol.magicalString(3)}"

    # Test 5: n = 10 -> "1221121221" -> four 1s
    assert sol.magicalString(10) == 5, f"Test 5 failed: {sol.magicalString(10)}"

    print("All Magical String tests passed successfully!")
