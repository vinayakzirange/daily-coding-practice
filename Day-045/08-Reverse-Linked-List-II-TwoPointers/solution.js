/**
 * Problem: Reverse Linked List II (LeetCode 92)
 * Difficulty: Medium
 * Topic: Linked List / Two Pointers
 *
 * Description:
 * Given the head of a singly linked list and two integers left and right where
 * left <= right, reverse the nodes of the list from position left to position
 * right, and return the reversed list.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5], left = 2, right = 4
 * Output: [1,4,3,2,5]
 *
 * Example 2:
 * Input: head = [5], left = 1, right = 1
 * Output: [5]
 *
 * Constraints:
 * - The number of nodes in the list is n.
 * - 1 <= n <= 500
 * - -500 <= Node.val <= 500
 * - 1 <= left <= right <= n
 *
 * Follow up: Could you do it in one pass?
 *
 * Complexity Analysis:
 * - Time Complexity: O(n) single pass through the linked list.
 * - Space Complexity: O(1) in-place pointer manipulation.
 */

// Definition for singly-linked list node.
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
function reverseBetween(head, left, right) {
    if (!head || left === right) {
        return head;
    }

    const dummy = new ListNode(0);
    dummy.next = head;

    // Step 1: Reach node just before position 'left'
    let prev = dummy;
    for (let i = 0; i < left - 1; i++) {
        prev = prev.next;
    }

    // Step 2: In-place head insertion for the sublist
    const curr = prev.next;
    for (let i = 0; i < right - left; i++) {
        const temp = curr.next;
        curr.next = temp.next;
        temp.next = prev.next;
        prev.next = temp;
    }

    return dummy.next;
}

// ==========================================
// Helpers & Test Cases
// ==========================================
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

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testCases = [
    { input: [1, 2, 3, 4, 5], left: 2, right: 4, expected: [1, 4, 3, 2, 5] },
    { input: [5], left: 1, right: 1, expected: [5] },
    { input: [1, 2, 3], left: 1, right: 3, expected: [3, 2, 1] },
    { input: [1, 2, 3, 4], left: 1, right: 2, expected: [2, 1, 3, 4] },
    { input: [1, 2, 3, 4], left: 3, right: 4, expected: [1, 2, 4, 3] },
];

testCases.forEach((tc, idx) => {
    const head = arrayToList(tc.input);
    const resultHead = reverseBetween(head, tc.left, tc.right);
    const resultArr = listToArray(resultHead);

    if (!arraysEqual(resultArr, tc.expected)) {
        console.error(`Test ${idx + 1} Failed: got [${resultArr}], expected [${tc.expected}]`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: [${tc.input}], left=${tc.left}, right=${tc.right} -> [${resultArr}]`);
});

console.log("\nAll Reverse Linked List II tests passed successfully!");
