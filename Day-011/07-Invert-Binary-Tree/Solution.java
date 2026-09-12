/*
 * Problem Name: Invert Binary Tree
 * Problem Statement: Given the root of a binary tree, invert the tree (mirror left and right subtrees), and return its root.
 * 
 * Approach: Recursive DFS. Swap left and right children of current node, then recurse.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(H) recursion stack height
 */

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static TreeNode invertTree(TreeNode root) {
        if (root == null) return null;

        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);

        return root;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.right = new TreeNode(7);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(3);

        TreeNode inverted = invertTree(root);
        System.out.println("Inverted Root Left: " + inverted.left.val); // Expected: 7
        System.out.println("Inverted Root Right: " + inverted.right.val); // Expected: 2
    }
}
