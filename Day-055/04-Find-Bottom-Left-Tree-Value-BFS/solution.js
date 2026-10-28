/**
 * ====================================================================
 * Problem: Find Bottom Left Tree Value (LeetCode 513)
 * Difficulty: Medium
 * Topic: Tree, Depth-First Search, Breadth-First Search, Binary Tree
 * ====================================================================
 * 
 * Given the root of a binary tree, return the leftmost value in the
 * last row of the tree.
 * 
 * Example 1:
 *      2
 *     / \
 *    1   3
 * Output: 1
 * 
 * Example 2:
 *         1
 *        / \
 *       2   3
 *      /   / \
 *     4   5   6
 *        /
 *       7
 * Output: 7
 * 
 * Constraints:
 * - The number of nodes in the tree is in the range [1, 10^4].
 * - -2^31 <= Node.val <= 2^31 - 1
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
 * BFS from Right to Left.
 * By pushing the right child into the queue before the left child,
 * the final node dequeued is guaranteed to be the bottom-leftmost node.
 * 
 * Complexity:
 * - Time: O(N) where N is number of nodes
 * - Space: O(W) where W is max tree width
 * 
 * @param {TreeNode} root
 * @return {number}
 */
function findBottomLeftValue(root) {
    const queue = [root];
    let curr = null;

    while (queue.length > 0) {
        curr = queue.shift();

        // Push right first, then left
        if (curr.right) queue.push(curr.right);
        if (curr.left) queue.push(curr.left);
    }

    return curr.val;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [2, 1, 3] -> 1
    const t1 = new TreeNode(2, new TreeNode(1), new TreeNode(3));
    console.assert(findBottomLeftValue(t1) === 1, "Test 1 Failed: expected 1");

    // Test 2: [1, 2, 3, 4, null, 5, 6, null, null, 7] -> 7
    const t2 = new TreeNode(
        1,
        new TreeNode(2, new TreeNode(4)),
        new TreeNode(3, new TreeNode(5, new TreeNode(7)), new TreeNode(6))
    );
    console.assert(findBottomLeftValue(t2) === 7, "Test 2 Failed: expected 7");

    // Test 3: Single node [42] -> 42
    console.assert(findBottomLeftValue(new TreeNode(42)) === 42, "Test 3 Failed: expected 42");

    // Test 4: Left skewed tree
    const t4 = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))));
    console.assert(findBottomLeftValue(t4) === 4, "Test 4 Failed: expected 4");

    console.log("All Find Bottom Left Tree Value tests passed successfully!");
}

module.exports = { findBottomLeftValue, TreeNode };
