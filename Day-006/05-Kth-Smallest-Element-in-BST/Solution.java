/*
 * Problem Name: Kth Smallest Element in a BST
 * Problem Statement: Given the root of a binary search tree, and an integer k, 
 * return the kth smallest value (1-indexed) of all the values of the nodes in the tree.
 * 
 * Approach: Inorder Traversal (Left -> Root -> Right) visits nodes in strictly sorted order. 
 * Stop when count reaches k.
 * 
 * Time Complexity: O(H + K)
 * Space Complexity: O(H) recursion stack
 */

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    private static int count = 0;
    private static int result = -1;

    public static int kthSmallest(TreeNode root, int k) {
        count = 0;
        result = -1;
        inorder(root, k);
        return result;
    }

    private static void inorder(TreeNode node, int k) {
        if (node == null || count >= k) return;

        inorder(node.left, k);
        
        count++;
        if (count == k) {
            result = node.val;
            return;
        }

        inorder(node.right, k);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(1);
        root.right = new TreeNode(4);
        root.left.right = new TreeNode(2);

        System.out.println("1st Smallest: " + kthSmallest(root, 1)); // Expected: 1
        System.out.println("3rd Smallest: " + kthSmallest(root, 3)); // Expected: 3
    }
}
