"""
Problem: Find K Pairs with Smallest Sums (LeetCode 373)
Difficulty: Medium
Topic: Array / Priority Queue / Min-Heap / K-way Merge

Description:
You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k.

Define a pair (u, v) which consists of one element from nums1 and one element from nums2.

Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

Example 1:
Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence:
[1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

Example 2:
Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence:
[1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

Example 3:
Input: nums1 = [1,2], nums2 = [3], k = 3
Output: [[1,3],[2,3]]
Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]

Constraints:
  * 1 <= nums1.length, nums2.length <= 10^5
  * -10^9 <= nums1[i], nums2[i] <= 10^9
  * nums1 and nums2 are sorted in non-decreasing order.
  * 1 <= k <= 10^4
  * k <= nums1.length * nums2.length

Complexity:
  * Time Complexity: O(k log min(n, k)) where n = len(nums1).
  * Space Complexity: O(min(n, k)) for the min-heap.
"""

import heapq
from typing import List


class Solution:
    def kSmallestPairs(
        self, nums1: List[int], nums2: List[int], k: int
    ) -> List[List[int]]:
        if not nums1 or not nums2 or k <= 0:
            return []

        # Min-heap stores: (sum, i, j) where i is index in nums1, j is index in nums2
        min_heap = []
        result = []

        # Initialize the heap with the first element of nums2 paired with each of the first min(k, len(nums1)) elements of nums1
        for i in range(min(k, len(nums1))):
            heapq.heappush(min_heap, (nums1[i] + nums2[0], i, 0))

        while min_heap and len(result) < k:
            current_sum, i, j = heapq.heappop(min_heap)
            result.append([nums1[i], nums2[j]])

            # If there is a next element in nums2 for the current nums1[i], push it
            if j + 1 < len(nums2):
                heapq.heappush(min_heap, (nums1[i] + nums2[j + 1], i, j + 1))

        return result


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    test_cases = [
        ([1, 7, 11], [2, 4, 6], 3, [[1, 2], [1, 4], [1, 6]]),
        ([1, 1, 2], [1, 2, 3], 2, [[1, 1], [1, 1]]),
        ([1, 2], [3], 3, [[1, 3], [2, 3]]),
        ([1, 2, 4, 5, 6], [3, 5, 7, 9], 3, [[1, 3], [2, 3], [1, 5]]),
    ]

    for idx, (n1, n2, k_val, expected) in enumerate(test_cases, 1):
        result = sol.kSmallestPairs(n1, n2, k_val)
        assert result == expected, f"Test {idx} failed: got {result}, expected {expected}"
        print(f"Test {idx} Passed: k={k_val} -> {result}")

    print("\nAll Find K Pairs with Smallest Sums tests passed successfully!")
