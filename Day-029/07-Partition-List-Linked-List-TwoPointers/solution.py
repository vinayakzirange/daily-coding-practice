"""
Problem: Partition List (LeetCode 86)
Language: Python
Difficulty: Medium
Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import Optional

class ListNode:
    def __init__(self, val: int = 0, next=None):
        self.val = val
        self.next = next

class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        less_head = ListNode(0)
        greater_head = ListNode(0)
        less = less_head
        greater = greater_head

        while head:
            if head.val < x:
                less.next = head
                less = less.next
            else:
                greater.next = head
                greater = greater.next
            head = head.next

        greater.next = None
        less.next = greater_head.next

        return less_head.next

if __name__ == "__main__":
    sol = Solution()
    head = ListNode(1, ListNode(4, ListNode(3, ListNode(2, ListNode(5, ListNode(2))))))
    res = sol.partition(head, 3)

    print("Partitioned List (x=3): ", end="")
    while res:
        print(f"{res.val} ", end="")
        res = res.next
    print()  # 1 2 2 4 3 5
