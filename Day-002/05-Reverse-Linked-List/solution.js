/*
 * Problem Name: Reverse Linked List
 * Problem Statement: Given the head of a singly linked list, reverse the list, and return the reversed list.
 * 
 * Approach: Iterative approach using three pointers (prev, current, next).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  return prev;
}

// Helper function to print list
function printList(head) {
  let curr = head;
  const res = [];
  while (curr) {
    res.push(curr.val);
    curr = curr.next;
  }
  console.log(res.join(" -> "));
}

// Test Example: 1 -> 2 -> 3 -> 4 -> 5
let head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log("Original List:");
printList(head);

let reversed = reverseList(head);
console.log("Reversed List:");
printList(reversed); // Expected: 5 -> 4 -> 3 -> 2 -> 1
