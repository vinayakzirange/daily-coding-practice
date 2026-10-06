/**
 * Problem: Remove Nth Node From End of List (LeetCode 19)
 * Difficulty: Medium
 * Topic: Linked List / Two Pointers / Fast & Slow / Dummy Sentinel Node
 * 
 * Description:
 * Given the head of a linked list, remove the nth node from the end of the list and return its head.
 * 
 * Example 1:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 * 
 * Example 2:
 * Input: head = [1], n = 1
 * Output: []
 * 
 * Example 3:
 * Input: head = [1,2], n = 1
 * Output: [1]
 * 
 * Constraints:
 *   * The number of nodes in the list is sz.
 *   * 1 <= sz <= 30
 *   * 0 <= Node.val <= 100
 *   * 1 <= n <= sz
 * 
 * Complexity:
 *   * Time Complexity: O(sz) - Single pass through the list using two pointers.
 *   * Space Complexity: O(1) - Constant auxiliary memory.
 */

// Definition for singly-linked list.
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
    // Create dummy node pointing to head to handle edge case of removing head
    const dummy = new ListNode(0, head);
    let fast = dummy;
    let slow = dummy;

    // Advance fast pointer by n + 1 steps
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Move both until fast reaches the end
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // slow is now pointing immediately before the node to delete
    slow.next = slow.next.next;

    return dummy.next;
}

// Helper to convert array to linked list
function arrayToList(arr) {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (const val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    return dummy.next;
}

// Helper to convert linked list to array
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
        { arr: [1, 2, 3, 4, 5], n: 2, expected: [1, 2, 3, 5] },
        { arr: [1], n: 1, expected: [] },
        { arr: [1, 2], n: 1, expected: [1] },
        { arr: [1, 2], n: 2, expected: [2] },
        { arr: [10, 20, 30], n: 3, expected: [20, 30] }
    ];

    testCases.forEach((tc, idx) => {
        const head = arrayToList(tc.arr);
        const resultHead = removeNthFromEnd(head, tc.n);
        const resultArr = listToArray(resultHead);
        console.assert(JSON.stringify(resultArr) === JSON.stringify(tc.expected), `Test ${idx + 1} Failed: got ${resultArr}`);
        console.log(`Test ${idx + 1} Passed: arr=[${tc.arr}], n=${tc.n} -> result=[${resultArr}]`);
    });

    console.log('\nAll Remove Nth Node From End of List tests passed successfully!');
}

runTests();
