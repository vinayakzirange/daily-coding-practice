/**
 * ====================================================================
 * Problem: Longest Absolute File Path (LeetCode 388)
 * Difficulty: Medium
 * Topic: String, Stack, Depth-First Search
 * ====================================================================
 * 
 * Suppose we have a file system that stores both files and directories.
 * An example representation of a file system:
 * "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"
 * 
 * We want to find the longest (number of characters) absolute path to a
 * file within our file system. The path only includes files, not directories.
 * 
 * If there is no file in the system, return 0.
 * 
 * Example 1:
 * Input: input = "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"
 * Output: 20
 * Explanation: We have only one file, and the absolute path is "dir/subdir2/file.ext"
 * of length 20.
 * 
 * Example 2:
 * Input: input = "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"
 * Output: 32
 * Explanation: We have two files:
 * "dir/subdir1/file1.ext" of length 21
 * "dir/subdir2/subsubdir2/file2.ext" of length 32.
 * We return 32 since it is the longest absolute path to a file.
 * 
 * Example 3:
 * Input: input = "a"
 * Output: 0
 * Explanation: We do not have any files, just a single directory named "a".
 * 
 * Constraints:
 * - 1 <= input.length <= 10^4
 * - input may contain lowercase or uppercase English letters, a new line character '\n',
 *   a tab character '\t', a dot '.', a space ' ', and digits.
 * ====================================================================
 */

/**
 * Finds the length of the longest absolute path to a file.
 * Uses a Stack to track cumulative path lengths at each depth level.
 * 
 * Time Complexity: O(n) where n = input.length
 * Space Complexity: O(depth) <= O(n) for depth stack
 * 
 * @param {string} input
 * @return {number}
 */
function lengthLongestPath(input) {
    let maxLen = 0;
    // pathLen[depth] stores path length of directory prefix up to that depth
    const pathLen = { 0: 0 };

    const lines = input.split('\n');

    for (let line of lines) {
        // Count number of leading '\t' to determine depth
        let depth = 0;
        while (depth < line.length && line[depth] === '\t') {
            depth++;
        }

        const name = line.slice(depth);

        if (name.includes('.')) {
            // It's a file!
            // Length is directory prefix length + file name length (slashes already counted)
            const currentTotal = (pathLen[depth] || 0) + name.length;
            if (currentTotal > maxLen) {
                maxLen = currentTotal;
            }
        } else {
            // It's a directory: add name length + 1 for '/' separator
            pathLen[depth + 1] = (pathLen[depth] || 0) + name.length + 1;
        }
    }

    return maxLen;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" -> 20 ("dir/subdir2/file.ext")
    const t1 = "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext";
    console.assert(lengthLongestPath(t1) === 20, `Test 1 failed: ${lengthLongestPath(t1)}`);
    console.log(`Test 1 Passed: "${t1.replace(/\n/g, '\\n').replace(/\t/g, '\\t')}" -> 20`);

    // Test 2: Two files, longest is 32
    const t2 = "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext";
    console.assert(lengthLongestPath(t2) === 32, `Test 2 failed: ${lengthLongestPath(t2)}`);
    console.log(`Test 2 Passed: complex hierarchy -> 32`);

    // Test 3: No files ("a") -> 0
    console.assert(lengthLongestPath("a") === 0, "Test 3 failed");
    console.log(`Test 3 Passed: "a" -> 0`);

    // Test 4: Root level file: "file.ext" -> 8
    console.assert(lengthLongestPath("file.ext") === 8, "Test 4 failed");
    console.log(`Test 4 Passed: "file.ext" -> 8`);

    // Test 5: Multiple sibling directories
    const t5 = "dir\n\tfile.txt\n\tother_dir\n\t\tlonger_file.txt";
    // "dir/other_dir/longer_file.txt" = 3 + 1 + 9 + 1 + 15 = 29
    console.assert(lengthLongestPath(t5) === 29, `Test 5 failed: ${lengthLongestPath(t5)}`);
    console.log(`Test 5 Passed: sibling dirs -> 29`);

    console.log("\nAll Longest Absolute File Path tests passed successfully!");
}

module.exports = { lengthLongestPath };
