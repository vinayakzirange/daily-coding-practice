"""
Problem: Top K Frequent Words (LeetCode 692)
Difficulty: Medium
Topic: Hash Table / Heap (Priority Queue) / Bucket Sort / Sorting

Description:
Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort the words with
the same frequency by their lexicographical order.

Example 1:
Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.

Example 2:
Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
Output: ["the","is","sunny","day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the
number of occurrence being 4, 3, 2 and 1 respectively.

Constraints:
  * 1 <= words.length <= 500
  * 1 <= words[i].length <= 10
  * words[i] consists of lowercase English letters.
  * k is in the range [1, The number of unique words[i]]

Complexity:
  * Time Complexity: O(n log k) using a min-heap of size k, or O(n log n) by sorting frequency pairs.
  * Space Complexity: O(n) for frequency map and heap storage.
"""

from collections import Counter
import heapq
from typing import List


class WordFrequency:
    """Wrapper to handle custom comparison in min-heap:
    lower count has higher priority for ejection;
    for equal counts, lexicographically larger word has higher priority for ejection.
    """
    def __init__(self, word: str, freq: int):
        self.word = word
        self.freq = freq

    def __lt__(self, other: "WordFrequency") -> bool:
        if self.freq != other.freq:
            return self.freq < other.freq
        return self.word > other.word


class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        counts = Counter(words)
        min_heap = []

        for word, freq in counts.items():
            heapq.heappush(min_heap, WordFrequency(word, freq))
            if len(min_heap) > k:
                heapq.heappop(min_heap)

        # Pop remaining k elements from min-heap and reverse
        result = []
        while min_heap:
            result.append(heapq.heappop(min_heap).word)

        return result[::-1]


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        (["i", "love", "leetcode", "i", "love", "coding"], 2, ["i", "love"]),
        (["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4, ["the", "is", "sunny", "day"]),
        (["a", "b", "c"], 2, ["a", "b"]),
        (["word"], 1, ["word"]),
    ]

    for idx, (words_list, k_val, expected) in enumerate(test_cases, 1):
        res = sol.topKFrequent(words_list, k_val)
        assert res == expected, f"Test {idx} Failed: got {res}, expected {expected}"
        print(f"Test {idx} Passed: k={k_val} -> top words: {res}")

    print("\nAll Top K Frequent Words tests passed successfully!")
