/*
 * Problem Name: Fizz Buzz
 * Problem Statement: Given an integer n, return a string array answer (1-indexed) where:
 * answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
 * answer[i] == "Fizz" if i is divisible by 3.
 * answer[i] == "Buzz" if i is divisible by 5.
 * answer[i] == i (as a string) if none of the above conditions are true.
 * 
 * Approach: Simple iteration checking divisibility using modulo operator %.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1) auxiliary space (excluding result list)
 */

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> fizzBuzz(int n) {
        List<String> result = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                result.add("FizzBuzz");
            } else if (i % 3 == 0) {
                result.add("Fizz");
            } else if (i % 5 == 0) {
                result.add("Buzz");
            } else {
                result.add(String.valueOf(i));
            }
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println("FizzBuzz for n=15: " + fizzBuzz(15));
        // Expected: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]
    }
}
