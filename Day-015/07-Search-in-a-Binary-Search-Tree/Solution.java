/**
 * Problem: Search in a Binary Search Tree
 * Topic: Binary Search Tree / Search recursion
 * Language: Java
 *
 * Approach:
 * If node is null or node.val == val, return node.
 * If val < node.val, search left subtree; otherwise search right subtree.
 *
 * Time Complexity: O(H) where H is tree height
 * Space Complexity: O(H) recursion stack
 */

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static TreeNode searchBST(TreeNode root, int val) {
        if (root == null || root.val == val) return root;
        return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.right = new TreeNode(7);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(3);

        TreeNode res = searchBST(root, 2);
        System.out.println("Search BST for 2 -> " + (res != null ? res.val : "null")); // 2
    }
}
