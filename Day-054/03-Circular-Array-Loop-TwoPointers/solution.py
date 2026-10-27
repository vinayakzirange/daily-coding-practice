r"""
====================================================================
Problem: Circular Array Loop (LeetCode 457)
Difficulty: Medium
Topic: Array, Hash Table, Two Pointers
====================================================================

You are playing a game involving a circular array of non-zero integers nums.
Each nums[i] denotes the number of indices forward/backward you must move
from index i:
- If nums[i] > 0, move nums[i] steps forward.
- If nums[i] < 0, move nums[i] steps backward.

Because the array is circular, moving past the ends wraps around.

A cycle in nums is formed if:
1. Every move in the cycle goes in the SAME direction (all positive or all negative).
2. The cycle length is strictly greater than 1.

Return true if there is a cycle in nums, or false otherwise.

Follow up: Could you solve it in O(n) time complexity and O(1) extra space?

Example 1:
Input: nums = [2,-1,1,2,2]
Output: true
Explanation: The graph has a cycle: 0 -> 2 -> 3 -> 0 ...
Cycle length is 3 and all movements are positive.

Example 2:
Input: nums = [-1,-2,-3,-4,-5,6]
Output: false
Explanation: The movement from index 1 -> 4 -> 4 has a 1-element loop at 4.

Example 3:
Input: nums = [1,-1,5,1,4]
Output: true
Explanation: Cycle: 0 -> 1 -> 0 (direction changes, invalid), but 2 -> 2 is 1-element.

Constraints:
- 1 <= nums.length <= 5000
- -1000 <= nums[i] <= 1000
- nums[i] != 0
====================================================================
"""

from typing import List


class Solution:
    def circularArrayLoop(self, nums: List[int]) -> bool:
        """
        Detects a valid circular loop using Floyd's cycle-finding (slow/fast pointers)
        and marks visited paths with 0 to achieve O(n) time and O(1) extra space.
        """
        n = len(nums)
        if n < 2:
            return False

        def get_next(idx: int) -> int:
            return (idx + nums[idx]) % n

        for i in range(n):
            if nums[i] == 0:
                continue

            slow = i
            fast = get_next(i)

            # Move pointers while maintaining the same direction
            while (
                nums[slow] * nums[get_next(slow)] > 0
                and nums[fast] * nums[get_next(fast)] > 0
                and nums[fast] * nums[get_next(get_next(fast))] > 0
            ):
                if slow == fast:
                    # Check cycle length > 1 (not self-loop)
                    if slow == get_next(slow):
                        break
                    return True

                slow = get_next(slow)
                fast = get_next(get_next(fast))

            # Mark all nodes in this examined trajectory as 0 (dead ends)
            curr = i
            val = nums[i]
            while nums[curr] * val > 0:
                nxt = get_next(curr)
                nums[curr] = 0
                curr = nxt

        return False


# --- Test Suite ---
if __name__ == "__main__":
    sol = Solution()

    # Test 1: [2,-1,1,2,2] -> True (0 -> 2 -> 3 -> 0)
    assert sol.circularArrayLoop([2, -1, 1, 2, 2]) is True, "Test 1 failed"

    # Test 2: [-1,-2,-3,-4,-5,6] -> False (self loop at index 4)
    assert sol.circularArrayLoop([-1, -2, -3, -4, -5, 6]) is False, "Test 2 failed"

    # Test 3: [1, -1, 5, 1, 4] -> True (valid forward cycle: 3 -> 4 -> 3)
    assert sol.circularArrayLoop([1, -1, 5, 1, 4]) is True, "Test 3 failed"

    # Test 4: [-2, 1, -1, -2, -2] -> False
    assert sol.circularArrayLoop([-2, 1, -1, -2, -2]) is False, "Test 4 failed"

    # Test 5: [-1, 2] -> False
    assert sol.circularArrayLoop([-1, 2]) is False, "Test 5 failed"

    # Test 6: [3, 1, 2] -> True (0 -> 0 self loop, but 1 -> 2 -> 1 is 2-element cycle)
    # wait: 1 + 1 = 2; 2 + 2 = 4 % 3 = 1 -> length 2 forward cycle
    assert sol.circularArrayLoop([3, 1, 2]) is True, "Test 6 failed"

    print("All Circular Array Loop tests passed successfully!")
