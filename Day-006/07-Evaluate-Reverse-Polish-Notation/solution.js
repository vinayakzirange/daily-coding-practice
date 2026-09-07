/*
 * Problem Name: Evaluate Reverse Polish Notation
 * Problem Statement: Evaluate the value of an arithmetic expression in Reverse Polish Notation (Postfix notation).
 * Valid operators are '+', '-', '*', and '/'. Each operand may be an integer or another expression.
 * 
 * Approach: Stack data structure. Push numbers to stack, pop two operands when an operator is encountered, 
 * compute result and push back.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function evalRPN(tokens) {
  const stack = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      stack.push(parseInt(token, 10));
    } else {
      let b = stack.pop();
      let a = stack.pop();

      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(Math.trunc(a / b)); break;
      }
    }
  }

  return stack.pop();
}

console.log("RPN ['2', '1', '+', '3', '*']:", evalRPN(["2", "1", "+", "3", "*"])); // Expected: 9 ((2 + 1) * 3)
console.log("RPN ['4', '13', '5', '/', '+']:", evalRPN(["4", "13", "5", "/", "+"])); // Expected: 6 (4 + (13 / 5))
