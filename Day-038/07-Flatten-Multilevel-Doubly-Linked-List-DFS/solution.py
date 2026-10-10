"""
Problem: Flatten a Multilevel Doubly Linked List (LeetCode 430)
Difficulty: Medium
Topic: Linked List / Doubly Linked List / Depth-First Search / Stack

Description:
You are given a doubly linked list, which contains nodes that have a next pointer,
a previous pointer, and an additional child pointer. This child pointer may or may not
point to a separate doubly linked list, also containing these special nodes.
These child lists may have one or more children of their own, and so on, to produce a
multilevel data structure.

Given the head of the first level of the list, flatten the list so that all the nodes
appear in a single-level, doubly linked list. Let curr be a node with a child list.
The nodes in the child list should appear after curr and before curr.next in the flattened list.

Return the head of the flattened list. The nodes in the list must have all of their child
pointers set to null.

Example 1:
Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
Output: [1,2,3,7,8,11,12,9,10,4,5,6]

Example 2:
Input: head = [1,2,null,3]
Output: [1,3,2]

Example 3:
Input: head = []
Output: []

Constraints:
  * The number of Nodes will not exceed 1000.
  * 1 <= Node.val <= 10^5

Complexity:
  * Time Complexity: O(n) - Every node is visited and spliced at most once.
  * Space Complexity: O(d) - Auxiliary stack space proportional to multilevel depth d.
"""

from typing import Optional


class Node:
    def __init__(self, val, prev=None, next=None, child=None):
        self.val = val
        self.prev = prev
        self.next = next
        self.child = child


class Solution:
    def flatten(self, head: "Optional[Node]") -> "Optional[Node]":
        if not head:
            return None

        curr = head
        while curr:
            # If curr has a child, splice the child list between curr and curr.next
            if curr.child:
                next_node = curr.next

                # Find the tail of the child list
                child_tail = curr.child
                while child_tail.next:
                    child_tail = child_tail.next

                # Connect curr to child head
                curr.next = curr.child
                curr.child.prev = curr

                # Connect child tail to next_node (if it exists)
                if next_node:
                    child_tail.next = next_node
                    next_node.prev = child_tail

                # Clear child pointer
                curr.child = None

            curr = curr.next

        return head


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    # Construct list:
    # 1 - 2 - 3
    #         |
    #         4 - 5
    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n4 = Node(4)
    n5 = Node(5)

    n1.next = n2
    n2.prev = n1
    n2.next = n3
    n3.prev = n2

    n2.child = n4
    n4.next = n5
    n5.prev = n4

    flat_head = sol.flatten(n1)

    # Collect flattened sequence
    res = []
    curr = flat_head
    while curr:
        assert curr.child is None, f"Child of node {curr.val} was not cleared."
        res.append(curr.val)
        if curr.next:
            assert curr.next.prev is curr, f"Invalid prev link between {curr.val} and {curr.next.val}"
        curr = curr.next

    assert res == [1, 2, 4, 5, 3], f"Expected [1, 2, 4, 5, 3], got {res}"
    print(f"Test 1 Passed: Flattened list = {res}")

    # Empty list
    assert sol.flatten(None) is None
    print("Test 2 Passed: Empty list returns None.")

    print("\nAll Flatten Multilevel Doubly Linked List tests passed successfully!")
