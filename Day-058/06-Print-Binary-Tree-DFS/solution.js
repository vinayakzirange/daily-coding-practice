/**
 * ====================================================================
 * Problem: Print Binary Tree (LeetCode 655)
 * Difficulty: Medium
 * Topic: Tree, Depth-First Search, Breadth-First Search, Binary Tree
 * ====================================================================
 * 
 * Given the root of a binary tree, construct a 0-indexed m x n string
 * matrix res that represents a formatted layout of the tree. The formatted
 * layout matrix should be generated using the following rules:
 * - The height of the tree is height and the number of rows m is height + 1.
 * - The number of columns n is 2^(height + 1) - 1.
 * - Place the root node in the middle of the top row:
 *   res[0][(n - 1) / 2] = String(root.val).
 * - For any that has been placed at res[r][c]:
 *   - left child is at res[r + 1][c - 2^(height - r - 1)]
 *   - right child is at res[r + 1][c + 2^(height - r - 1)]
 * - Continue this process until all the nodes in the tree have been placed.
 * - Any empty cells should contain the empty string "".
 * 
 * Return the constructed matrix res.
 * 
 * Example 1:
 *      1
 *     /
 *    2
 * Output:
 * [["","1",""],
 *  ["2","",""]]
 * 
 * Example 2:
 *        1
 *       / \
 *      2   3
 *       \
 *        4
 * Output:
 * [["","","","1","","",""],
 *  ["","2","","","","3",""],
 *  ["","","4","","","",""]]
 * 
 * Constraints:
 * - The number of nodes in the tree is in the range [1, 2^10].
 * - -99 <= Node.val <= 99
 * - The depth of the tree will be in the range [1, 10].
 * ====================================================================
 */

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Formats a binary tree into an m x n 2D string grid using DFS.
 * 
 * Complexity:
 * - Time: O(m * n) where m = height + 1, n = 2^(height + 1) - 1
 * - Space: O(m * n) for the result grid
 * 
 * @param {TreeNode} root
 * @return {string[][]}
 */
function printTree(root) {
    // Step 1: Compute height of tree (0-indexed)
    function getHeight(node) {
        if (!node) return -1;
        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    const height = getHeight(root);
    const m = height + 1;
    const n = Math.pow(2, height + 1) - 1;

    // Initialize m x n matrix of empty strings
    const res = Array.from({ length: m }, () => new Array(n).fill(""));

    // Step 2: Fill values recursively
    function fill(node, r, c) {
        if (!node) return;
        res[r][c] = String(node.val);

        const offset = Math.pow(2, height - r - 1);
        if (node.left) {
            fill(node.left, r + 1, c - offset);
        }
        if (node.right) {
            fill(node.right, r + 1, c + offset);
        }
    }

    fill(root, 0, Math.floor((n - 1) / 2));
    return res;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [1, 2]
    const root1 = new TreeNode(1, new TreeNode(2), null);
    const res1 = printTree(root1);
    const expected1 = [
        ["", "1", ""],
        ["2", "", ""]
    ];
    console.assert(
        JSON.stringify(res1) === JSON.stringify(expected1),
        `Test 1 Failed: got ${JSON.stringify(res1)}`
    );

    // Test 2: [1, 2, 3, null, 4]
    const root2 = new TreeNode(
        1,
        new TreeNode(2, null, new TreeNode(4)),
        new TreeNode(3)
    );
    const res2 = printTree(root2);
    const expected2 = [
        ["", "", "", "1", "", "", ""],
        ["", "2", "", "", "", "3", ""],
        ["", "", "4", "", "", "", ""]
    ];
    console.assert(
        JSON.stringify(res2) === JSON.stringify(expected2),
        `Test 2 Failed: got ${JSON.stringify(res2)}`
    );

    // Test 3: Single node [5]
    const root3 = new TreeNode(5);
    const res3 = printTree(root3);
    console.assert(
        JSON.stringify(res3) === JSON.stringify([["5"]]),
        "Test 3 Failed: single node"
    );

    console.log("All Print Binary Tree tests passed successfully!");
}

module.exports = { printTree, TreeNode };
