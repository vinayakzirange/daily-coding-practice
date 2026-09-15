/**
 * Problem: Diameter of Binary Tree
 * Topic: Binary Tree / DFS Postorder
 * Language: Java
 *
 * Approach:
 * Postorder traversal calculates height of left and right subtrees.
 * At each node, path length through node is (leftHeight + rightHeight).
 * Maintain global max diameter. Return (1 + max(leftHeight, rightHeight)).
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
    private static int maxDiameter = 0;

    public static int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        getHeight(root);
        return maxDiameter;
    }

    private static int getHeight(TreeNode node) {
        if (node == null) return 0;
        int leftHeight = getHeight(node.left);
        int rightHeight = getHeight(node.right);

        maxDiameter = Math.max(maxDiameter, leftHeight + rightHeight);
        return 1 + Math.max(leftHeight, rightHeight);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);

        System.out.println("Diameter of Tree -> " + diameterOfBinaryTree(root)); // 3
    }
}
