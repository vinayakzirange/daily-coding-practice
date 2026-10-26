/**
 * ====================================================================
 * Problem: Lexicographical Numbers (LeetCode 386)
 * Difficulty: Medium
 * Topic: Depth-First Search, Trie
 * ====================================================================
 * 
 * Given an integer n, return all the numbers in the range [1, n]
 * sorted in lexicographical order.
 * 
 * You must write an algorithm that runs in O(n) time and uses O(1)
 * extra space.
 * 
 * Example 1:
 * Input: n = 13
 * Output: [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]
 * 
 * Example 2:
 * Input: n = 2
 * Output: [1, 2]
 * 
 * Constraints:
 * - 1 <= n <= 5 * 10^4
 * ====================================================================
 */

/**
 * Generates lexicographical order iteratively simulating a DFS traversal
 * on a 10-ary tree (preorder).
 * 
 * Complexity:
 * - Time: O(n) since every number is visited once
 * - Space: O(1) auxiliary space (excluding result array)
 * 
 * @param {number} n
 * @return {number[]}
 */
function lexicalOrder(n) {
    const result = [];
    let curr = 1;

    for (let i = 0; i < n; i++) {
        result.push(curr);

        if (curr * 10 <= n) {
            // Traverse down the subtree (multiply by 10)
            curr *= 10;
        } else {
            // Traverse to the next sibling or backtrack up
            while (curr % 10 === 9 || curr >= n) {
                curr = Math.floor(curr / 10);
            }
            curr++;
        }
    }

    return result;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: n = 13
    const res1 = lexicalOrder(13);
    const expected1 = [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9];
    console.assert(
        JSON.stringify(res1) === JSON.stringify(expected1),
        `Test 1 Failed: got ${JSON.stringify(res1)}`
    );

    // Test 2: n = 2
    const res2 = lexicalOrder(2);
    console.assert(
        JSON.stringify(res2) === JSON.stringify([1, 2]),
        `Test 2 Failed: got ${JSON.stringify(res2)}`
    );

    // Test 3: n = 25
    const res3 = lexicalOrder(25);
    // Verify lexicographical order by checking string comparisons
    for (let i = 0; i < res3.length - 1; i++) {
        console.assert(
            String(res3[i]).localeCompare(String(res3[i + 1])) < 0,
            `Test 3 Failed: order violation at index ${i}: ${res3[i]} vs ${res3[i + 1]}`
        );
    }
    console.assert(res3.length === 25, "Test 3 Failed: length should be 25");

    console.log("All Lexicographical Numbers tests passed successfully!");
}

module.exports = { lexicalOrder };
