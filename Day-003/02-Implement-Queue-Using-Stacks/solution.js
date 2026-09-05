/*
 * Problem Name: Implement Queue using Stacks
 * Problem Statement: Implement a first in first out (FIFO) queue using only two stacks.
 * 
 * Approach: Use two stacks - `inStack` for push operations, and `outStack` for pop/peek operations.
 * Transfer elements from `inStack` to `outStack` only when `outStack` is empty.
 * 
 * Time Complexity: Amortized O(1) for pop/peek, O(1) for push
 * Space Complexity: O(N)
 */

class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x) {
    this.inStack.push(x);
  }

  pop() {
    this._move();
    return this.outStack.pop();
  }

  peek() {
    this._move();
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }

  _move() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
  }
}

const queue = new MyQueue();
queue.push(1);
queue.push(2);
console.log("Peek:", queue.peek()); // 1
console.log("Pop:", queue.pop());   // 1
console.log("Empty:", queue.empty()); // false
