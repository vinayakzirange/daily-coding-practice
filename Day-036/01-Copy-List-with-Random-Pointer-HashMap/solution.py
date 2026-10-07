"""
Problem: Copy List with Random Pointer (LeetCode 138)
Difficulty: Medium
Topic: Linked List / Hash Table / Deep Copy

Description:
A linked list of length n is given such that each node contains an additional random pointer,
which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes,
where each new node has its value set to the value of its corresponding original node.
Both the next and random pointer of the new nodes should point to new nodes in the copied list
such that the pointers in the original list and copied list represent the same list state.
None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes X and Y in the original list, where X.random --> Y,
then for the corresponding two nodes x and y in the copied list, x.random --> y.

Return the head of the copied linked list.

Example 1:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Example 2:
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

Example 3:
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]

Constraints:
  * 0 <= n <= 1000
  * -10^4 <= Node.val <= 10^4
  * Node.random is null or is pointing to some node in the linked list.

Complexity:
  * Time Complexity: O(n) - Two passes over the linked list of length n.
  * Space Complexity: O(n) - Hash map mapping original nodes to their cloned copies.
"""

from typing import Optional


class Node:
    def __init__(self, x: int, next: "Node" = None, random: "Node" = None):
        self.val = int(x)
        self.next = next
        self.random = random


class Solution:
    def copyRandomList(self, head: "Optional[Node]") -> "Optional[Node]":
        if not head:
            return None

        # Map original node -> cloned node
        clone_map = {}

        # First pass: create all cloned nodes with values
        curr = head
        while curr:
            clone_map[curr] = Node(curr.val)
            curr = curr.next

        # Second pass: assign next and random pointers
        curr = head
        while curr:
            cloned = clone_map[curr]
            cloned.next = clone_map.get(curr.next)
            cloned.random = clone_map.get(curr.random)
            curr = curr.next

        return clone_map[head]


# ==========================================
# Test Cases & Verification
# ==========================================
if __name__ == "__main__":
    sol = Solution()

    # Create nodes: 1 -> 2 -> 3
    # random pointers: 1.random -> 3, 2.random -> 1, 3.random -> None
    n1 = Node(1)
    n2 = Node(2)
    n3 = Node(3)
    n1.next = n2
    n2.next = n3
    n1.random = n3
    n2.random = n1
    n3.random = None

    copied = sol.copyRandomList(n1)

    # Verify deep copy
    assert copied is not n1, "Copied head should be a distinct object."
    assert copied.val == 1, f"Expected 1, got {copied.val}"
    assert copied.next.val == 2, f"Expected 2, got {copied.next.val}"
    assert copied.next.next.val == 3, f"Expected 3, got {copied.next.next.val}"
    assert copied.random.val == 3, f"Expected 3, got {copied.random.val}"
    assert copied.random is copied.next.next, "Copied random pointer must point to cloned node."
    assert copied.next.random is copied, "Copied n2 random must point to copied n1."
    print("Test 1 Passed: 3-node list with cross random pointers cloned successfully.")

    # Test null list
    assert sol.copyRandomList(None) is None, "Null list copy should return None."
    print("Test 2 Passed: Null list returns None.")

    print("\nAll Copy List with Random Pointer tests passed successfully!")
