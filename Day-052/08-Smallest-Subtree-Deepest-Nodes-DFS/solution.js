/**
 * ====================================================================
 * Problem: Smallest Subtree with all the Deepest Nodes (LeetCode 865)
 * Difficulty: Medium
 * Topic: Hash Table, Tree, Depth-First Search, Breadth-First Search, Binary Tree
 * ====================================================================
 * 
 * Given the root of a binary tree, the depth of each node is the shortest
 * distance to the root.
 * 
 * Return the smallest subtree such that it contains all the deepest nodes
 * in the original tree.
 * 
 * A node is called the deepest if it has the largest depth possible among
 * any node in the entire tree.
 * 
 * The subtree of a node is a tree consisting of that node, plus the set
 * of all descendants of that node.
 * 
 * Note: This question is the same as LeetCode 1123: Lowest Common Ancestor
 * of Deepest Leaves.
 * 
 * Example 1:
 * Input: root = [3,5,1,6,2,0,8,null,null,7,4]
 * Output: [2,7,4]
 * Explanation: We return the node with value 2, colored in yellow in the diagram.
 * The nodes coloured in blue are the deepest nodes of the tree.
 * Notice that nodes 5, 3 and 2 contain the deepest nodes in the tree but node 2
 * is the smallest subtree among them, so we return it.
 * 
 * Example 2:
 * Input: root = [1]
 * Output: [1]
 * Explanation: The root is the deepest node in the tree.
 * 
 * Example 3:
 * Input: root = [0,1,3,null,2]
 * Output: [2]
 * Explanation: The deepest node is 2, so we return it.
 * 
 * Constraints:
 * - The number of nodes in the tree will be in the range [1, 500].
 * - 0 <= Node.val <= 500
 * - The values of the nodes in the tree are unique.
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
 * Returns smallest subtree containing all deepest nodes using post-order DFS.
 * Helper returns { node: TreeNode, depth: number }.
 * - If leftDepth === rightDepth: both sides contain deepest nodes, current node is LCA.
 * - If leftDepth > rightDepth: deepest nodes reside exclusively in left subtree.
 * - If rightDepth > leftDepth: deepest nodes reside exclusively in right subtree.
 * 
 * Time Complexity: O(n) single pass visiting each node once
 * Space Complexity: O(h) recursion stack
 * 
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function subtreeWithAllDeepest(root) {
    function dfs(node) {
        if (!node) {
            return { node: null, depth: 0 };
        }

        const left = dfs(node.left);
        const right = dfs(node.right);

        if (left.depth === right.depth) {
            return { node: node, depth: left.depth + 1 };
        } else if (left.depth > right.depth) {
            return { node: left.node, depth: left.depth + 1 };
        } else {
            return { node: right.node, depth: right.depth + 1 };
        }
    }

    return dfs(root).node;
}

// --- Test Suite ---
if (require.main === module) {
    // Test 1: root = [3,5,1,6,2,0,8,null,null,7,4] -> node with val 2
    const n7 = new TreeNode(7);
    const n4 = new TreeNode(4);
    const n2 = new TreeNode(2, n7, n4);
    const n6 = new TreeNode(6);
    const n5 = new TreeNode(5, n6, n2);
    const n0 = new TreeNode(0);
    const n8 = new TreeNode(8);
    const n1 = new TreeNode(1, n0, n8);
    const root1 = new TreeNode(3, n5, n1);

    const res1 = subtreeWithAllDeepest(root1);
    console.assert(res1.val === 2, `Test 1 failed: expected 2, got ${res1.val}`);
    console.log(`Test 1 Passed: root1 -> node val=${res1.val}`);

    // Test 2: Single node root = [1]
    const root2 = new TreeNode(1);
    const res2 = subtreeWithAllDeepest(root2);
    console.assert(res2.val === 1, `Test 2 failed: expected 1, got ${res2.val}`);
    console.log(`Test 2 Passed: [1] -> node val=${res2.val}`);

    // Test 3: root = [0,1,3,null,2] -> node with val 2
    const root3 = new TreeNode(0, new TreeNode(1, null, new TreeNode(2)), new TreeNode(3));
    const res3 = subtreeWithAllDeepest(root3);
    console.assert(res3.val === 2, `Test 3 failed: expected 2, got ${res3.val}`);
    console.log(`Test 3 Passed: [0, 1, 3, null, 2] -> node val=${res3.val}`);

    console.log("\nAll Smallest Subtree with all Deepest Nodes tests passed successfully!");
}

module.exports = { subtreeWithAllDeepest, TreeNode };
