/*
 * Problem Name: Validate Binary Search Tree
 * Problem Statement: Given the root of a binary tree, determine if it is a valid binary search tree (BST).
 * 
 * Approach: Recursively validate using minimum and maximum allowable bounds (min < val < max).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(H) where H is tree height
 */

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }

    private static boolean validate(TreeNode node, Integer min, Integer max) {
        if (node == null) return true;
        if ((min != null && node.val <= min) || (max != null && node.val >= max)) {
            return false;
        }
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(2);
        root.left = new TreeNode(1);
        root.right = new TreeNode(3);

        System.out.println("Is Valid BST: " + isValidBST(root)); // Expected: true
    }
}
