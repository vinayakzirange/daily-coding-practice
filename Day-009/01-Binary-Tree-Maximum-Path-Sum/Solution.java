/*
 * Problem Name: Binary Tree Maximum Path Sum
 * Problem Statement: A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them.
 * A node can only appear in the sequence at most once. The path does not need to pass through the root. Return the maximum path sum of any non-empty path.
 * 
 * Approach: Postorder traversal. At each node, compute maximum gain from left and right subtrees (ignoring negative gains).
 * Update global max with (node.val + leftGain + rightGain), return (node.val + max(leftGain, rightGain)) to parent.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(H) recursion stack
 */

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    private static int maxSum;

    public static int maxPathSum(TreeNode root) {
        maxSum = Integer.MIN_VALUE;
        maxGain(root);
        return maxSum;
    }

    private static int maxGain(TreeNode node) {
        if (node == null) return 0;

        int leftGain = Math.max(maxGain(node.left), 0);
        int rightGain = Math.max(maxGain(node.right), 0);

        int currentPrice = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, currentPrice);

        return node.val + Math.max(leftGain, rightGain);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(-10);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);

        System.out.println("Maximum Path Sum: " + maxPathSum(root)); // Expected: 42 (15 + 20 + 7)
    }
}
