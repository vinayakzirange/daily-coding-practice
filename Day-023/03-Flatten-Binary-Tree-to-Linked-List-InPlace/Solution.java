/**
 * Problem: Flatten Binary Tree to Linked List
 * Topic: Binary Tree / In-Place Morris Traversal
 * Language: Java
 *
 * Approach:
 * At each node, if left child exists, find the rightmost node of left subtree.
 * Connect rightmost node's right to current node's right. Move current node's left
 * to its right, and set left to null.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static void flatten(TreeNode root) {
        TreeNode curr = root;
        while (curr != null) {
            if (curr.left != null) {
                TreeNode rightmost = curr.left;
                while (rightmost.right != null) {
                    rightmost = rightmost.right;
                }
                rightmost.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(5);
        root.left.left = new TreeNode(3);
        root.left.right = new TreeNode(4);
        root.right.right = new TreeNode(6);

        flatten(root);
        System.out.print("Flattened Tree -> ");
        TreeNode curr = root;
        while (curr != null) {
            System.out.print(curr.val + " ");
            curr = curr.right;
        }
        System.out.println(); // 1 2 3 4 5 6
    }
}
