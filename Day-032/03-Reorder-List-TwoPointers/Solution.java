// Problem: Reorder List (LeetCode 143)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(1) in-place

public class Solution {
    public static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
        ListNode(int val, ListNode next) { this.val = val; this.next = next; }
    }

    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;

        // Step 1: Find middle using fast & slow pointers
        ListNode slow = head;
        ListNode fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // Step 2: Reverse second half of list
        ListNode secondHalf = slow.next;
        slow.next = null; // Split the two halves

        ListNode prev = null;
        ListNode curr = secondHalf;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        secondHalf = prev;

        // Step 3: Interleave / merge first half and reversed second half
        ListNode firstHalf = head;
        while (secondHalf != null) {
            ListNode temp1 = firstHalf.next;
            ListNode temp2 = secondHalf.next;

            firstHalf.next = secondHalf;
            secondHalf.next = temp1;

            firstHalf = temp1;
            secondHalf = temp2;
        }
    }

    private static void printList(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode curr = head;
        while (curr != null) {
            sb.append(curr.val);
            if (curr.next != null) sb.append(" -> ");
            curr = curr.next;
        }
        System.out.println(sb.toString());
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        // Test 1: 1 -> 2 -> 3 -> 4
        ListNode l1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
        System.out.print("Original list 1: ");
        printList(l1);
        sol.reorderList(l1);
        System.out.print("Reordered list 1: ");
        printList(l1);
        // Expected: 1 -> 4 -> 2 -> 3

        // Test 2: 1 -> 2 -> 3 -> 4 -> 5
        ListNode l2 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
        System.out.print("Original list 2: ");
        printList(l2);
        sol.reorderList(l2);
        System.out.print("Reordered list 2: ");
        printList(l2);
        // Expected: 1 -> 5 -> 2 -> 4 -> 3
    }
}
