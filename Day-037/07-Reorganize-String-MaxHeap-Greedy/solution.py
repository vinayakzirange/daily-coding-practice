"""
Problem: Reorganize String (LeetCode 767)
Difficulty: Medium
Topic: String / Max-Heap / Greedy / Hash Table

Description:
Given a string s, rearrange the characters of s so that any two adjacent characters 
are not the same.

Return any possible rearrangement of s or return "" if not possible.

Example 1:
Input: s = "aab"
Output: "aba"

Example 2:
Input: s = "aaab"
Output: ""

Constraints:
  * 1 <= s.length <= 500
  * s consists of lowercase English letters.

Complexity:
  * Time Complexity: O(n log k) where n is length of s, and k is the alphabet size (k <= 26), 
    which effectively evaluates to O(n).
  * Space Complexity: O(k) space for heap and frequency map (O(1) auxiliary).
"""

import collections
import heapq


class Solution:
    def reorganizeString(self, s: str) -> str:
        counts = collections.Counter(s)
        max_freq = max(counts.values())

        # Pigeonhole principle: if most frequent char exceeds (len(s) + 1) // 2, impossible
        if max_freq > (len(s) + 1) // 2:
            return ""

        # Max-heap with (-count, char)
        max_heap = [(-count, char) for char, count in counts.items()]
        heapq.heapify(max_heap)

        res = []
        prev_count, prev_char = 0, ""

        while max_heap:
            count, char = heapq.heappop(max_heap)
            res.append(char)

            # If previous character still has remaining count, push it back
            if prev_count < 0:
                heapq.heappush(max_heap, (prev_count, prev_char))

            # Current character was used once, decrement count (count is negative)
            prev_count = count + 1
            prev_char = char

        return "".join(res)


if __name__ == "__main__":
    sol = Solution()

    # Test 1
    s1 = "aab"
    res1 = sol.reorganizeString(s1)
    print(f"Test 1: '{s1}' -> '{res1}' | Valid: {len(res1) == 3 and res1[0] != res1[1] != res1[2]}")

    # Test 2
    s2 = "aaab"
    res2 = sol.reorganizeString(s2)
    print(f"Test 2: '{s2}' -> '{res2}' | Pass: {res2 == ''}")

    # Test 3
    s3 = "vvvlo"
    res3 = sol.reorganizeString(s3)
    valid3 = all(res3[i] != res3[i+1] for i in range(len(res3) - 1)) if res3 else False
    print(f"Test 3: '{s3}' -> '{res3}' | Valid: {valid3}")
