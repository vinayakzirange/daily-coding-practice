/**
 * Problem: Maximum Width of Binary Tree (LeetCode 662)
 * Difficulty: Medium
 * Topic: Binary Tree / Breadth-First Search / Queue / Index Normalization
 * 
 * Description:
 * Given the root of a binary tree, return the maximum width of the given tree.
 * 
 * The maximum width of a tree is the maximum width among all levels.
 * 
 * The width of one level is defined as the length between the end-nodes (the leftmost
 * and rightmost non-null nodes), where the null nodes between the end-nodes that would
 * be present in a complete binary tree extending down to that level are also counted into the length calculation.
 * 
 * It is guaranteed that the answer will in the range of a 32-bit signed integer.
 * 
 * Example 1:
 * Input: root = [1,3,2,5,3,null,9]
 * Output: 4
 * Explanation: The maximum width exists in the third level with length 4 (5,3,null,9).
 * 
 * Example 2:
 * Input: root = [1,3,2,5,null,null,9,6,null,7]
 * Output: 7
 * Explanation: The maximum width exists in the fourth level with length 7 (6,null,null,null,null,null,7).
 * 
 * Example 3:
 * Input: root = [1,3,2,5]
 * Output: 2
 * 
 * Constraints:
 *   * The number of nodes in the tree is in the range [1, 3000].
 *   * -100 <= Node.val <= 100
 * 
 * Complexity:
 *   * Time Complexity: O(n) - BFS visits each node once.
 *   * Space Complexity: O(w) - Queue holds at most width w nodes (up to O(n)).
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
function widthOfBinaryTree(root) {
    if (!root) return 0;

    let maxWidth = 0n;
    // Queue stores pairs: [node, BigInt(index)]
    let queue = [[root, 0n]];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const levelStart = queue[0][1];
        let first = 0n;
        let last = 0n;

        const nextQueue = [];

        for (let i = 0; i < levelSize; i++) {
            const [node, idx] = queue[i];
            // Normalize index to avoid overflow in deep trees
            const normalizedIdx = idx - levelStart;

            if (i === 0) first = normalizedIdx;
            if (i === levelSize - 1) last = normalizedIdx;

            if (node.left) {
                nextQueue.push([node.left, 2n * normalizedIdx]);
            }
            if (node.right) {
                nextQueue.push([node.right, 2n * normalizedIdx + 1n]);
            }
        }

        const currentWidth = last - first + 1n;
        if (currentWidth > maxWidth) {
            maxWidth = currentWidth;
        }

        queue = nextQueue;
    }

    return Number(maxWidth);
}

// ==========================================
// Test Cases & Verification
// ==========================================
function runTests() {
    // Tree 1: [1, 3, 2, 5, 3, null, 9]
    const tree1 = new TreeNode(1,
        new TreeNode(3, new TreeNode(5), new TreeNode(3)),
        new TreeNode(2, null, new TreeNode(9))
    );
    const res1 = widthOfBinaryTree(tree1);
    console.assert(res1 === 4, `Test 1 Failed: got ${res1}`);
    console.log(`Test 1 Passed: Tree 1 max width = ${res1}`);

    // Tree 2: [1, 3, 2, 5]
    const tree2 = new TreeNode(1, new TreeNode(3, new TreeNode(5)), new TreeNode(2));
    const res2 = widthOfBinaryTree(tree2);
    console.assert(res2 === 2, `Test 2 Failed: got ${res2}`);
    console.log(`Test 2 Passed: Tree 2 max width = ${res2}`);

    // Tree 3: Single node
    const tree3 = new TreeNode(1);
    const res3 = widthOfBinaryTree(tree3);
    console.assert(res3 === 1, `Test 3 Failed: got ${res3}`);
    console.log(`Test 3 Passed: Single node max width = ${res3}`);

    console.log('\nAll Maximum Width of Binary Tree tests passed successfully!');
}

runTests();
