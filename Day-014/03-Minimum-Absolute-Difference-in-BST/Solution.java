/**
 * Problem: Minimum Absolute Difference in BST
 * Topic: Binary Search Tree / Inorder Traversal
 * Language: Java
 *
 * Approach:
 * Inorder traversal of a BST yields values in sorted order.
 * Maintain a 'prev' pointer to track previous node value and calculate min difference.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(H) recursion stack
 */

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    private static int minDiff = Integer.MAX_VALUE;
    private static Integer prev = null;

    public static int getMinimumDifference(TreeNode root) {
        minDiff = Integer.MAX_VALUE;
        prev = null;
        inorder(root);
        return minDiff;
    }

    private static void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        if (prev != null) {
            minDiff = Math.min(minDiff, node.val - prev);
        }
        prev = node.val;
        inorder(node.right);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.right = new TreeNode(6);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(3);

        System.out.println("Min Difference in BST -> " + getMinimumDifference(root)); // 1
    }
}
