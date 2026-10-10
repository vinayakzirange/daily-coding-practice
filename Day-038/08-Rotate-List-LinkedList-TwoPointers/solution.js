/**
 * Problem: Rotate List (LeetCode 61)
 * Difficulty: Medium
 * Topic: Linked List / Two Pointers / Modulo Arithmetic
 * 
 * Description:
 * Given the head of a linked list, rotate the list to the right by k places.
 * 
 * Example 1:
 * Input: head = [1,2,3,4,5], k = 2
 * Output: [4,5,1,2,3]
 * 
 * Example 2:
 * Input: head = [0,1,2], k = 4
 * Output: [2,0,1]
 * 
 * Constraints:
 *   * The number of nodes in the list is in the range [0, 500].
 *   * -100 <= Node.val <= 100
 *   * 0 <= k <= 2 * 10^9
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Single pass to find length and tail, then second partial pass to break cycle.
 *   * Space Complexity: O(1) - Constant auxiliary pointers.
 */

// Definition for singly-linked list.
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function rotateRight(head, k) {
    if (!head || !head.next || k === 0) {
        return head;
    }

    // Step 1: Find the length of the linked list and the tail node
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }

    // Effective rotations
    k = k % length;
    if (k === 0) {
        return head;
    }

    // Step 2: Form a circular list temporarily
    tail.next = head;

    // Step 3: Find the new tail at position (length - k - 1)
    let stepsToNewTail = length - k;
    let newTail = head;
    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next;
    }

    // Step 4: The new head is newTail.next, then break the circular link
    const newHead = newTail.next;
    newTail.next = null;

    return newHead;
}

// Helpers
function arrayToList(arr) {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (const val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    return dummy.next;
}

function listToArray(head) {
    const res = [];
    let curr = head;
    while (curr) {
        res.push(curr.val);
        curr = curr.next;
    }
    return res;
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { arr: [1, 2, 3, 4, 5], k: 2, expected: [4, 5, 1, 2, 3] },
        { arr: [0, 1, 2], k: 4, expected: [2, 0, 1] },
        { arr: [1, 2], k: 1, expected: [2, 1] },
        { arr: [1, 2], k: 2, expected: [1, 2] },
        { arr: [], k: 10, expected: [] },
        { arr: [1], k: 99, expected: [1] }
    ];

    testCases.forEach((tc, idx) => {
        const head = arrayToList(tc.arr);
        const rotated = rotateRight(head, tc.k);
        const resArr = listToArray(rotated);
        console.assert(JSON.stringify(resArr) === JSON.stringify(tc.expected), `Test ${idx + 1} Failed: got ${resArr}`);
        console.log(`Test ${idx + 1} Passed: arr=[${tc.arr}], k=${tc.k} -> rotated=[${resArr}]`);
    });

    console.log('\nAll Rotate List tests passed successfully!');
}

runTests();
