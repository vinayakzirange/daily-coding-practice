/*
 * Problem Name: Lowest Common Ancestor of a Binary Tree
 * Problem Statement: Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q.
 * 
 * Approach: Post-order recursive traversal. If a subtree returns non-null for both left and right, 
 * current node is the LCA.
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
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) return root;
        return left != null ? left : right;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        TreeNode p = new TreeNode(5);
        TreeNode q = new TreeNode(1);
        root.left = p;
        root.right = q;
        root.left.left = new TreeNode(6);
        root.left.right = new TreeNode(2);

        TreeNode lca = lowestCommonAncestor(root, p, q);
        System.out.println("LCA of 5 and 1 is: " + lca.val); // Expected: 3
    }
}
