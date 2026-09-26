// Problem: Kth Smallest Element in a BST (LeetCode 230)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(H + K) where H is tree height
// Space Complexity: O(H) call stack

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function kthSmallest(root, k) {
    let count = 0;
    let result = null;

    function inorder(node) {
        if (!node || result !== null) return;
        
        inorder(node.left);
        
        count++;
        if (count === k) {
            result = node.val;
            return;
        }
        
        inorder(node.right);
    }

    inorder(root);
    return result;
}

// Helper test tree: [3,1,4,null,2]
const root = new TreeNode(3);
root.left = new TreeNode(1, null, new TreeNode(2));
root.right = new TreeNode(4);

console.log("1st Smallest:", kthSmallest(root, 1)); // 1
console.log("2nd Smallest:", kthSmallest(root, 2)); // 2
