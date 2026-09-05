/*
 * Problem Name: Lowest Common Ancestor of a Binary Search Tree
 * Problem Statement: Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.
 * 
 * Approach: Use BST properties. If both p and q are smaller than root, LCA lies in left subtree.
 * If both are greater, LCA lies in right subtree. Otherwise, root is the LCA.
 * 
 * Time Complexity: O(H) where H is height of BST (O(log N) average, O(N) worst)
 * Space Complexity: O(1) iterative approach
 */

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public class Solution {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode curr = root;
        while (curr != null) {
            if (p.val < curr.val && q.val < curr.val) {
                curr = curr.left;
            } else if (p.val > curr.val && q.val > curr.val) {
                curr = curr.right;
            } else {
                return curr;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(6);
        root.left = new TreeNode(2);
        root.right = new TreeNode(8);
        root.left.left = new TreeNode(0);
        root.left.right = new TreeNode(4);

        TreeNode p = root.left; // 2
        TreeNode q = root.left.right; // 4

        TreeNode lca = lowestCommonAncestor(root, p, q);
        System.out.println("LCA of 2 and 4 is: " + lca.val); // Expected: 2
    }
}
