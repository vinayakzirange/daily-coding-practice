/*
 * Problem Name: Sliding Window Maximum
 * Problem Statement: You are given an array of integers nums, there is a sliding window of size k which is moving 
 * from the very left of the array to the very right. Return the max sliding window.
 * 
 * Approach: Monotonic Decreasing Deque storing indices.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */

import java.util.*;

public class Solution {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // Remove indices out of window bounds
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            // Remove smaller elements from back of deque
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }

            deque.offerLast(i);

            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }

        return result;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
        int k = 3;
        System.out.println("Sliding Window Max: " + Arrays.toString(maxSlidingWindow(nums, k)));
        // Expected: [3, 3, 5, 5, 6, 7]
    }
}
