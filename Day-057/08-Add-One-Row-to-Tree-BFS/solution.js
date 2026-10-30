/**
 * ====================================================================
 * Problem: Add One Row to Tree (LeetCode 623)
 * Difficulty: Medium
 * Topic: Tree, Depth-First Search, Breadth-First Search, Binary Tree
 * ====================================================================
 * 
 * Given the root of a binary tree and two integers val and depth, add a
 * row of nodes with value val at the given depth depth.
 * 
 * Note that the root node is at depth 1.
 * 
 * The adding rule is:
 * - Given the integer depth, for each not null tree node cur at depth depth - 1,
 *   create two tree nodes with value val as cur's left subtree root and right
 *   subtree root.
 * - cur's original left subtree should be the left subtree of the new left
 *   subtree root.
 * - cur's original right subtree should be the right subtree of the new right
 *   subtree root.
 * - If depth == 1 that means there is no depth depth - 1 at all, then create a
 *   tree node with value val as the new root of the whole original tree, and the
 *   original tree is the new root's left subtree.
 * 
 * Example 1:
 * Input: root = [4,2,6,3,1,5], val = 1, depth = 2
 * Output: [4,1,1,2,null,null,6,3,1,5]
 * 
 * Example 2:
 * Input: root = [4,2,null,3,1], val = 1, depth = 3
 * Output: [4,2,null,1,1,3,null,null,1]
 * 
 * Constraints:
 * - The number of nodes in the tree is in the range [1, 10^4].
 * - The depth of the tree is in the range [1, 10^4].
 * - -100 <= Node.val <= 100
 * - -10^5 <= val <= 10^5
 * - 1 <= depth <= the depth of tree + 1
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
 * Adds a new row of nodes at given depth via BFS.
 * 
 * Complexity:
 * - Time: O(N) visiting nodes up to depth - 1
 * - Space: O(W) queue space bounded by maximum width of tree
 * 
 * @param {TreeNode} root
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
function addOneRow(root, val, depth) {
    // Special case: inserting at root level (depth = 1)
    if (depth === 1) {
        return new TreeNode(val, root, null);
    }

    const queue = [root];
    let currentDepth = 1;

    // Traverse levels until depth - 1
    while (queue.length > 0) {
        const levelSize = queue.length;

        if (currentDepth === depth - 1) {
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                const oldLeft = node.left;
                const oldRight = node.right;

                node.left = new TreeNode(val, oldLeft, null);
                node.right = new TreeNode(val, null, oldRight);
            }
            break;
        }

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        currentDepth++;
    }

    return root;
}

// --- Test Suite ---
if (require.main === module) {
    function levelOrder(node) {
        if (!node) return [];
        const res = [];
        const q = [node];
        while (q.length) {
            const curr = q.shift();
            if (curr) {
                res.push(curr.val);
                q.push(curr.left);
                q.push(curr.right);
            } else {
                res.push(null);
            }
        }
        // Trim trailing nulls
        while (res[res.length - 1] === null) res.pop();
        return res;
    }

    // Test 1: [4,2,6,3,1,5], val = 1, depth = 2
    const root1 = new TreeNode(
        4,
        new TreeNode(2, new TreeNode(3), new TreeNode(1)),
        new TreeNode(6, new TreeNode(5), null)
    );
    const res1 = addOneRow(root1, 1, 2);
    console.assert(res1.left.val === 1, "Test 1 Failed: left child should be 1");
    console.assert(res1.right.val === 1, "Test 1 Failed: right child should be 1");
    console.assert(res1.left.left.val === 2, "Test 1 Failed: left.left should be 2");
    console.assert(res1.right.right.val === 6, "Test 1 Failed: right.right should be 6");

    // Test 2: depth = 1 insertion
    const root2 = new TreeNode(10);
    const res2 = addOneRow(root2, 5, 1);
    console.assert(res2.val === 5 && res2.left.val === 10 && res2.right === null, "Test 2 Failed");

    // Test 3: [4,2,null,3,1], val = 1, depth = 3
    const root3 = new TreeNode(
        4,
        new TreeNode(2, new TreeNode(3), new TreeNode(1)),
        null
    );
    const res3 = addOneRow(root3, 1, 3);
    console.assert(res3.left.left.val === 1, "Test 3 Failed: left.left should be 1");
    console.assert(res3.left.right.val === 1, "Test 3 Failed: left.right should be 1");

    console.log("All Add One Row to Tree tests passed successfully!");
}

module.exports = { addOneRow, TreeNode };
