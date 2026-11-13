/**
 * Problem: Sum of Nodes with Even-Valued Grandparent (LeetCode 1315)
 * Difficulty: Medium
 * Language: JavaScript
 * 
 * Given the root of a binary tree, return the sum of values of nodes with an even-valued grandparent.
 * If there are no nodes with an even-valued grandparent, return 0.
 * A grandparent of a node is the parent of its parent if it exists.
 * 
 * Example 1:
 *  Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
 *  Output: 18
 *  Explanation: The red nodes are the nodes with even-value grandparent while the blue nodes
 *               are the even-value grandparents (nodes with values 2, 7, 1, 3, 5).
 * 
 * Example 2:
 *  Input: root = [1]
 *  Output: 0
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
 * Calculates sum of nodes with even-valued grandparents using Depth-First Search (DFS).
 * 
 * @param {TreeNode} root
 * @return {number}
 * 
 * Complexity:
 *  Time: O(N) - Visits each node in the tree once.
 *  Space: O(H) - Recursion stack bounded by tree height H.
 */
function sumEvenGrandparent(root) {
    let totalSum = 0;

    function dfs(node, parentVal, grandParentVal) {
        if (!node) return;

        if (grandParentVal !== null && grandParentVal % 2 === 0) {
            totalSum += node.val;
        }

        dfs(node.left, node.val, parentVal);
        dfs(node.right, node.val, parentVal);
    }

    dfs(root, null, null);
    return totalSum;
}

// ==========================================
// Test Cases
// ==========================================
function runTests() {
    const assert = require('assert');

    // Test 1: Example 1
    //              6
    //            /   \
    //           7     8
    //          / \   / \
    //         2   7 1   3
    //        /   / \     \
    //       9   1   4     5
    // Grandparent is 6 (even): its grandchildren are 2, 7, 1, 3 -> sum = 2+7+1+3 = 13
    // Grandparent 2 (even): grandchild is 9 -> sum += 9 = 22 (wait, 2's parent is 7 (odd), grandparent 6 (even))
    // Nodes whose grandparent is even:
    // - Node 9's grandparent is 7 (odd) -> not added
    // - Nodes 2, 7 (under 7): grandparent is 6 (even) -> +2, +7
    // - Nodes 1, 3 (under 8): grandparent is 6 (even) -> +1, +3
    // - Node 5's grandparent is 8 (even) -> +5
    // Total = 2 + 7 + 1 + 3 + 5 = 18!
    const root1 = new TreeNode(6,
        new TreeNode(7,
            new TreeNode(2, new TreeNode(9)),
            new TreeNode(7, new TreeNode(1), new TreeNode(4))
        ),
        new TreeNode(8,
            new TreeNode(1),
            new TreeNode(3, null, new TreeNode(5))
        )
    );
    assert.strictEqual(sumEvenGrandparent(root1), 18, "Test 1 Failed");

    // Test 2: Single node
    const root2 = new TreeNode(1);
    assert.strictEqual(sumEvenGrandparent(root2), 0, "Test 2 Failed");

    // Test 3: Depth 2 tree (no grandparents exist)
    const root3 = new TreeNode(2, new TreeNode(4), new TreeNode(6));
    assert.strictEqual(sumEvenGrandparent(root3), 0, "Test 3 Failed");

    // Test 4: All odd tree
    const root4 = new TreeNode(1, new TreeNode(3, new TreeNode(5)), new TreeNode(7));
    assert.strictEqual(sumEvenGrandparent(root4), 0, "Test 4 Failed");

    // Test 5: Linear chain 2 -> 4 -> 6 -> 8
    // Node 6 has grandparent 2 (even) -> +6
    // Node 8 has grandparent 4 (even) -> +8
    // Total = 14
    const root5 = new TreeNode(2, new TreeNode(4, new TreeNode(6, new TreeNode(8))));
    assert.strictEqual(sumEvenGrandparent(root5), 14, "Test 5 Failed");

    console.log("All Sum of Nodes with Even-Valued Grandparent tests passed successfully!");
}

runTests();
