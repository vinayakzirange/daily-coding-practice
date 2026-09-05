/*
 * Problem Name: Top K Frequent Elements
 * Problem Statement: Given an integer array nums and an integer k, return the k most frequent elements.
 * 
 * Approach: Frequency Map + Min-Heap (PriorityQueue) based on element frequencies.
 * 
 * Time Complexity: O(N log K)
 * Space Complexity: O(N + K)
 */

import java.util.*;

public class Solution {
    public static int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int n : nums) {
            freqMap.put(n, freqMap.getOrDefault(n, 0) + 1);
        }

        PriorityQueue<Map.Entry<Integer, Integer>> minHeap = 
            new PriorityQueue<>((a, b) -> a.getValue() - b.getValue());

        for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
            minHeap.add(entry);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        int[] result = new int[k];
        int i = 0;
        while (!minHeap.isEmpty()) {
            result[i++] = minHeap.poll().getKey();
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 1, 2, 2, 3};
        int k = 2;
        System.out.println("Top 2 frequent: " + Arrays.toString(topKFrequent(nums, k))); // Expected: [2, 1] (order may vary)
    }
}
