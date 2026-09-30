// Problem: Construct Binary Search Tree from Preorder Traversal (LeetCode 1008)
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

function bstFromPreorder(preorder) {
    let i = 0;

    function build(bound) {
        if (i === preorder.length || preorder[i] > bound) return null;

        const root = new TreeNode(preorder[i++]);
        root.left = build(root.val);
        root.right = build(bound);

        return root;
    }

    return build(Infinity);
}

// Test case
const root = bstFromPreorder([8,5,1,7,10,12]);
console.log("Root:", root.val); // 8
console.log("Left:", root.left.val); // 5
console.log("Right:", root.right.val); // 10
