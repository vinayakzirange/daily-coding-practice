/**
 * Problem: Group the People Given the Group Size They Belong To (LeetCode 1282)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * There are n people that are split into some unknown number of groups. Each person is labeled
 * with a unique ID from 0 to n - 1.
 * 
 * You are given an integer array groupSizes, where groupSizes[i] is the group size that person i is in.
 * 
 * Return a list of groups such that each person i is in a group of size groupSizes[i].
 * Each person should appear in exactly one group, and every person must be in a group.
 * If there are multiple answers, return any of them. It is guaranteed that there will be at least
 * one valid solution for the given input.
 * 
 * Example 1:
 *  Input: groupSizes = [3,3,3,3,3,1,3]
 *  Output: [[5],[0,1,2],[3,4,6]]
 *  Explanation: 
 *   The first person 0 is in group size 3.
 *   The second person 1 is in group size 3.
 *   The sixth person 5 is in group size 1.
 * 
 * Example 2:
 *  Input: groupSizes = [2,1,3,3,3,2]
 *  Output: [[1],[0,5],[2,3,4]]
 * 
 * Constraints:
 *  groupSizes.length == n
 *  1 <= n <= 500
 *  1 <= groupSizes[i] <= n
 */

/**
 * Groups people by size requirement using Hash Map Bucket Grouping.
 * 
 * @param {number[]} groupSizes
 * @return {number[][]}
 * 
 * Complexity:
 *  Time: O(N) - Linear pass through all n people with constant-time grouping operations.
 *  Space: O(N) - Auxiliary space for storing groups.
 */
function groupThePeople(groupSizes) {
    const buckets = new Map();
    const result = [];

    for (let i = 0; i < groupSizes.length; i++) {
        const size = groupSizes[i];

        if (!buckets.has(size)) {
            buckets.set(size, []);
        }

        const bucket = buckets.get(size);
        bucket.push(i);

        // When bucket fills up to the required group size, move it to result
        if (bucket.length === size) {
            result.push(bucket);
            buckets.set(size, []);
        }
    }

    return result;
}

// ==========================================
// Test Cases & Validation
// ==========================================
function validateGroups(groupSizes, groups) {
    const visited = new Set();
    for (const group of groups) {
        const expectedSize = group.length;
        for (const person of group) {
            if (visited.has(person)) return false; // Duplicate person
            visited.add(person);
            if (groupSizes[person] !== expectedSize) return false; // Wrong size
        }
    }
    return visited.size === groupSizes.length;
}

function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const gs1 = [3, 3, 3, 3, 3, 1, 3];
    const res1 = groupThePeople(gs1);
    assert.strictEqual(validateGroups(gs1, res1), true, "Test 1 Failed");

    // Test 2: Example 2
    const gs2 = [2, 1, 3, 3, 3, 2];
    const res2 = groupThePeople(gs2);
    assert.strictEqual(validateGroups(gs2, res2), true, "Test 2 Failed");

    // Test 3: Everyone in group size 1
    const gs3 = [1, 1, 1];
    const res3 = groupThePeople(gs3);
    assert.strictEqual(validateGroups(gs3, res3), true, "Test 3 Failed");
    assert.strictEqual(res3.length, 3);

    // Test 4: Everyone in one single group
    const gs4 = [4, 4, 4, 4];
    const res4 = groupThePeople(gs4);
    assert.strictEqual(validateGroups(gs4, res4), true, "Test 4 Failed");
    assert.strictEqual(res4.length, 1);

    console.log("All Group the People Given the Group Size tests passed successfully!");
}

runTests();
