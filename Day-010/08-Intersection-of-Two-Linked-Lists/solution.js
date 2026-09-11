/*
 * Problem Name: Intersection of Two Linked Lists
 * Problem Statement: Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect.
 * If the two linked lists have no intersection at all, return null.
 * 
 * Approach: Two Pointers (pA and pB). When pA reaches end of list A, redirect to headB. When pB reaches end of list B, redirect to headA.
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

function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;

  let pA = headA;
  let pB = headB;

  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }

  return pA;
}

// Test Helper Setup
let common = new ListNode(8, new ListNode(4, new ListNode(5)));
let headA = new ListNode(4, new ListNode(1, common));
let headB = new ListNode(5, new ListNode(6, new ListNode(1, common)));

let intersection = getIntersectionNode(headA, headB);
console.log("Intersected Node Value:", intersection ? intersection.val : null); // Expected: 8
