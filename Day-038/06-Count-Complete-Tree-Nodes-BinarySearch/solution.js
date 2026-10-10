/**
 * Problem: Count Complete Tree Nodes (LeetCode 222)
 * Difficulty: Medium / Easy
 * Topic: Binary Tree / Binary Search / Complete Tree Properties
 * 
 * Description:
 * Given the root of a complete binary tree, return the number of the nodes in the tree.
 * 
 * According to Wikipedia, every level, except possibly the last, is completely filled in a
 * complete binary tree, and all nodes in the last level are as far left as possible.
 * It can have between 1 and 2^h nodes inclusive at the last level h.
 * 
 * Design an algorithm that runs in less than O(n) time complexity.
 * 
 * Example 1:
 * Input: root = [1,2,3,4,5,6]
 * Output: 6
 * 
 * Example 2:
 * Input: root = []
 * Output: 0
 * 
 * Example 3:
 * Input: root = [1]
 * Output: 1
 * 
 * Constraints:
 *   * The number of nodes in the tree is in the range [0, 5 * 10^4].
 *   * 0 <= Node.val <= 5 * 10^4
 *   * The tree is guaranteed to be complete.
 * 
 * Complexity:
 *   * Time Complexity: O(log^2 n) - At each step we compute depth in O(log n) and recurse into one subtree.
 *   * Space Complexity: O(log n) - Stack depth is bounded by tree height.
 */

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function countNodes(root) {
    if (!root) return 0;

    function getDepth(node) {
        let depth = 0;
        while (node) {
            depth++;
            node = node.left;
        }
        return depth;
    }

    const leftDepth = getDepth(root.left);
    const rightDepth = getDepth(root.right);

    if (leftDepth === rightDepth) {
        // Left subtree is a full complete tree of height leftDepth.
        // Number of nodes in left subtree + root = 2^leftDepth.
        // Continue counting on the right subtree.
        return (1 << leftDepth) + countNodes(root.right);
    } else {
        // Right subtree is a full complete tree of height rightDepth.
        // Number of nodes in right subtree + root = 2^rightDepth.
        // Continue counting on the left subtree.
        return (1 << rightDepth) + countNodes(root.left);
    }
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    // Tree 1: [1, 2, 3, 4, 5, 6]
    //         1
    //       /   \
    //      2     3
    //     / \   /
    //    4   5 6
    const tree1 = new TreeNode(1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, new TreeNode(6), null)
    );
    const res1 = countNodes(tree1);
    console.assert(res1 === 6, `Test 1 Failed: got ${res1}`);
    console.log(`Test 1 Passed: [1,2,3,4,5,6] -> total nodes = ${res1}`);

    // Tree 2: Empty tree
    const res2 = countNodes(null);
    console.assert(res2 === 0, `Test 2 Failed: got ${res2}`);
    console.log(`Test 2 Passed: null -> total nodes = ${res2}`);

    // Tree 3: Single node
    const res3 = countNodes(new TreeNode(1));
    console.assert(res3 === 1, `Test 3 Failed: got ${res3}`);
    console.log(`Test 3 Passed: [1] -> total nodes = ${res3}`);

    // Tree 4: Full tree of height 3 (7 nodes)
    const tree4 = new TreeNode(1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, new TreeNode(6), new TreeNode(7))
    );
    const res4 = countNodes(tree4);
    console.assert(res4 === 7, `Test 4 Failed: got ${res4}`);
    console.log(`Test 4 Passed: Full 7-node complete tree -> total nodes = ${res4}`);

    console.log('\nAll Count Complete Tree Nodes tests passed successfully!');
}

runTests();
