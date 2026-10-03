// Problem: House Robber III (LeetCode 337)
// Language: JavaScript
// Difficulty: Medium
// Time Complexity: O(N) where N is number of nodes
// Space Complexity: O(H) recursion stack height

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function rob(root) {
    // Helper function returns [robThisNode, notRobThisNode]
    function helper(node) {
        if (!node) return [0, 0];

        const [leftRob, leftNotRob] = helper(node.left);
        const [rightRob, rightNotRob] = helper(node.right);

        // If we rob current node, we cannot rob left and right children
        const robCurr = node.val + leftNotRob + rightNotRob;

        // If we don't rob current node, we can choose to rob or skip children
        const notRobCurr = Math.max(leftRob, leftNotRob) + Math.max(rightRob, rightNotRob);

        return [robCurr, notRobCurr];
    }

    const [robRoot, notRobRoot] = helper(root);
    return Math.max(robRoot, notRobRoot);
}

// Test cases
// Tree 1: [3, 2, 3, null, 3, null, 1]
//        3
//       / \
//      2   3
//       \   \
//        3   1
const root1 = new TreeNode(3,
    new TreeNode(2, null, new TreeNode(3)),
    new TreeNode(3, null, new TreeNode(1))
);
console.log("Max amount robbed (Tree 1):", rob(root1)); // Expected: 7 (3 + 3 + 1)

// Tree 2: [3, 4, 5, 1, 3, null, 1]
//        3
//       / \
//      4   5
//     / \   \
//    1   3   1
const root2 = new TreeNode(3,
    new TreeNode(4, new TreeNode(1), new TreeNode(3)),
    new TreeNode(5, null, new TreeNode(1))
);
console.log("Max amount robbed (Tree 2):", rob(root2)); // Expected: 9 (4 + 5)
