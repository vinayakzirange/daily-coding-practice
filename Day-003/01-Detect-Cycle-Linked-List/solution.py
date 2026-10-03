"""
Problem Name: Linked List Cycle (Floyd's Tortoise and Hare Algorithm)
Problem Statement: Given head, the head of a linked list, determine if the linked list has a cycle in it.

Approach: Two pointers (slow moving 1 step, fast moving 2 steps).
If there is a cycle, slow and fast will eventually meet.

Time Complexity: O(N)
Space Complexity: O(1)
"""

from typing import Optional

class ListNode:
    def __init__(self, x: int):
        self.val = x
        self.next = None

class Solution:
    @staticmethod
    def hasCycle(head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return False
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False

if __name__ == "__main__":
    n1 = ListNode(3)
    n2 = ListNode(2)
    n3 = ListNode(0)
    n4 = ListNode(-4)
    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n2  # cycle

    print("Has Cycle:", Solution.hasCycle(n1))  # Expected: True
