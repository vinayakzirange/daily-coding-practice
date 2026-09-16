/**
 * Problem: Middle of the Linked List
 * Topic: Linked List / Fast & Slow Pointers
 * Language: JavaScript
 *
 * Approach:
 * Use slow and fast pointers. Advance slow by 1 step and fast by 2 steps.
 * When fast reaches the end (null or fast.next == null), slow will be at the middle node.
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

function middleNode(head) {
    let slow = head;
    let fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// Test cases
const list1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.log("Middle of [1,2,3,4,5] ->", middleNode(list1).val); // 3

const list2 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))));
console.log("Middle of [1,2,3,4,5,6] ->", middleNode(list2).val); // 4
