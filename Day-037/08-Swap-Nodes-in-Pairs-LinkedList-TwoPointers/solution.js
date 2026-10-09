/**
 * Problem: Swap Nodes in Pairs (LeetCode 24)
 * Difficulty: Medium
 * Topic: Linked List / Two Pointers / Pointer Manipulation
 * 
 * Description:
 * Given a linked list, swap every two adjacent nodes and return its head.
 * You must solve the problem without modifying the values in the list's nodes 
 * (i.e., only nodes themselves may be changed.)
 * 
 * Example 1:
 * Input: head = [1,2,3,4]
 * Output: [2,1,4,3]
 * 
 * Example 2:
 * Input: head = []
 * Output: []
 * 
 * Example 3:
 * Input: head = [1]
 * Output: [1]
 * 
 * Example 4:
 * Input: head = [1,2,3]
 * Output: [2,1,3]
 * 
 * Constraints:
 *   * The number of nodes in the list is in the range [0, 100].
 *   * 0 <= Node.val <= 100
 * 
 * Complexity:
 *   * Time Complexity: O(n) single pass over the linked list of length n.
 *   * Space Complexity: O(1) constant auxiliary space (iterative dummy node approach).
 */

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function swapPairs(head) {
    const dummy = new ListNode(0, head);
    let prev = dummy;

    while (prev.next !== null && prev.next.next !== null) {
        const first = prev.next;
        const second = prev.next.next;

        // Perform swapping of nodes
        first.next = second.next;
        second.next = first;
        prev.next = second;

        // Advance prev pointer two nodes ahead
        prev = first;
    }

    return dummy.next;
}

// Helpers for tests
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
    const arr = [];
    let curr = head;
    while (curr !== null) {
        arr.push(curr.val);
        curr = curr.next;
    }
    return arr;
}

function runTests() {
    console.log("=== Running Swap Nodes in Pairs Tests ===");

    const t1 = arrayToList([1, 2, 3, 4]);
    const res1 = listToArray(swapPairs(t1));
    console.log(`Test 1: [1,2,3,4] -> [${res1}] | Pass: ${JSON.stringify(res1) === JSON.stringify([2, 1, 4, 3])}`);

    const t2 = arrayToList([]);
    const res2 = listToArray(swapPairs(t2));
    console.log(`Test 2: [] -> [${res2}] | Pass: ${JSON.stringify(res2) === JSON.stringify([])}`);

    const t3 = arrayToList([1]);
    const res3 = listToArray(swapPairs(t3));
    console.log(`Test 3: [1] -> [${res3}] | Pass: ${JSON.stringify(res3) === JSON.stringify([1])}`);

    const t4 = arrayToList([1, 2, 3]);
    const res4 = listToArray(swapPairs(t4));
    console.log(`Test 4: [1,2,3] -> [${res4}] | Pass: ${JSON.stringify(res4) === JSON.stringify([2, 1, 3])}`);
}

runTests();
