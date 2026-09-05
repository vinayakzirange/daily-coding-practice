/*
 * Problem Name: Min Stack
 * Problem Statement: Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).
 * 
 * Approach: Use a main stack and an auxiliary minStack that stores the current minimum at each level.
 * 
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(N)
 */

class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    if (val === this.getMin()) {
      this.minStack.pop();
    }
    return val;
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log("Min:", minStack.getMin()); // Expected: -3
minStack.pop();
console.log("Top:", minStack.top());    // Expected: 0
console.log("Min:", minStack.getMin()); // Expected: -2
