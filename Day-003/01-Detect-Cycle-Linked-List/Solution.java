/*
 * Problem Name: Linked List Cycle (Floyd's Tortoise and Hare Algorithm)
 * Problem Statement: Given head, the head of a linked list, determine if the linked list has a cycle in it.
 * 
 * Approach: Two pointers (slow moving 1 step, fast moving 2 steps).
 * If there is a cycle, slow and fast will eventually meet.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

public class Solution {
    public static boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        ListNode n1 = new ListNode(3);
        ListNode n2 = new ListNode(2);
        ListNode n3 = new ListNode(0);
        ListNode n4 = new ListNode(-4);
        
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        n4.next = n2; // Creates cycle at node 2

        System.out.println("Has Cycle: " + hasCycle(n1)); // Expected: true
    }
}
