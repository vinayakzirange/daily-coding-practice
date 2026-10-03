"""
Problem: Sort List (Linked List MergeSort)
Topic: Linked List / Merge Sort / Fast & Slow Pointers
Language: Python

Approach:
Find middle of linked list using fast & slow pointers. Split list into two halves.
Recursively sort left and right sublists, then merge the two sorted sublists.

Time Complexity: O(N log N)
Space Complexity: O(log N) recursion stack
"""

from typing import Optional

class ListNode:
    def __init__(self, val: int = 0, next=None):
        self.val = val
        self.next = next

class Solution:
    @staticmethod
    def sortList(head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        prev = None
        slow = head
        fast = head

        while fast and fast.next:
            prev = slow
            slow = slow.next
            fast = fast.next.next

        if prev:
            prev.next = None  # disconnect left half

        l1 = Solution.sortList(head)
        l2 = Solution.sortList(slow)

        return Solution.merge(l1, l2)

    @staticmethod
    def merge(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        curr = dummy

        while l1 and l2:
            if l1.val < l2.val:
                curr.next = l1
                l1 = l1.next
            else:
                curr.next = l2
                l2 = l2.next
            curr = curr.next

        curr.next = l1 if l1 else l2
        return dummy.next

if __name__ == "__main__":
    head = ListNode(4, ListNode(2, ListNode(1, ListNode(3))))
    sorted_head = Solution.sortList(head)

    print("Sorted List -> ", end="")
    curr = sorted_head
    while curr:
        print(f"{curr.val} ", end="")
        curr = curr.next
    print()  # 1 2 3 4
