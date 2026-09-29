// Problem: Count Good Nodes in Binary Tree (LeetCode 1448)
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

function goodNodes(root) {
    function dfs(node, maxSoFar) {
        if (!node) return 0;

        let count = 0;
        if (node.val >= maxSoFar) {
            count = 1;
            maxSoFar = node.val;
        }

        return count + dfs(node.left, maxSoFar) + dfs(node.right, maxSoFar);
    }

    return dfs(root, -Infinity);
}

// Test tree: [3,1,4,3,null,1,5]
const root = new TreeNode(3);
root.left = new TreeNode(1, new TreeNode(3));
root.right = new TreeNode(4, new TreeNode(1), new TreeNode(5));

console.log("Good Nodes Count:", goodNodes(root)); // 4
