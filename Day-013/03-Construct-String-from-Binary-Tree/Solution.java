/**
 * Problem: Construct String from Binary Tree
 * Topic: Binary Tree / DFS Preorder
 * Language: Java
 *
 * Approach:
 * Recursively perform preorder traversal. Omit empty parenthesis pairs except when right child
 * exists and left child is null (to preserve 1-to-1 relationship).
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
    public static String tree2str(TreeNode root) {
        if (root == null) return "";
        if (root.left == null && root.right == null) return String.valueOf(root.val);
        if (root.right == null) return root.val + "(" + tree2str(root.left) + ")";
        return root.val + "(" + tree2str(root.left) + ")(" + tree2str(root.right) + ")";
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);

        System.out.println("Tree to String -> " + tree2str(root)); // 1(2(4))(3)
    }
}
