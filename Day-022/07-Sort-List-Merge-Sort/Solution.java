/**
 * Problem: Sort List (Linked List MergeSort)
 * Topic: Linked List / Merge Sort / Fast & Slow Pointers
 * Language: Java
 *
 * Approach:
 * Find middle of linked list using fast & slow pointers. Split list into two halves.
 * Recursively sort left and right sublists, then merge the two sorted sublists.
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N) recursion stack
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public static ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;

        ListNode prev = null, slow = head, fast = head;
        while (fast != null && fast.next != null) {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }
        prev.next = null; // disconnect left half

        ListNode l1 = sortList(head);
        ListNode l2 = sortList(slow);

        return merge(l1, l2);
    }

    private static ListNode merge(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }
            curr = curr.next;
        }
        if (l1 != null) curr.next = l1;
        if (l2 != null) curr.next = l2;

        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode head = new ListNode(4);
        head.next = new ListNode(2);
        head.next.next = new ListNode(1);
        head.next.next.next = new ListNode(3);

        ListNode sorted = sortList(head);
        System.out.print("Sorted List -> ");
        while (sorted != null) {
            System.out.print(sorted.val + " ");
            sorted = sorted.next;
        }
        System.out.println(); // 1 2 3 4
    }
}
