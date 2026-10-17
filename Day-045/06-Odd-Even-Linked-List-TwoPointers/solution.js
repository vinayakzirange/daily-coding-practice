/**
 * Problem: Odd Even Linked List (LeetCode 328)
 * Difficulty: Medium
 * Topic: Linked List / Two Pointers
 *
 * Description:
 * Given the head of a singly linked list, group all the nodes with odd indices
 * together followed by the nodes with even indices, and return the reordered list.
 *
 * The first node is considered odd, and the second node is even, and so on.
 *
 * Note that the relative order inside both the even and odd groups should remain
 * as it was in the input.
 *
 * You must solve the problem in O(1) extra space complexity and O(n) time complexity.
 *
 * Example 1:
 * Input: head = [1,2,3,4,5]
 * Output: [1,3,5,2,4]
 *
 * Example 2:
 * Input: head = [2,1,3,5,6,4,7]
 * Output: [2,3,6,7,1,5,4]
 *
 * Constraints:
 * - The number of nodes in the linked list is in the range [0, 10^4].
 * - -10^6 <= Node.val <= 10^6
 *
 * Complexity Analysis:
 * - Time Complexity: O(n) single pass through the linked list.
 * - Space Complexity: O(1) strictly in-place pointer adjustments.
 */

// Definition for singly-linked list node.
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function oddEvenList(head) {
    if (!head || !head.next) {
        return head;
    }

    let odd = head;
    let even = head.next;
    const evenHead = even;

    while (even !== null && even.next !== null) {
        odd.next = even.next;
        odd = odd.next;

        even.next = odd.next;
        even = even.next;
    }

    // Connect the end of the odd list to the head of the even list
    odd.next = evenHead;

    return head;
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
    { input: [1, 2, 3, 4, 5], expected: [1, 3, 5, 2, 4] },
    { input: [2, 1, 3, 5, 6, 4, 7], expected: [2, 3, 6, 7, 1, 5, 4] },
    { input: [], expected: [] },
    { input: [1], expected: [1] },
    { input: [1, 2], expected: [1, 2] },
    { input: [1, 2, 3], expected: [1, 3, 2] }
];

testCases.forEach((tc, idx) => {
    const head = arrayToList(tc.input);
    const resultHead = oddEvenList(head);
    const resultArr = listToArray(resultHead);

    if (!arraysEqual(resultArr, tc.expected)) {
        console.error(`Test ${idx + 1} Failed: got [${resultArr}], expected [${tc.expected}]`);
        process.exit(1);
    }
    console.log(`Test ${idx + 1} Passed: [${tc.input}] -> [${resultArr}]`);
});

console.log("\nAll Odd Even Linked List tests passed successfully!");
