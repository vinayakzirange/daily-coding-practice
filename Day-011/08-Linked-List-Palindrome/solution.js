/*
 * Problem Name: Palindrome Linked List
 * Problem Statement: Given the head of a singly linked list, return true if it is a palindrome or false otherwise.
 * 
 * Approach: Fast & Slow Pointers to find middle, reverse second half, compare both halves.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1) in-place
 */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function isPalindrome(head) {
  if (!head || !head.next) return true;

  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let prev = null, curr = slow;
  while (curr) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  let p1 = head, p2 = prev;
  while (p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }

  return true;
}

let head1 = new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(1))));
console.log("Is 1->2->2->1 palindrome:", isPalindrome(head1)); // Expected: true

let head2 = new ListNode(1, new ListNode(2));
console.log("Is 1->2 palindrome:", isPalindrome(head2)); // Expected: false
