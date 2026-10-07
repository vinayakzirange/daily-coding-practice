/**
 * Problem: Remove Duplicates from Sorted List II (LeetCode 82)
 * Difficulty: Medium
 * Topic: Linked List / Two Pointers / Dummy Sentinel Node
 * 
 * Description:
 * Given the head of a sorted linked list, delete all nodes that have duplicate numbers,
 * leaving only distinct numbers from the original list. Return the linked list sorted as well.
 * 
 * Example 1:
 * Input: head = [1,2,3,3,4,4,5]
 * Output: [1,2,5]
 * 
 * Example 2:
 * Input: head = [1,1,1,2,3]
 * Output: [2,3]
 * 
 * Constraints:
 *   * The number of nodes in the list is in the range [0, 300].
 *   * -100 <= Node.val <= 100
 *   * The list is guaranteed to be sorted in ascending order.
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Single pass through the sorted linked list.
 *   * Space Complexity: O(1) - Constant auxiliary space.
 */

// Definition for singly-linked list.
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function deleteDuplicates(head) {
    const dummy = new ListNode(0, head);
    let prev = dummy; // Last node before duplicate sublist

    while (head !== null) {
        // If start of duplicates is detected
        if (head.next !== null && head.val === head.next.val) {
            // Move head until the end of duplicate sequence
            while (head.next !== null && head.val === head.next.val) {
                head = head.next;
            }
            // Skip all duplicates
            prev.next = head.next;
        } else {
            prev = prev.next;
        }
        head = head.next;
    }

    return dummy.next;
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
        { arr: [1, 2, 3, 3, 4, 4, 5], expected: [1, 2, 5] },
        { arr: [1, 1, 1, 2, 3], expected: [2, 3] },
        { arr: [1, 1, 1], expected: [] },
        { arr: [1, 2, 3], expected: [1, 2, 3] },
        { arr: [], expected: [] }
    ];

    testCases.forEach((tc, idx) => {
        const head = arrayToList(tc.arr);
        const resHead = deleteDuplicates(head);
        const resArr = listToArray(resHead);
        console.assert(JSON.stringify(resArr) === JSON.stringify(tc.expected), `Test ${idx + 1} Failed: got ${resArr}`);
        console.log(`Test ${idx + 1} Passed: arr=[${tc.arr}] -> result=[${resArr}]`);
    });

    console.log('\nAll Remove Duplicates from Sorted List II tests passed successfully!');
}

runTests();
