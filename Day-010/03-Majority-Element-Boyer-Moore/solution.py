"""
Problem Name: Majority Element
Problem Statement: Given an array nums of size n, return the majority element (element that appears > ⌊n / 2⌋ times).

Approach: Boyer-Moore Voting Algorithm. Maintain a candidate and a count.

Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import List

class Solution:
    @staticmethod
    def majorityElement(nums: List[int]) -> int:
        candidate = nums[0]
        count = 0

        for num in nums:
            if count == 0:
                candidate = num
            count += 1 if num == candidate else -1

        return candidate

if __name__ == "__main__":
    nums1 = [3, 2, 3]
    print("Majority element of [3, 2, 3]:", Solution.majorityElement(nums1))  # Expected: 3

    nums2 = [2, 2, 1, 1, 1, 2, 2]
    print("Majority element of [2, 2, 1, 1, 1, 2, 2]:", Solution.majorityElement(nums2))  # Expected: 2
