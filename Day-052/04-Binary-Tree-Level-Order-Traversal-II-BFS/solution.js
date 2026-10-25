/**
 * ====================================================================
 * Problem: Binary Tree Level Order Traversal II (LeetCode 107)
 * Difficulty: Medium
 * Topic: Tree, Breadth-First Search, Binary Tree
 * ====================================================================
 * 
 * Given the root of a binary tree, return the bottom-up level order
 * traversal of its nodes' values. (i.e., from left to right, level by
 * level from leaf to root).
 * 
 * Example 1:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[15,7],[9,20],[3]]
 * 
 * Example 2:
 * Input: root = [1]
 * Output: [[1]]
 * 
 * Example 3:
 * Input: root = []
 * Output: []
 * 
 * Constraints:
 * - The number of nodes in the tree is in the range [0, 2000].
 * - -1000 <= Node.val <= 1000
 * ====================================================================
 */

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * Bottom-up level order traversal of binary tree using Breadth-First Search (BFS).
 * Standard BFS collects levels top-to-bottom, then reverses the levels list.
 * 
 * Time Complexity: O(n) visiting each node once
 * Space Complexity: O(n) for BFS queue and level arrays
 * 
 * @param {TreeNode|null} root
 * @return {number[][]}
 */
function levelOrderBottom(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    // Reverse to achieve bottom-up order
    result.reverse();
    return result;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: [3, 9, 20, null, null, 15, 7] -> [[15, 7], [9, 20], [3]]
    const root1 = new TreeNode(3);
    root1.left = new TreeNode(9);
    root1.right = new TreeNode(20, new TreeNode(15), new TreeNode(7));

    const res1 = levelOrderBottom(root1);
    const exp1 = [[15, 7], [9, 20], [3]];
    console.assert(JSON.stringify(res1) === JSON.stringify(exp1), `Test 1 failed: ${JSON.stringify(res1)}`);
    console.log(`Test 1 Passed: root1 -> ${JSON.stringify(res1)}`);

    // Test 2: [1] -> [[1]]
    const res2 = levelOrderBottom(new TreeNode(1));
    console.assert(JSON.stringify(res2) === JSON.stringify([[1]]), "Test 2 failed");
    console.log("Test 2 Passed: [1] -> [[1]]");

    // Test 3: null -> []
    const res3 = levelOrderBottom(null);
    console.assert(JSON.stringify(res3) === JSON.stringify([]), "Test 3 failed");
    console.log("Test 3 Passed: null -> []");

    // Test 4: Left skewed tree: 1 -> 2 -> 3 -> [[3], [2], [1]]
    const root4 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
    const res4 = levelOrderBottom(root4);
    console.assert(JSON.stringify(res4) === JSON.stringify([[3], [2], [1]]), "Test 4 failed");
    console.log(`Test 4 Passed: skewed tree -> ${JSON.stringify(res4)}`);

    console.log("\nAll Binary Tree Level Order Traversal II tests passed successfully!");
}

module.exports = { levelOrderBottom, TreeNode };
