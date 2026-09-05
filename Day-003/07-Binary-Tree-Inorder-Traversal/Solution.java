/*
 * Problem Name: Binary Tree Inorder Traversal
 * Problem Statement: Given the root of a binary tree, return the inorder traversal of its nodes' values.
 * 
 * Approach: Recursive Traversal (Left -> Root -> Right).
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(H) where H is tree height (stack space)
 */

import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        helper(root, result);
        return result;
    }

    private static void helper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        helper(node.left, result);
        result.add(node.val);
        helper(node.right, result);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.right = new TreeNode(2);
        root.right.left = new TreeNode(3);

        System.out.println("Inorder Traversal: " + inorderTraversal(root)); // Expected: [1, 3, 2]
    }
}
