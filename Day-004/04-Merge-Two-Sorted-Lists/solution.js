/*
 * Problem Name: Merge Two Sorted Lists
 * Problem Statement: You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists into one sorted list and return its head.
 * 
 * Approach: Use a dummy head node and a pointer to construct the merged list iteratively.
 * 
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(list1, list2) {
  let dummy = new ListNode(-1);
  let current = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  current.next = list1 !== null ? list1 : list2;
  return dummy.next;
}

// Test Helper
function printList(head) {
  let res = [];
  while (head) {
    res.push(head.val);
    head = head.next;
  }
  console.log(res.join(" -> "));
}

let l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
let l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
let merged = mergeTwoLists(l1, l2);
printList(merged); // Expected: 1 -> 1 -> 2 -> 3 -> 4 -> 4
