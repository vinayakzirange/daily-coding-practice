"""
Problem: Group Anagrams (LeetCode 49)
Language: Python
Difficulty: Medium
Time Complexity: O(N * K log K)
Space Complexity: O(N * K)
"""

from collections import defaultdict
from typing import List

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        if not strs:
            return []

        anagram_map = defaultdict(list)
        for s in strs:
            key = "".join(sorted(s))
            anagram_map[key].append(s)

        return list(anagram_map.values())

if __name__ == "__main__":
    sol = Solution()
    strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
    print("Grouped Anagrams:", sol.groupAnagrams(strs))
