/**
 * ====================================================================
 * Problem: Add Two Numbers II (LeetCode 445)
 * Difficulty: Medium
 * Topic: Linked List, Math, Stack
 * ====================================================================
 * 
 * You are given two non-empty linked lists representing two non-negative
 * integers. The most significant digit comes first and each of their nodes
 * contains a single digit. Add the two numbers and return the sum as a
 * linked list.
 * 
 * You may assume the two numbers do not contain any leading zero, except
 * the number 0 itself.
 * 
 * Example 1:
 * Input: l1 = [7,2,4,3], l2 = [5,6,4]
 * Output: [7,8,0,7]
 * 
 * Example 2:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [8,0,7]
 * 
 * Example 3:
 * Input: l1 = [0], l2 = [0]
 * Output: [0]
 * 
 * Constraints:
 * - The number of nodes in each linked list is in the range [1, 100].
 * - 0 <= Node.val <= 9
 * - It is guaranteed that the list represents a number that does not have leading zeros.
 * 
 * Follow up: Could you solve it without reversing the input lists?
 * ====================================================================
 */

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Adds two numbers represented by linked lists with most significant digit first.
 * Solved without reversing input lists by using two stacks.
 * 
 * Time Complexity: O(n + m) where n, m are lengths of l1 and l2
 * Space Complexity: O(n + m) for the stacks
 * 
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    const s1 = [];
    const s2 = [];

    let curr = l1;
    while (curr) {
        s1.push(curr.val);
        curr = curr.next;
    }

    curr = l2;
    while (curr) {
        s2.push(curr.val);
        curr = curr.next;
    }

    let head = null;
    let carry = 0;

    while (s1.length > 0 || s2.length > 0 || carry > 0) {
        const val1 = s1.length > 0 ? s1.pop() : 0;
        const val2 = s2.length > 0 ? s2.pop() : 0;

        const sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        const digit = sum % 10;

        const newNode = new ListNode(digit, head);
        head = newNode;
    }

    return head;
}

// --- Test Suite ---
function arrayToList(arr) {
    let dummy = new ListNode(0);
    let curr = dummy;
    for (let x of arr) {
        curr.next = new ListNode(x);
        curr = curr.next;
    }
    return dummy.next;
}

function listToArray(node) {
    const arr = [];
    while (node) {
        arr.push(node.val);
        node = node.next;
    }
    return arr;
}

if (require.main === module) {
    // Test 1: [7,2,4,3] + [5,6,4] -> [7,8,0,7]
    const l1 = arrayToList([7, 2, 4, 3]);
    const l2 = arrayToList([5, 6, 4]);
    const res1 = listToArray(addTwoNumbers(l1, l2));
    console.assert(JSON.stringify(res1) === JSON.stringify([7, 8, 0, 7]), `Test 1 failed: ${JSON.stringify(res1)}`);
    console.log(`Test 1 Passed: [7,2,4,3] + [5,6,4] -> ${JSON.stringify(res1)}`);

    // Test 2: [2,4,3] + [5,6,4] -> [8,0,7]
    const res2 = listToArray(addTwoNumbers(arrayToList([2, 4, 3]), arrayToList([5, 6, 4])));
    console.assert(JSON.stringify(res2) === JSON.stringify([8, 0, 7]), `Test 2 failed: ${JSON.stringify(res2)}`);
    console.log(`Test 2 Passed: [2,4,3] + [5,6,4] -> ${JSON.stringify(res2)}`);

    // Test 3: [0] + [0] -> [0]
    const res3 = listToArray(addTwoNumbers(arrayToList([0]), arrayToList([0])));
    console.assert(JSON.stringify(res3) === JSON.stringify([0]), `Test 3 failed: ${JSON.stringify(res3)}`);
    console.log(`Test 3 Passed: [0] + [0] -> ${JSON.stringify(res3)}`);

    // Test 4: Carry propagation: [9,9,9] + [1] -> [1,0,0,0]
    const res4 = listToArray(addTwoNumbers(arrayToList([9, 9, 9]), arrayToList([1])));
    console.assert(JSON.stringify(res4) === JSON.stringify([1, 0, 0, 0]), `Test 4 failed: ${JSON.stringify(res4)}`);
    console.log(`Test 4 Passed: [9,9,9] + [1] -> ${JSON.stringify(res4)}`);

    console.log("\nAll Add Two Numbers II tests passed successfully!");
}

module.exports = { addTwoNumbers, ListNode };
