/**
 * Problem: Validate Binary Search Tree
 * Topic: Binary Search Tree / Tree Recursion with Bounds
 * Language: Java
 *
 * Approach:
 * Recursively validate BST properties by passing strict valid ranges [min, max] for each node.
 * Left child must strictly be inside [min, val-1], right child inside [val+1, max].
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

        System.out.println("Valid BST -> " + isValidBST(root)); // true
    }
}
