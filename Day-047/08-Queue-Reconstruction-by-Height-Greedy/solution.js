/**
 * ====================================================================
 * Problem: Queue Reconstruction by Height (LeetCode 406)
 * Difficulty: Medium
 * Topic: Array, Binary Indexed Tree, Segment Tree, Sorting, Greedy
 * ====================================================================
 * 
 * You are given an array of people, people, which are the attributes of
 * some people in a queue (not necessarily in order). Each people[i] = [h_i, k_i]
 * represents the ith person of height h_i with exactly k_i other people
 * in front who have a height greater than or equal to h_i.
 * 
 * Reconstruct and return the queue that is represented by the input array
 * people. The returned queue should be formatted such that people[i] = [h_i, k_i]
 * is the ith person in the queue (people[0] is the person at the front of
 * the queue).
 * 
 * Example 1:
 * Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
 * Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
 * Explanation:
 * Person 0 has height 5 with no other people taller or the same height in front.
 * Person 1 has height 7 with no other people taller or the same height in front.
 * Person 2 has height 5 with 2 people taller or the same height in front, which is person 0 and 1.
 * Person 3 has height 6 with 1 person taller or the same height in front, which is person 1.
 * Person 4 has height 4 with 4 people taller or the same height in front, which are people 0, 1, 2, and 3.
 * Person 5 has height 7 with 1 person taller or the same height in front, which is person 1.
 * Hence [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] is the reconstructed queue.
 * 
 * Example 2:
 * Input: people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
 * Output: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
 * 
 * Constraints:
 * - 1 <= people.length <= 2000
 * - 0 <= h_i <= 10^6
 * - 0 <= k_i < people.length
 * - It is guaranteed that the queue can be reconstructed.
 * ====================================================================
 */

/**
 * Reconstructs queue by height using Greedy sorting.
 * Sort by height DESCENDING; if heights are equal, sort by k ASCENDING.
 * Then insert each person at index k into the output list.
 * 
 * Why this works:
 * When inserting a shorter person at index k, all previously inserted people
 * are taller or equal in height, so inserting at index k guarantees exactly k
 * taller people ahead without violating constraints for anyone placed earlier.
 * 
 * Time Complexity: O(n^2) where n = people.length
 * Space Complexity: O(n) for output list
 * 
 * @param {number[][]} people
 * @return {number[][]}
 */
function reconstructQueue(people) {
    // Sort: h DESC, then k ASC
    people.sort((a, b) => {
        if (a[0] !== b[0]) {
            return b[0] - a[0];
        }
        return a[1] - b[1];
    });

    const queue = [];
    for (let p of people) {
        queue.splice(p[1], 0, p);
    }

    return queue;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: Standard example
    const p1 = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]];
    const r1 = reconstructQueue(p1);
    const exp1 = [[5, 0], [7, 0], [5, 2], [6, 1], [4, 4], [7, 1]];
    console.assert(JSON.stringify(r1) === JSON.stringify(exp1), `Test 1 failed: ${JSON.stringify(r1)}`);
    console.log(`Test 1 Passed: ${JSON.stringify(r1)}`);

    // Test 2: Decreasing heights
    const p2 = [[6, 0], [5, 0], [4, 0], [3, 2], [2, 2], [1, 4]];
    const r2 = reconstructQueue(p2);
    const exp2 = [[4, 0], [5, 0], [2, 2], [3, 2], [1, 4], [6, 0]];
    console.assert(JSON.stringify(r2) === JSON.stringify(exp2), `Test 2 failed: ${JSON.stringify(r2)}`);
    console.log(`Test 2 Passed: ${JSON.stringify(r2)}`);

    // Test 3: Single person
    const p3 = [[1, 0]];
    const r3 = reconstructQueue(p3);
    console.assert(JSON.stringify(r3) === JSON.stringify([[1, 0]]), "Test 3 failed");
    console.log(`Test 3 Passed: ${JSON.stringify(r3)}`);

    // Test 4: Equal heights with increasing k
    const p4 = [[2, 0], [2, 1], [2, 2]];
    const r4 = reconstructQueue(p4);
    const exp4 = [[2, 0], [2, 1], [2, 2]];
    console.assert(JSON.stringify(r4) === JSON.stringify(exp4), "Test 4 failed");
    console.log(`Test 4 Passed: ${JSON.stringify(r4)}`);

    console.log("\nAll Queue Reconstruction by Height tests passed successfully!");
}

module.exports = { reconstructQueue };
