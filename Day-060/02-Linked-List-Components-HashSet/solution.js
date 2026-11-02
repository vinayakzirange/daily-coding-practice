/**
 * LeetCode 817: Linked List Components (Medium)
 * https://leetcode.com/problems/linked-list-components/
 *
 * You are given the head of a linked list containing unique integer values and
 * an integer array nums that is a subset of the linked list values.
 *
 * Return the number of connected components in nums, where two values are connected
 * if they appear consecutively in the linked list.
 *
 * Example 1:
 * Input: head = [0,1,2,3], nums = [0,1,3]
 * Output: 2
 * Explanation: 0 and 1 are connected, so [0, 1] and [3] are the two connected components.
 *
 * Example 2:
 * Input: head = [0,1,2,3,4], nums = [0,3,1,4]
 * Output: 2
 * Explanation: 0 and 1 are connected, 3 and 4 are connected, so [0, 1] and [3, 4] are the two connected components.
 *
 * Constraints:
 * - The number of nodes in the linked list is n.
 * - 1 <= n <= 10^4
 * - 0 <= Node.val < n
 * - All the values Node.val are unique.
 * - 1 <= nums.length <= n
 * - 0 <= nums[i] < n
 * - All the values of nums are unique.
 */

// Definition for singly-linked list.
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

/**
 * @param {ListNode} head
 * @param {number[]} nums
 * @return {number}
 */
function numComponents(head, nums) {
    const numSet = new Set(nums);
    let count = 0;
    let curr = head;

    while (curr !== null) {
        // A connected component ends if curr.val is in set,
        // and either curr.next is null or curr.next.val is NOT in set.
        if (numSet.has(curr.val) && (curr.next === null || !numSet.has(curr.next.val))) {
            count++;
        }
        curr = curr.next;
    }

    return count;
}

// Helper to build linked list from array
function arrayToList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i]);
        curr = curr.next;
    }
    return head;
}

// Unit tests
function runTests() {
    // Test 1: [0,1,2,3], nums = [0,1,3] -> 2
    const list1 = arrayToList([0, 1, 2, 3]);
    const res1 = numComponents(list1, [0, 1, 3]);
    console.assert(res1 === 2, `Test 1 Failed: got ${res1}, expected 2`);

    // Test 2: [0,1,2,3,4], nums = [0,3,1,4] -> 2
    const list2 = arrayToList([0, 1, 2, 3, 4]);
    const res2 = numComponents(list2, [0, 3, 1, 4]);
    console.assert(res2 === 2, `Test 2 Failed: got ${res2}, expected 2`);

    // Test 3: [0,1,2], nums = [1] -> 1
    const list3 = arrayToList([0, 1, 2]);
    const res3 = numComponents(list3, [1]);
    console.assert(res3 === 1, `Test 3 Failed: got ${res3}, expected 1`);

    // Test 4: [0,1,2,3], nums = [0,1,2,3] -> 1
    const list4 = arrayToList([0, 1, 2, 3]);
    const res4 = numComponents(list4, [0, 1, 2, 3]);
    console.assert(res4 === 1, `Test 4 Failed: got ${res4}, expected 1`);

    console.log("All Linked List Components tests passed successfully!");
}

runTests();
