/**
 * Problem: Simplify Path (LeetCode 71)
 * Difficulty: Medium
 * Topic: String / Stack / Canonical Unix File Path
 * 
 * Description:
 * Given an absolute path for a Unix-style file system, which begins with a slash '/',
 * transform this path into its simplified canonical path.
 * 
 * In Unix-style file system rules:
 *   * A period '.' refers to the current directory.
 *   * A double period '..' refers to the directory up a level (parent directory).
 *   * Multiple consecutive slashes such as '//' are treated as a single slash '/'.
 *   * Any other format of periods such as '...' are treated as file/directory names.
 * 
 * The simplified canonical path should follow these rules:
 *   * The path must start with a single slash '/'.
 *   * Directories within the path must be separated by exactly one slash '/'.
 *   * The path must not end with a slash '/', unless it is the root directory.
 *   * The path must not have any single or double periods ('.' and '..') used to denote current or parent directories.
 * 
 * Example 1:
 * Input: path = "/home/"
 * Output: "/home"
 * 
 * Example 2:
 * Input: path = "/home//foo/"
 * Output: "/home/foo"
 * 
 * Example 3:
 * Input: path = "/home/user/Documents/../Pictures"
 * Output: "/home/user/Pictures"
 * 
 * Example 4:
 * Input: path = "/../"
 * Output: "/"
 * 
 * Example 5:
 * Input: path = "/.../a/../b/c/../d/./"
 * Output: "/.../b/d"
 * 
 * Constraints:
 *   * 1 <= path.length <= 3000
 *   * path consists of English letters, digits, period '.', slash '/' or '_'.
 *   * path is a valid absolute Unix path.
 * 
 * Complexity:
 *   * Time Complexity: O(n) - Splitting path by '/' and iterating over components.
 *   * Space Complexity: O(n) - Stack stores canonical directory components.
 */

/**
 * @param {string} path
 * @return {string}
 */
function simplifyPath(path) {
    const components = path.split('/');
    const stack = [];

    for (const comp of components) {
        if (comp === '' || comp === '.') {
            // Empty string (from repeated slashes) or current directory: ignore
            continue;
        } else if (comp === '..') {
            // Parent directory: pop previous directory if stack is not empty
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            // Valid directory or file name
            stack.push(comp);
        }
    }

    return '/' + stack.join('/');
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    const testCases = [
        { path: "/home/", expected: "/home" },
        { path: "/home//foo/", expected: "/home/foo" },
        { path: "/home/user/Documents/../Pictures", expected: "/home/user/Pictures" },
        { path: "/../", expected: "/" },
        { path: "/.../a/../b/c/../d/./", expected: "/.../b/d" },
        { path: "/a/./b/../../c/", expected: "/c" },
        { path: "/a/../../b/../c//.//", expected: "/c" }
    ];

    testCases.forEach((tc, idx) => {
        const result = simplifyPath(tc.path);
        console.assert(result === tc.expected, `Test ${idx + 1} Failed: got "${result}", expected "${tc.expected}"`);
        console.log(`Test ${idx + 1} Passed: path="${tc.path}" -> canonical="${result}"`);
    });

    console.log('\nAll Simplify Path tests passed successfully!');
}

runTests();
