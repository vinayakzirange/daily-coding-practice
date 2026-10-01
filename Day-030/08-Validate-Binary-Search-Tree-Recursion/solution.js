// Problem: Validate Binary Search Tree (LeetCode 98)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(H)

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;

        if ((min !== null && node.val <= min) || (max !== null && node.val >= max)) {
            return false;
        }

        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }

    return validate(root, null, null);
}

// Test cases
const validTree = new TreeNode(2, new TreeNode(1), new TreeNode(3));
console.log("Is Valid BST:", isValidBST(validTree)); // true

const invalidTree = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)));
console.log("Is Valid BST:", isValidBST(invalidTree)); // false
