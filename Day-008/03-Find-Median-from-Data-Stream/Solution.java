/*
 * Problem Name: Find Median from Data Stream
 * Problem Statement: The median is the middle value in an ordered integer list. Design a data structure that supports adding numbers 
 * and finding the current median in constant/logarithmic time.
 * 
 * Approach: Two Heaps (Max-Heap `maxHeap` for lower half, Min-Heap `minHeap` for upper half).
 * Rebalance heaps so size difference is at most 1.
 * 
 * Time Complexity: O(log N) for addNum, O(1) for findMedian
 * Space Complexity: O(N)
 */

import java.util.Collections;
import java.util.PriorityQueue;

class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // Lower half
    private PriorityQueue<Integer> minHeap; // Upper half

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        maxHeap.add(num);
        minHeap.add(maxHeap.poll());

        if (maxHeap.size() < minHeap.size()) {
            maxHeap.add(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}

public class Solution {
    public static void main(String[] args) {
        MedianFinder mf = new MedianFinder();
        mf.addNum(1);
        mf.addNum(2);
        System.out.println("Median: " + mf.findMedian()); // Expected: 1.5
        mf.addNum(3);
        System.out.println("Median: " + mf.findMedian()); // Expected: 2.0
    }
}
