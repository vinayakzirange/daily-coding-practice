/**
 * Problem: Third Maximum Number
 * Topic: Array / Set / Linear Scan
 * Language: Java
 *
 * Approach:
 * Maintain three distinct maximum variables (first, second, third) initialized to null/min.
 * Iterate through the array updating the three variables. If third max exists, return it;
 * otherwise return the first max.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

public class Solution {
    public static int thirdMax(int[] nums) {
        Integer first = null;
        Integer second = null;
        Integer third = null;

        for (Integer n : nums) {
            if (n.equals(first) || n.equals(second) || n.equals(third)) {
                continue;
            }
            if (first == null || n > first) {
                third = second;
                second = first;
                first = n;
            } else if (second == null || n > second) {
                third = second;
                second = n;
            } else if (third == null || n > third) {
                third = n;
            }
        }

        return third == null ? first : third;
    }

    public static void main(String[] args) {
        int[] nums1 = {3, 2, 1};
        System.out.println("Third Max [3, 2, 1] -> " + thirdMax(nums1)); // 1

        int[] nums2 = {1, 2};
        System.out.println("Third Max [1, 2] -> " + thirdMax(nums2)); // 2

        int[] nums3 = {2, 2, 3, 1};
        System.out.println("Third Max [2, 2, 3, 1] -> " + thirdMax(nums3)); // 1
    }
}
