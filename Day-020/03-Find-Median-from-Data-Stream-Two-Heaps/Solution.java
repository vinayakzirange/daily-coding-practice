/**
 * Problem: Find Median from Data Stream
 * Topic: PriorityQueue / Two Heaps Design
 * Language: Java
 *
 * Approach:
 * Maintain two heaps: Max-Heap (smallHalf) for smaller numbers and Min-Heap (largeHalf) for larger numbers.
 * Keep size difference between heaps <= 1. Median is top of max-heap if odd, or average of both tops if even.
 *
 * Time Complexity: O(log N) for addNum, O(1) for findMedian
 * Space Complexity: O(N)
 */

import java.util.Collections;
import java.util.PriorityQueue;

class MedianFinder {
    private PriorityQueue<Integer> smallHalf; // Max-Heap
    private PriorityQueue<Integer> largeHalf; // Min-Heap

    public MedianFinder() {
        smallHalf = new PriorityQueue<>(Collections.reverseOrder());
        largeHalf = new PriorityQueue<>();
    }

    public void addNum(int num) {
        smallHalf.offer(num);
        largeHalf.offer(smallHalf.poll());

        if (smallHalf.size() < largeHalf.size()) {
            smallHalf.offer(largeHalf.poll());
        }
    }

    public double findMedian() {
        if (smallHalf.size() > largeHalf.size()) {
            return smallHalf.peek();
        } else {
            return (smallHalf.peek() + largeHalf.peek()) / 2.0;
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        MedianFinder mf = new MedianFinder();
        mf.addNum(1);
        mf.addNum(2);
        System.out.println("Median of [1,2] -> " + mf.findMedian()); // 1.5
        mf.addNum(3);
        System.out.println("Median of [1,2,3] -> " + mf.findMedian()); // 2.0
    }
}
