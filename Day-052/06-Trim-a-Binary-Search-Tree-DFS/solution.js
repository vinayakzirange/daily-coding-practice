/**
 * ====================================================================
 * Problem: Trim a Binary Search Tree (LeetCode 669)
 * Difficulty: Medium
 * Topic: Tree, Depth-First Search, Binary Search Tree, Binary Tree
 * ====================================================================
 * 
 * Given the root of a binary search tree and the lowest and highest
 * boundaries as low and high, trim the tree so that all its elements lie
 * in [low, high]. Trimming the tree should not change the relative
 * structure of the elements that will remain in the tree (i.e., any
 * node's descendant should remain a descendant). It can be proven that
 * there is a unique answer.
 * 
 * Return the root of the trimmed binary search tree.
 * 
 * Example 1:
 * Input: root = [1,0,2], low = 1, high = 2
 * Output: [1,null,2]
 * 
 * Example 2:
 * Input: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
 * Output: [3,2,null,1]
 * 
 * Constraints:
 * - The number of nodes in the tree in the range [1, 10^4].
 * - 0 <= Node.val <= 10^4
 * - The value of each node in the tree is unique.
 * - root is guaranteed to be a valid binary search tree.
 * - 0 <= low <= high <= 10^4
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
 * Trims BST recursively exploiting BST ordering property:
 * - If root.val < low: all nodes in left subtree are also < low, return trim(root.right)
 * - If root.val > high: all nodes in right subtree are also > high, return trim(root.left)
 * - Otherwise: root remains, recursively trim left and right subtrees.
 * 
 * Time Complexity: O(n) visiting each node at most once
 * Space Complexity: O(h) recursion call stack
 * 
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
function trimBST(root, low, high) {
    if (!root) {
        return null;
    }

    if (root.val < low) {
        return trimBST(root.right, low, high);
    }
    if (root.val > high) {
        return trimBST(root.left, low, high);
    }

    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
}

// --- Test Suite ---
function treeToInorder(node) {
    const res = [];
    function inorder(curr) {
        if (!curr) return;
        inorder(curr.left);
        res.push(curr.val);
        inorder(curr.right);
    }
    inorder(node);
    return res;
}

if (require.main === module) {
    // Test 1: root = [1, 0, 2], low = 1, high = 2 -> [1, null, 2]
    const root1 = new TreeNode(1, new TreeNode(0), new TreeNode(2));
    const trimmed1 = trimBST(root1, 1, 2);
    const in1 = treeToInorder(trimmed1);
    console.assert(JSON.stringify(in1) === JSON.stringify([1, 2]), `Test 1 failed: ${in1}`);
    console.log(`Test 1 Passed: [1, 0, 2], low=1, high=2 -> [${in1}]`);

    // Test 2: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
    const n1 = new TreeNode(1);
    const n2 = new TreeNode(2, n1, null);
    const n0 = new TreeNode(0, null, n2);
    const n4 = new TreeNode(4);
    const root2 = new TreeNode(3, n0, n4);

    const trimmed2 = trimBST(root2, 1, 3);
    const in2 = treeToInorder(trimmed2);
    console.assert(JSON.stringify(in2) === JSON.stringify([1, 2, 3]), `Test 2 failed: ${in2}`);
    console.log(`Test 2 Passed: low=1, high=3 -> [${in2}]`);

    // Test 3: Entire tree trimmed out
    const root3 = new TreeNode(10, new TreeNode(5), new TreeNode(15));
    const trimmed3 = trimBST(root3, 20, 30);
    console.assert(trimmed3 === null, "Test 3 failed");
    console.log("Test 3 Passed: entire tree outside bounds -> null");

    console.log("\nAll Trim a Binary Search Tree tests passed successfully!");
}

module.exports = { trimBST, TreeNode };
