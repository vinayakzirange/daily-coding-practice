/**
 * Problem: Min Stack (LeetCode 155)
 * Difficulty: Medium
 * Topic: Stack / Design
 *
 * Description:
 * Design a stack that supports push, pop, top, and retrieving the minimum
 * element in constant time.
 *
 * Implement the MinStack class:
 * - MinStack() initializes the stack object.
 * - void push(int val) pushes the element val onto the stack.
 * - void pop() removes the element on the top of the stack.
 * - int top() gets the top element of the stack.
 * - int getMin() retrieves the minimum element in the stack.
 *
 * You must implement a solution with O(1) time complexity for each function.
 *
 * Example 1:
 * Input:
 * ["MinStack","push","push","push","getMin","pop","top","getMin"]
 * [[],[-2],[0],[-3],[],[],[],[]]
 * Output:
 * [null,null,null,null,-3,null,0,-2]
 *
 * Explanation:
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin(); // return -3
 * minStack.pop();
 * minStack.top();    // return 0
 * minStack.getMin(); // return -2
 *
 * Constraints:
 * - -2^31 <= val <= 2^31 - 1
 * - Methods pop, top and getMin operations will always be called on non-empty stacks.
 * - At most 3 * 10^4 calls will be made to push, pop, top, and getMin.
 *
 * Complexity Analysis:
 * - Time Complexity: O(1) for all methods push, pop, top, and getMin.
 * - Space Complexity: O(n) where n is the number of elements in the stack.
 */

class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.stack.push(val);
        const currentMin = this.minStack.length === 0
            ? val
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(currentMin);
    }

    /**
     * @return {void}
     */
    pop() {
        this.stack.pop();
        this.minStack.pop();
    }

    /**
     * @return {number}
     */
    top() {
        return this.stack[this.stack.length - 1];
    }

    /**
     * @return {number}
     */
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// ==========================================
// Test Cases & Verification
// ==========================================
const minStack = new MinStack();

minStack.push(-2);
minStack.push(0);
minStack.push(-3);

console.log(`Test 1 Passed: getMin() = ${minStack.getMin()} (expected -3)`);
if (minStack.getMin() !== -3) process.exit(1);

minStack.pop();

console.log(`Test 2 Passed: top() = ${minStack.top()} (expected 0)`);
if (minStack.top() !== 0) process.exit(1);

console.log(`Test 3 Passed: getMin() = ${minStack.getMin()} (expected -2)`);
if (minStack.getMin() !== -2) process.exit(1);

minStack.push(5);
minStack.push(-10);

console.log(`Test 4 Passed: getMin() = ${minStack.getMin()} (expected -10)`);
if (minStack.getMin() !== -10) process.exit(1);

minStack.pop();
console.log(`Test 5 Passed: getMin() = ${minStack.getMin()} (expected -2)`);
if (minStack.getMin() !== -2) process.exit(1);

console.log("\nAll Min Stack tests passed successfully!");
