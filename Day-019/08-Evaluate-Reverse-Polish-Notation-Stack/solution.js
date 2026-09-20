/**
 * Problem: Evaluate Reverse Polish Notation
 * Topic: Stack Evaluation / Postfix Expressions
 * Language: JavaScript
 *
 * Approach:
 * Use a stack to evaluate postfix RPN expressions.
 * Push operands onto stack. When encountering an operator (+, -, *, /), pop two operands,
 * evaluate operation, and push result back onto stack. (Truncate division towards zero).
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function evalRPN(tokens) {
    const stack = [];

    for (let token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/') {
            const b = stack.pop();
            const a = stack.pop();
            if (token === '+') stack.push(a + b);
            else if (token === '-') stack.push(a - b);
            else if (token === '*') stack.push(a * b);
            else if (token === '/') stack.push(Math.trunc(a / b));
        } else {
            stack.push(parseInt(token));
        }
    }
    return stack.pop();
}

// Test cases
console.log("['2','1','+','3','*'] ->", evalRPN(["2", "1", "+", "3", "*"])); // 9
console.log("['4','13','5','/','+'] ->", evalRPN(["4", "13", "5", "/", "+"])); // 6
