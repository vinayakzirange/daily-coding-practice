/*
 * Problem Name: Merge k Sorted Lists
 * Problem Statement: You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
 * Merge all the linked-lists into one sorted linked-list and return it.
 * 
 * Approach: PriorityQueue (Min-Heap) storing the current node from each of the k lists.
 * 
 * Time Complexity: O(N log K) where N is total nodes and K is number of lists
 * Space Complexity: O(K) for PriorityQueue
 */

import java.util.PriorityQueue;

class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public static ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;

        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);

        for (ListNode node : lists) {
            if (node != null) {
                minHeap.add(node);
            }
        }

        ListNode dummy = new ListNode(-1);
        ListNode curr = dummy;

        while (!minHeap.isEmpty()) {
            ListNode smallest = minHeap.poll();
            curr.next = smallest;
            curr = curr.next;

            if (smallest.next != null) {
                minHeap.add(smallest.next);
            }
        }

        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode l1 = new ListNode(1);
        l1.next = new ListNode(4);
        l1.next.next = new ListNode(5);

        ListNode l2 = new ListNode(1);
        l2.next = new ListNode(3);
        l2.next.next = new ListNode(4);

        ListNode l3 = new ListNode(2);
        l3.next = new ListNode(6);

        ListNode[] lists = {l1, l2, l3};
        ListNode merged = mergeKLists(lists);

        System.out.print("Merged K Lists: ");
        while (merged != null) {
            System.out.print(merged.val + " -> ");
            merged = merged.next;
        }
        System.out.println("null"); // Expected: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6 -> null
    }
}
