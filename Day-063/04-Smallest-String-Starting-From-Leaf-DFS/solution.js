/**
 * LeetCode 988: Smallest String Starting From Leaf (Medium)
 * https://leetcode.com/problems/smallest-string-starting-from-leaf/
 *
 * You are given the root of a binary tree where each node has a value in the range [0, 25]
 * representing the letters 'a' to 'z'.
 *
 * Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.
 *
 * As a reminder, any shorter prefix of a string is lexicographically smaller:
 * - For example, "ab" is lexicographically smaller than "aba".
 * - A leaf of a node is a node that has no children.
 *
 * Example 1:
 * Input: root = [0,1,2,3,4,3,4]
 * Output: "dba"
 *
 * Example 2:
 * Input: root = [25,1,3,1,3,0,2]
 * Output: "adz"
 *
 * Example 3:
 * Input: root = [2,2,1,null,1,0,null,0]
 * Output: "abc"
 *
 * Constraints:
 * - The number of nodes in the tree is in the range [1, 8500].
 * - 0 <= Node.val <= 25
 */

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * @param {TreeNode} root
 * @return {string}
 */
function smallestFromLeaf(root) {
    let smallest = null;

    // Preorder DFS: collect characters along the path from root down to leaf
    function dfs(node, path) {
        if (!node) return;

        const char = String.fromCharCode(97 + node.val);
        // Prepend current character so that by the time we reach the leaf,
        // path string is already oriented from leaf to root!
        const newPath = char + path;

        // If leaf reached, compare with smallest string found so far
        if (!node.left && !node.right) {
            if (smallest === null || newPath < smallest) {
                smallest = newPath;
            }
            return;
        }

        dfs(node.left, newPath);
        dfs(node.right, newPath);
    }

    dfs(root, "");
    return smallest;
}

// Unit tests
function runTests() {
    // Test 1: root = [0, 1, 2, 3, 4, 3, 4]
    // leaf d (val 3) + b (val 1) + a (val 0) = "dba"
    const t1 = new TreeNode(0,
        new TreeNode(1, new TreeNode(3), new TreeNode(4)),
        new TreeNode(2, new TreeNode(3), new TreeNode(4))
    );
    console.assert(smallestFromLeaf(t1) === "dba", `Test 1 Failed: ${smallestFromLeaf(t1)}`);

    // Test 2: root = [25, 1, 3, 1, 3, 0, 2] -> "adz"
    // 'a' = 0, 'd' = 3, 'z' = 25
    const t2 = new TreeNode(25,
        new TreeNode(1, new TreeNode(1), new TreeNode(3)),
        new TreeNode(3, new TreeNode(0), new TreeNode(2))
    );
    console.assert(smallestFromLeaf(t2) === "adz", `Test 2 Failed: ${smallestFromLeaf(t2)}`);

    // Test 3: Single node tree [0] -> "a"
    const t3 = new TreeNode(0);
    console.assert(smallestFromLeaf(t3) === "a", `Test 3 Failed: ${smallestFromLeaf(t3)}`);

    // Test 4: Shorter prefix comparison: "ab" vs "aba"
    //       0 ('a')
    //      /
    //     1 ('b')
    //    /
    //   0 ('a')
    // Only one leaf: leaf (0='a') -> 1='b' -> 0='a' gives "aba"
    const t4 = new TreeNode(0, new TreeNode(1, new TreeNode(0)));
    console.assert(smallestFromLeaf(t4) === "aba", `Test 4 Failed: ${smallestFromLeaf(t4)}`);

    console.log("All Smallest String Starting From Leaf tests passed successfully!");
}

runTests();

