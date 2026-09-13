/**
 * Problem: Path Sum
 * Topic: Binary Tree / DFS
 * Language: Java
 *
 * Approach:
 * Recursively subtract current node value from targetSum. Return true if a leaf node
 * is reached and remaining targetSum equals leaf value.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(H) where H is tree height
 */

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) {
            return targetSum == root.val;
        }
        return hasPathSum(root.left, targetSum - root.val) ||
               hasPathSum(root.right, targetSum - root.val);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(5);
        root.left = new TreeNode(4);
        root.right = new TreeNode(8);
        root.left.left = new TreeNode(11);
        root.left.left.left = new TreeNode(7);
        root.left.left.right = new TreeNode(2);

        System.out.println("Has Path Sum 22 -> " + hasPathSum(root, 22)); // true
    }
}
