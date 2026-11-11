/**
 * Problem: Remove Sub-Folders from the Filesystem (LeetCode 1233)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given a list of folders folder, return the folders after removing all sub-folders in those folders.
 * You may return the answer in any order.
 * 
 * If a folder[i] is located within another folder[j], it is called a sub-folder of it.
 * A sub-folder must start with the parent path followed by a slash '/'.
 * For example, "/a/b" is a sub-folder of "/a", but "/ab" is NOT a sub-folder of "/a".
 * 
 * Example 1:
 *  Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
 *  Output: ["/a","/c/d","/c/f"]
 * 
 * Example 2:
 *  Input: folder = ["/a","/a/b/c","/a/b/d"]
 *  Output: ["/a"]
 * 
 * Example 3:
 *  Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
 *  Output: ["/a/b/c","/a/b/ca","/a/b/d"]
 * 
 * Constraints:
 *  1 <= folder.length <= 4 * 10^4
 *  2 <= folder[i].length <= 100
 *  folder[i] contains only lowercase letters and '/'.
 *  folder[i] always starts with the character '/'.
 *  Each folder name is unique.
 */

/**
 * Removes all sub-folders using Lexicographical Sorting and Prefix Filtering.
 * 
 * @param {string[]} folder
 * @return {string[]}
 * 
 * Complexity:
 *  Time: O(N * L * log(N)) where N = folder.length and L = max folder path length.
 *  Space: O(N * L) auxiliary space for the sorted array and output.
 */
function removeSubfolders(folder) {
    // Sort lexicographically so parent folders always precede their sub-folders
    folder.sort();

    const result = [];

    for (let i = 0; i < folder.length; i++) {
        const curr = folder[i];

        if (result.length === 0) {
            result.push(curr);
        } else {
            const lastParentPrefix = result[result.length - 1] + '/';
            // Only add if curr does not start with lastParent + '/'
            if (!curr.startsWith(lastParentPrefix)) {
                result.push(curr);
            }
        }
    }

    return result;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    const res1 = removeSubfolders(["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]);
    assert.deepStrictEqual(res1, ["/a", "/c/d", "/c/f"], `Test 1 Failed: ${JSON.stringify(res1)}`);

    // Test 2: Example 2
    const res2 = removeSubfolders(["/a", "/a/b/c", "/a/b/d"]);
    assert.deepStrictEqual(res2, ["/a"], `Test 2 Failed: ${JSON.stringify(res2)}`);

    // Test 3: Example 3 (Prefix collision without slash delimiter)
    const res3 = removeSubfolders(["/a/b/c", "/a/b/ca", "/a/b/d"]);
    assert.deepStrictEqual(res3, ["/a/b/c", "/a/b/ca", "/a/b/d"], `Test 3 Failed: ${JSON.stringify(res3)}`);

    // Test 4: Single folder
    const res4 = removeSubfolders(["/single"]);
    assert.deepStrictEqual(res4, ["/single"], "Test 4 Failed");

    // Test 5: Nested chain
    const res5 = removeSubfolders(["/x", "/x/y", "/x/y/z"]);
    assert.deepStrictEqual(res5, ["/x"], "Test 5 Failed");

    console.log("All Remove Sub-Folders from the Filesystem tests passed successfully!");
}

runTests();
