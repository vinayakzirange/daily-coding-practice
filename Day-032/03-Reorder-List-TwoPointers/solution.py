"""
Problem: Reorder List (LeetCode 143)
Language: Python
Difficulty: Medium
Time Complexity: O(N)
Space Complexity: O(1) in-place
"""

from typing import Optional

class ListNode:
    def __init__(self, val: int = 0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head or not head.next:
            return

        # Step 1: Find middle using fast & slow pointers
        slow, fast = head, head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next

        # Step 2: Reverse second half of list
        second_half = slow.next
        slow.next = None

        prev = None
        curr = second_half
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
        second_half = prev

        # Step 3: Interleave / merge first half and reversed second half
        first_half = head
        while second_half:
            temp1 = first_half.next
            temp2 = second_half.next

            first_half.next = second_half
            second_half.next = temp1

            first_half = temp1
            second_half = temp2

def print_list(head: Optional[ListNode]):
    vals = []
    curr = head
    while curr:
        vals.append(str(curr.val))
        curr = curr.next
    print(" -> ".join(vals))

if __name__ == "__main__":
    sol = Solution()

    # Test 1: 1 -> 2 -> 3 -> 4
    l1 = ListNode(1, ListNode(2, ListNode(3, ListNode(4))))
    print("Original list 1: ", end="")
    print_list(l1)
    sol.reorderList(l1)
    print("Reordered list 1: ", end="")
    print_list(l1)
    # Expected: 1 -> 4 -> 2 -> 3

    # Test 2: 1 -> 2 -> 3 -> 4 -> 5
    l2 = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5)))))
    print("Original list 2: ", end="")
    print_list(l2)
    sol.reorderList(l2)
    print("Reordered list 2: ", end="")
    print_list(l2)
    # Expected: 1 -> 5 -> 2 -> 4 -> 3
