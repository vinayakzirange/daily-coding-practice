// Problem: Evaluate Reverse Polish Notation (LeetCode 150)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(N)

import java.util.Stack;

public class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        for (String token : tokens) {
            if (token.equals("+")) {
                stack.push(stack.pop() + stack.pop());
            } else if (token.equals("-")) {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a - b);
            } else if (token.equals("*")) {
                stack.push(stack.pop() * stack.pop());
            } else if (token.equals("/")) {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(token));
            }
        }
        return stack.pop();
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        String[] tokens = {"2","1","+","3","*"};
        System.out.println("Output: " + sol.evalRPN(tokens)); // 9
        
        String[] tokens2 = {"4","13","5","/","+"};
        System.out.println("Output 2: " + sol.evalRPN(tokens2)); // 6
    }
}
