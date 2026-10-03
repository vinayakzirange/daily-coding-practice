"""
Problem Name: Merge k Sorted Lists
Problem Statement: You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

Approach: PriorityQueue (Min-Heap) storing tuple (node.val, id(node), node) from each of the k lists.

Time Complexity: O(N log K) where N is total nodes and K is number of lists
Space Complexity: O(K) for PriorityQueue
"""

import heapq
from typing import List, Optional

class ListNode:
    def __init__(self, val: int = 0, next=None):
        self.val = val
        self.next = next

class Solution:
    @staticmethod
    def mergeKLists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        min_heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(min_heap, (node.val, i, node))

        dummy = ListNode(-1)
        curr = dummy

        while min_heap:
            val, idx, smallest = heapq.heappop(min_heap)
            curr.next = smallest
            curr = curr.next

            if smallest.next:
                heapq.heappush(min_heap, (smallest.next.val, idx, smallest.next))

        return dummy.next

if __name__ == "__main__":
    l1 = ListNode(1, ListNode(4, ListNode(5)))
    l2 = ListNode(1, ListNode(3, ListNode(4)))
    l3 = ListNode(2, ListNode(6))

    merged = Solution.mergeKLists([l1, l2, l3])
    curr = merged
    print("Merged K Lists: ", end="")
    while curr:
        print(f"{curr.val} -> ", end="")
        curr = curr.next
    print("None")  # Expected: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6 -> None
