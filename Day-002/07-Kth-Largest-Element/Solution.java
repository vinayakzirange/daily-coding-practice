/*
 * Problem Name: Kth Largest Element in an Array
 * Problem Statement: Given an integer array nums and an integer k, return the kth largest element in the array.
 * 
 * Approach: Min-Heap using PriorityQueue of size k. Maintain only the k largest elements in the min-heap.
 * The root of the heap will be the Kth largest element.
 * 
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 */

import java.util.PriorityQueue;

public class Solution {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }

    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 5, 6, 4};
        int k = 2;
        System.out.println("2nd Largest Element: " + findKthLargest(nums, k)); // Expected: 5
    }
}
