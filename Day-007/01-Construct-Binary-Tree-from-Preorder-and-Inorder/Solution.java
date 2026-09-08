/*
 * Problem Name: Construct Binary Tree from Preorder and Inorder Traversal
 * Problem Statement: Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree 
 * and inorder is the inorder traversal of the same tree, construct and return the binary tree.
 * 
 * Approach: Divide & Conquer using HashMap for fast O(1) index lookup of root in inorder array.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N) for HashMap & recursion stack
 */

import java.util.HashMap;
import java.util.Map;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    private static int preorderIndex = 0;
    private static Map<Integer, Integer> inorderIndexMap;

    public static TreeNode buildTree(int[] preorder, int[] inorder) {
        preorderIndex = 0;
        inorderIndexMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderIndexMap.put(inorder[i], i);
        }
        return arrayToTree(preorder, 0, inorder.length - 1);
    }

    private static TreeNode arrayToTree(int[] preorder, int left, int right) {
        if (left > right) return null;

        int rootValue = preorder[preorderIndex++];
        TreeNode root = new TreeNode(rootValue);

        int rootIndex = inorderIndexMap.get(rootValue);
        root.left = arrayToTree(preorder, left, rootIndex - 1);
        root.right = arrayToTree(preorder, rootIndex + 1, right);

        return root;
    }

    public static void main(String[] args) {
        int[] preorder = {3, 9, 20, 15, 7};
        int[] inorder = {9, 3, 15, 20, 7};

        TreeNode root = buildTree(preorder, inorder);
        System.out.println("Root Node: " + root.val); // Expected: 3
        System.out.println("Root Left: " + root.left.val); // Expected: 9
        System.out.println("Root Right: " + root.right.val); // Expected: 20
    }
}
