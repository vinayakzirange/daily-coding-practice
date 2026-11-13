/**
 * Problem: Deepest Leaves Sum (LeetCode 1302)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given the root of a binary tree, return the sum of values of its deepest leaves.
 * 
 * Example 1:
 *  Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
 *  Output: 15 (7 + 8)
 * 
 * Example 2:
 *  Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
 *  Output: 19 (9 + 1 + 4 + 5)
 * 
 * Constraints:
 *  The number of nodes in the tree is in the range [1, 10^4].
 *  1 <= Node.val <= 100
 */

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Calculates sum of deepest leaves using Level-Order Breadth-First Search.
 * 
 * @param {TreeNode} root
 * @return {number}
 * 
 * Complexity:
 *  Time: O(N) - Visits each node in the tree once.
 *  Space: O(W) - Queue stores at most W nodes at any time (where W <= N is max level width).
 */
function deepestLeavesSum(root) {
    if (!root) return 0;

    let queue = [root];
    let deepestSum = 0;

    while (queue.length > 0) {
        const levelSize = queue.length;
        deepestSum = 0;

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            deepestSum += node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    return deepestSum;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    //              1
    //            /   \
    //           2     3
    //          / \     \
    //         4   5     6
    //        /           \
    //       7             8
    const root1 = new TreeNode(1,
        new TreeNode(2,
            new TreeNode(4, new TreeNode(7)),
            new TreeNode(5)
        ),
        new TreeNode(3,
            null,
            new TreeNode(6, null, new TreeNode(8))
        )
    );
    assert.strictEqual(deepestLeavesSum(root1), 15, "Test 1 Failed");

    // Test 2: Single node
    const root2 = new TreeNode(42);
    assert.strictEqual(deepestLeavesSum(root2), 42, "Test 2 Failed");

    // Test 3: Complete binary tree of height 2
    //        1
    //       / \
    //      2   3
    const root3 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    assert.strictEqual(deepestLeavesSum(root3), 5, "Test 3 Failed");

    // Test 4: Linear left-skewed tree
    const root4 = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))));
    assert.strictEqual(deepestLeavesSum(root4), 4, "Test 4 Failed");

    console.log("All Deepest Leaves Sum tests passed successfully!");
}

runTests();
