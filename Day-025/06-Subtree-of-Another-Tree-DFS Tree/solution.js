// Problem: Subtree of Another Tree (LeetCode 572)
// Language: JavaScript
// Difficulty: Easy / Medium
// Time Complexity: O(M * N)
// Space Complexity: O(H)

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isSubtree(root, subRoot) {
    if (!root) return false;
    if (isSameTree(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// Test tree
const root = new TreeNode(3, new TreeNode(4, new TreeNode(1), new TreeNode(2)), new TreeNode(5));
const subRoot = new TreeNode(4, new TreeNode(1), new TreeNode(2));

console.log("Is Subtree:", isSubtree(root, subRoot)); // true
