/**
 * Problem: Binary Number with Alternating Bits
 * Topic: Bit Manipulation
 * Language: Java
 *
 * Approach:
 * Shift n right by 1 (n >> 1) and XOR with n: x = n ^ (n >> 1).
 * If n has alternating bits, x will be all 1s (e.g. 101 ^ 010 = 111).
 * Check if (x & (x + 1)) == 0.
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

public class Solution {
    public static boolean hasAlternatingBits(int n) {
        long x = n ^ (n >> 1);
        return (x & (x + 1)) == 0;
    }

    public static void main(String[] args) {
        System.out.println("5 (101) -> " + hasAlternatingBits(5)); // true
        System.out.println("7 (111) -> " + hasAlternatingBits(7)); // false
        System.out.println("11 (1011) -> " + hasAlternatingBits(11)); // false
    }
}
