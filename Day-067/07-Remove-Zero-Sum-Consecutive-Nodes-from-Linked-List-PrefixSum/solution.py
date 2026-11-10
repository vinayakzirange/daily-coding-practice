"""
Problem: Remove Zero Sum Consecutive Nodes from Linked List (LeetCode 1171)
Difficulty: Medium
Language: Python

Given the head of a linked list, we repeatedly delete consecutive sequences of nodes
that sum to 0 until there are no such sequences.

After doing so, return the head of the final linked list. You may return any such answer.

Example 1:
    Input: head = [1,2,-3,3,1]
    Output: [3,1]
    Note: The answer [1,2,1] would also be accepted.

Example 2:
    Input: head = [1,2,3,-3,4]
    Output: [1,2,4]

Example 3:
    Input: head = [1,2,3,-3,-2]
    Output: [1]

Constraints:
    The given linked list will contain between 1 and 1000 nodes.
    Each node in the linked list has -1000 <= node.val <= 1000.
"""

from typing import List, Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def removeZeroSumSublists(self, head: Optional[ListNode]) -> Optional[ListNode]:
        """
        Deletes consecutive sequences of nodes summing to 0 using a Two-Pass Prefix Sum Hash Map.
        
        Complexity:
            Time: O(N) - Two linear passes over the linked list.
            Space: O(N) - Hash map storing at most N prefix sums.
        """
        dummy = ListNode(0, head)
        prefix_sum = 0
        seen = {}

        # Pass 1: Record the latest node for each prefix sum
        curr = dummy
        while curr:
            prefix_sum += curr.val
            seen[prefix_sum] = curr
            curr = curr.next

        # Pass 2: Re-link nodes directly skipping the zero-sum sublists
        curr = dummy
        prefix_sum = 0
        while curr:
            prefix_sum += curr.val
            curr.next = seen[prefix_sum].next
            curr = curr.next

        return dummy.next


def list_to_nodes(vals: List[int]) -> Optional[ListNode]:
    """Helper to convert list to linked list."""
    dummy = ListNode(0)
    curr = dummy
    for v in vals:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def nodes_to_list(head: Optional[ListNode]) -> List[int]:
    """Helper to convert linked list to python list."""
    res = []
    curr = head
    while curr:
        res.append(curr.val)
        curr = curr.next
    return res


if __name__ == "__main__":
    sol = Solution()

    # Test 1: Example 1 -> [1, 2, -3, 3, 1] -> [3, 1]
    head1 = list_to_nodes([1, 2, -3, 3, 1])
    res1 = nodes_to_list(sol.removeZeroSumSublists(head1))
    assert res1 in ([3, 1], [1, 2, 1]), f"Test 1 Failed: {res1}"

    # Test 2: Example 2 -> [1, 2, 3, -3, 4] -> [1, 2, 4]
    head2 = list_to_nodes([1, 2, 3, -3, 4])
    res2 = nodes_to_list(sol.removeZeroSumSublists(head2))
    assert res2 == [1, 2, 4], f"Test 2 Failed: {res2}"

    # Test 3: Example 3 -> [1, 2, 3, -3, -2] -> [1]
    head3 = list_to_nodes([1, 2, 3, -3, -2])
    res3 = nodes_to_list(sol.removeZeroSumSublists(head3))
    assert res3 == [1], f"Test 3 Failed: {res3}"

    # Test 4: All nodes sum to 0 -> [1, -1] -> []
    head4 = list_to_nodes([1, -1])
    res4 = nodes_to_list(sol.removeZeroSumSublists(head4))
    assert res4 == [], f"Test 4 Failed: {res4}"

    # Test 5: No zero sum sequences -> [1, 2, 3] -> [1, 2, 3]
    head5 = list_to_nodes([1, 2, 3])
    res5 = nodes_to_list(sol.removeZeroSumSublists(head5))
    assert res5 == [1, 2, 3], f"Test 5 Failed: {res5}"

    print("All Remove Zero Sum Consecutive Nodes tests passed successfully!")

