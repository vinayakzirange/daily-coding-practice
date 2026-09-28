// Problem: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N)
// Space Complexity: O(N)

class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function buildTree(preorder, inorder) {
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }

    let preIdx = 0;

    function helper(left, right) {
        if (left > right) return null;

        const rootVal = preorder[preIdx++];
        const root = new TreeNode(rootVal);
        const inIdx = inorderMap.get(rootVal);

        root.left = helper(left, inIdx - 1);
        root.right = helper(inIdx + 1, right);

        return root;
    }

    return helper(0, inorder.length - 1);
}

// Test case
const pre = [3, 9, 20, 15, 7];
const ino = [9, 3, 15, 20, 7];
const tree = buildTree(pre, ino);
console.log("Root Val:", tree.val); // 3
console.log("Left Val:", tree.left.val); // 9
console.log("Right Val:", tree.right.val); // 20
