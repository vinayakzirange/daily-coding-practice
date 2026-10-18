"""
====================================================================
Problem: Linked List Cycle II (LeetCode 142)
Difficulty: Medium
Topic: Hash Table, Linked List, Two Pointers
====================================================================

Given the head of a linked list, return the node where the cycle begins.
If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that
can be reached again by continuously following the next pointer.
Internally, pos is used to denote the index of the node that tail's
next pointer is connected to (0-indexed). It is -1 if there is no cycle.
Note that pos is not passed as a parameter.

Do not modify the linked list.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1

Example 2:
Input: head = [1,2], pos = 0
Output: tail connects to node index 0

Example 3:
Input: head = [1], pos = -1
Output: no cycle

Constraints:
- The number of the nodes in the list is in the range [0, 10^4].
- -10^5 <= Node.val <= 10^5
- pos is -1 or a valid index in the linked-list.

Follow up: Can you solve it using O(1) memory?
====================================================================
"""

from typing import Optional

class ListNode:
    def __init__(self, x, next=None):
        self.val = x
        self.next = next


class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Floyd's Tortoise and Hare Algorithm to find entry of cycle.
        1. Phase 1: Fast pointer moves 2 steps, Slow pointer moves 1 step.
           If they meet, a cycle exists.
        2. Phase 2: Reset one pointer to head. Both move 1 step each.
           The point where they collide is the cycle entry node.
           Proof: L1 = distance from head to cycle entry.
                  L2 = distance from entry to meeting point.
                  C = length of cycle.
                  Fast distance = 2 * Slow distance => L1 + k*C + L2 = 2*(L1 + L2)
                  => L1 = k*C - L2 = (k-1)*C + (C - L2).
                  Thus, head and meeting point pointer traveling at speed 1 collide at entry.

        Time Complexity: O(n) where n is number of nodes
        Space Complexity: O(1) auxiliary memory
        """
        if not head or not head.next:
            return None

        slow = head
        fast = head

        # Phase 1: Detect cycle
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                break
        else:
            return None

        # Phase 2: Find entrance
        ptr1 = head
        ptr2 = slow

        while ptr1 != ptr2:
            ptr1 = ptr1.next
            ptr2 = ptr2.next

        return ptr1


# --- Test Suite ---
def create_linked_list_with_cycle(arr, pos):
    if not arr:
        return None, None
    nodes = [ListNode(x) for x in arr]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0 and pos < len(nodes):
        nodes[-1].next = nodes[pos]
    return nodes[0], (nodes[pos] if pos >= 0 and pos < len(nodes) else None)


if __name__ == "__main__":
    solver = Solution()

    # Test 1: Cycle at index 1: [3, 2, 0, -4], pos = 1
    h1, cycle_node1 = create_linked_list_with_cycle([3, 2, 0, -4], 1)
    res1 = solver.detectCycle(h1)
    assert res1 is cycle_node1 and res1.val == 2, "Test 1 failed"
    print("Test 1 Passed: [3, 2, 0, -4] cycle detected at node val=2")

    # Test 2: Cycle at index 0: [1, 2], pos = 0
    h2, cycle_node2 = create_linked_list_with_cycle([1, 2], 0)
    res2 = solver.detectCycle(h2)
    assert res2 is cycle_node2 and res2.val == 1, "Test 2 failed"
    print("Test 2 Passed: [1, 2] cycle detected at node val=1")

    # Test 3: No cycle: [1], pos = -1
    h3, cycle_node3 = create_linked_list_with_cycle([1], -1)
    res3 = solver.detectCycle(h3)
    assert res3 is None, "Test 3 failed"
    print("Test 3 Passed: [1] with no cycle returns None")

    # Test 4: Empty list
    h4, cycle_node4 = create_linked_list_with_cycle([], -1)
    res4 = solver.detectCycle(h4)
    assert res4 is None, "Test 4 failed"
    print("Test 4 Passed: [] returns None")

    # Test 5: Self loop: [10], pos = 0
    h5, cycle_node5 = create_linked_list_with_cycle([10], 0)
    res5 = solver.detectCycle(h5)
    assert res5 is cycle_node5 and res5.val == 10, "Test 5 failed"
    print("Test 5 Passed: [10] self-loop detected at node val=10")

    # Test 6: Longer list with cycle at end: [1, 2, 3, 4, 5, 6], pos = 4 (val 5)
    h6, cycle_node6 = create_linked_list_with_cycle([1, 2, 3, 4, 5, 6], 4)
    res6 = solver.detectCycle(h6)
    assert res6 is cycle_node6 and res6.val == 5, "Test 6 failed"
    print("Test 6 Passed: [1, 2, 3, 4, 5, 6] cycle detected at node val=5")

    print("\nAll Linked List Cycle II tests passed successfully!")
