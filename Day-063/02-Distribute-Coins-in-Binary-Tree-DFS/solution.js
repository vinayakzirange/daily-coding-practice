/**
 * LeetCode 979: Distribute Coins in Binary Tree (Medium)
 * https://leetcode.com/problems/distribute-coins-in-binary-tree/
 *
 * You are given the root of a binary tree with n nodes where each node in the tree has node.val coins.
 * There are n coins in total throughout the whole tree.
 *
 * In one move, we may choose two adjacent nodes and move one coin from one node to another.
 * A move may be from parent to child, or from child to parent.
 *
 * Return the minimum number of moves required to make every node have exactly one coin.
 *
 * Example 1:
 * Input: root = [3,0,0]
 * Output: 2
 * Explanation: From the root of the tree, we move one coin to its left child, and one coin to its right child.
 *
 * Example 2:
 * Input: root = [0,3,0]
 * Output: 3
 * Explanation: From the left child of the root, we move two coins to the root [taking two moves].
 * Then, we move one coin from the root of the tree to the right child.
 *
 * Constraints:
 * - The number of nodes in the tree is n.
 * - 2 <= n <= 100
 * - 0 <= Node.val <= n
 * - The sum of all Node.val is n.
 */

// Definition for a binary tree node.
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function distributeCoins(root) {
    let totalMoves = 0;

    // Post-order DFS: returns the net coin balance of the subtree rooted at node.
    // balance > 0 means the subtree has excess coins to push up to parent.
    // balance < 0 means the subtree needs coins from parent.
    function dfs(node) {
        if (!node) return 0;

        const leftBalance = dfs(node.left);
        const rightBalance = dfs(node.right);

        // Every excess or deficit coin must traverse the edge connecting this child to this node.
        totalMoves += Math.abs(leftBalance) + Math.abs(rightBalance);

        // Current node's net balance after accounting for its own coin requirement (1 coin)
        return node.val + leftBalance + rightBalance - 1;
    }

    dfs(root);
    return totalMoves;
}

// Unit tests
function runTests() {
    // Test 1: root = [3, 0, 0] -> 2
    //       3
    //      / \
    //     0   0
    const tree1 = new TreeNode(3, new TreeNode(0), new TreeNode(0));
    console.assert(distributeCoins(tree1) === 2, "Test 1 Failed");

    // Test 2: root = [0, 3, 0] -> 3
    //       0
    //      / \
    //     3   0
    const tree2 = new TreeNode(0, new TreeNode(3), new TreeNode(0));
    console.assert(distributeCoins(tree2) === 3, "Test 2 Failed");

    // Test 3: root = [1, 0, 2] -> 2
    //       1
    //      / \
    //     0   2
    const tree3 = new TreeNode(1, new TreeNode(0), new TreeNode(2));
    console.assert(distributeCoins(tree3) === 2, "Test 3 Failed");

    // Test 4: Line tree [1, 0, 0, 3] -> 3 moves
    //       1
    //      /
    //     0
    //    /
    //   0
    //  /
    // 3
    const tree4 = new TreeNode(1, new TreeNode(0, new TreeNode(0, new TreeNode(3))));
    console.assert(distributeCoins(tree4) === 3, "Test 4 Failed");

    console.log("All Distribute Coins in Binary Tree tests passed successfully!");
}

runTests();
