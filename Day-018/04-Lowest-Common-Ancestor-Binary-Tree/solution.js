/**
 * Problem: Lowest Common Ancestor of a Binary Tree
 * Topic: Binary Tree / DFS Postorder
 * Language: JavaScript
 *
 * Approach:
 * DFS postorder traversal. Return node if node === p or node === q.
 * If both left and right subtree calls return non-null values, current node is the LCA!
 *
 * Time Complexity: O(N)
 * Space Complexity: O(H) recursion stack
 */

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root;
    return left ? left : right;
}

// Test cases
const root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);

console.log("LCA of 5 and 1 ->", lowestCommonAncestor(root, root.left, root.right).val); // 3
