r"""
LeetCode 1019: Next Greater Node In Linked List (Medium)
https://leetcode.com/problems/next-greater-node-in-linked-list/

You are given the head of a linked list with n nodes.

For each node in the list, find the value of the next greater node. That is, for each node,
find the value of the first node that is next to it and has a strictly larger value than it.

Return an integer array answer where answer[i] is the value of the next greater node of the
ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.

Example 1:
Input: head = [2,1,5]
Output: [5,5,0]

Example 2:
Input: head = [2,7,4,3,5]
Output: [7,0,5,5,0]

Constraints:
- The number of nodes in the list is n.
- 1 <= n <= 10^4
- 1 <= Node.val <= 10^9
"""

from typing import Optional, List


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def nextLargerNodes(self, head: Optional[ListNode]) -> List[int]:
        """
        Monotonic Decreasing Stack Approach:
        1. Traverse the linked list and collect all node values into an array `vals`.
        2. Maintain a stack of indices whose next greater node has not yet been found.
        3. For each value at index i:
           While stack is not empty and vals[stack[-1]] < vals[i]:
               Pop index from stack and record vals[i] as its next greater value.
           Push i onto the stack.

        Time Complexity: O(N) where N is the number of nodes in the list.
        Space Complexity: O(N) for the values array, stack, and result array.
        """
        vals = []
        curr = head
        while curr:
            vals.append(curr.val)
            curr = curr.next

        ans = [0] * len(vals)
        stack = []  # stores indices

        for i, val in enumerate(vals):
            while stack and vals[stack[-1]] < val:
                prev_idx = stack.pop()
                ans[prev_idx] = val
            stack.append(i)

        return ans


def list_to_linked_list(arr: List[int]) -> Optional[ListNode]:
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for v in arr[1:]:
        curr.next = ListNode(v)
        curr = curr.next
    return head


if __name__ == "__main__":
    sol = Solution()

    # Test Case 1: [2, 1, 5] -> [5, 5, 0]
    ll1 = list_to_linked_list([2, 1, 5])
    assert sol.nextLargerNodes(ll1) == [5, 5, 0], "Test 1 Failed"

    # Test Case 2: [2, 7, 4, 3, 5] -> [7, 0, 5, 5, 0]
    ll2 = list_to_linked_list([2, 7, 4, 3, 5])
    assert sol.nextLargerNodes(ll2) == [7, 0, 5, 5, 0], "Test 2 Failed"

    # Test Case 3: Strictly decreasing [5, 4, 3, 2, 1] -> [0, 0, 0, 0, 0]
    ll3 = list_to_linked_list([5, 4, 3, 2, 1])
    assert sol.nextLargerNodes(ll3) == [0, 0, 0, 0, 0], "Test 3 Failed"

    # Test Case 4: Strictly increasing [1, 2, 3, 4] -> [2, 3, 4, 0]
    ll4 = list_to_linked_list([1, 2, 3, 4])
    assert sol.nextLargerNodes(ll4) == [2, 3, 4, 0], "Test 4 Failed"

    # Test Case 5: Single node
    ll5 = list_to_linked_list([99])
    assert sol.nextLargerNodes(ll5) == [0], "Test 5 Failed"

    print("All Next Greater Node In Linked List tests passed successfully!")
