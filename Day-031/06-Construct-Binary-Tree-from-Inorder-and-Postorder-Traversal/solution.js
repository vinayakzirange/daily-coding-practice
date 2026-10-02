// Problem: Construct Binary Tree from Inorder and Postorder Traversal (LeetCode 106)
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

function buildTree(inorder, postorder) {
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }

    let postIdx = postorder.length - 1;

    function helper(left, right) {
        if (left > right) return null;

        const rootVal = postorder[postIdx--];
        const root = new TreeNode(rootVal);
        const inIdx = inorderMap.get(rootVal);

        root.right = helper(inIdx + 1, right);
        root.left = helper(left, inIdx - 1);

        return root;
    }

    return helper(0, inorder.length - 1);
}

// Test case
const ino = [9,3,15,20,7];
const post = [9,15,7,20,3];
const tree = buildTree(ino, post);
console.log("Root Val:", tree.val); // 3
console.log("Left Val:", tree.left.val); // 9
console.log("Right Val:", tree.right.val); // 20
