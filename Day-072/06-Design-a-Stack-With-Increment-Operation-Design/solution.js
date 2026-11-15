/**
 * Problem: Design a Stack With Increment Operation (LeetCode 1381)
 * Difficulty: Medium
 * Category: Stack / Design / Array / Lazy Propagation
 *
 * Description:
 * Design a stack that supports increment operations on its elements.
 *
 * Implement the CustomStack class:
 *   - CustomStack(int maxSize): Initializes the object with maxSize which is the
 *     maximum number of elements in the stack.
 *   - void push(int x): Adds x to the top of the stack if the stack has not reached the maxSize.
 *   - int pop(): Pops and returns the top of the stack or -1 if the stack is empty.
 *   - void inc(int k, int val): Increments the bottom k elements of the stack by val.
 *     If there are less than k elements in the stack, increment all the elements in the stack.
 *
 * Example:
 *   CustomStack customStack = new CustomStack(3); // Stack is Empty []
 *   customStack.push(1);                          // stack: [1]
 *   customStack.push(2);                          // stack: [1, 2]
 *   customStack.pop();                            // return 2 --> [1]
 *   customStack.push(2);                          // stack: [1, 2]
 *   customStack.push(3);                          // stack: [1, 2, 3]
 *   customStack.push(4);                          // stack: [1, 2, 3] (maxSize reached)
 *   customStack.increment(5, 100);                // stack becomes [101, 102, 103]
 *   customStack.increment(2, 100);                // stack becomes [201, 202, 103]
 *   customStack.pop();                            // return 103 --> [201, 202]
 *   customStack.pop();                            // return 202 --> [201]
 *   customStack.pop();                            // return 201 --> []
 *   customStack.pop();                            // return -1 (empty)
 *
 * Constraints:
 *   - 1 <= maxSize, x, k <= 1000
 *   - 0 <= val <= 100
 *   - At most 1000 calls will be made to each function of increment, push and pop each separately.
 */

class CustomStack {
  /**
   * @param {number} maxSize
   */
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.stack = [];
    // Lazy increment array: inc[i] stores the pending increment for stack[0..i]
    this.inc = new Array(maxSize).fill(0);
  }

  /**
   * Pushes x to top if stack has not reached capacity.
   * Time Complexity: O(1)
   *
   * @param {number} x
   * @return {void}
   */
  push(x) {
    if (this.stack.length < this.maxSize) {
      this.stack.push(x);
    }
  }

  /**
   * Pops and returns top element with lazy increments applied, or -1 if empty.
   * Time Complexity: O(1)
   *
   * @return {number}
   */
  pop() {
    const idx = this.stack.length - 1;
    if (idx < 0) {
      return -1;
    }

    const val = this.stack.pop() + this.inc[idx];

    // Propagate lazy increment to the element below
    if (idx > 0) {
      this.inc[idx - 1] += this.inc[idx];
    }
    this.inc[idx] = 0;

    return val;
  }

  /**
   * Increments bottom k elements by val in O(1) time using lazy propagation.
   * Time Complexity: O(1)
   *
   * @param {number} k
   * @param {number} val
   * @return {void}
   */
  increment(k, val) {
    const idx = Math.min(k, this.stack.length) - 1;
    if (idx >= 0) {
      this.inc[idx] += val;
    }
  }
}

// ----------------- Unit Tests -----------------
function runTests() {
  const assert = require('assert');

  // Test suite from problem statement
  const cs = new CustomStack(3);
  cs.push(1);
  cs.push(2);
  assert.strictEqual(cs.pop(), 2, 'Test 1: pop() should be 2');

  cs.push(2);
  cs.push(3);
  cs.push(4); // Ignored due to maxSize = 3

  cs.increment(5, 100);
  cs.increment(2, 100);

  assert.strictEqual(cs.pop(), 103, 'Test 2: pop() should be 103');
  assert.strictEqual(cs.pop(), 202, 'Test 3: pop() should be 202');
  assert.strictEqual(cs.pop(), 201, 'Test 4: pop() should be 201');
  assert.strictEqual(cs.pop(), -1, 'Test 5: pop() on empty should be -1');

  // Additional Edge Cases
  const cs2 = new CustomStack(1);
  assert.strictEqual(cs2.pop(), -1, 'Empty pop');
  cs2.push(42);
  cs2.push(99); // overflow
  cs2.increment(10, 8);
  assert.strictEqual(cs2.pop(), 50, 'Single element increment');
  assert.strictEqual(cs2.pop(), -1, 'Post pop empty');

  console.log('All tests passed for 06-Design-a-Stack-With-Increment-Operation-Design!');
}

if (require.main === module) {
  runTests();
}

module.exports = { CustomStack };
