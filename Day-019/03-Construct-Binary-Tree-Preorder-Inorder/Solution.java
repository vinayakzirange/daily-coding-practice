/**
 * Problem: Construct Binary Tree from Preorder and Inorder Traversal
 * Topic: Binary Tree / Divide & Conquer / HashMap Indexing
 * Language: Java
 *
 * Approach:
 * Preorder root element dictates root of current subtree. Store inorder index mapping in HashMap.
 * Locate root position in inorder array to split left and right subtrees. Reconstruct recursively.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    private static int preorderIndex;
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

        int rootVal = preorder[preorderIndex++];
        TreeNode root = new TreeNode(rootVal);

        int inorderIndex = inorderIndexMap.get(rootVal);
        root.left = arrayToTree(preorder, left, inorderIndex - 1);
        root.right = arrayToTree(preorder, inorderIndex + 1, right);

        return root;
    }

    public static void main(String[] args) {
        int[] preorder = {3, 9, 20, 15, 7};
        int[] inorder = {9, 3, 15, 20, 7};
        TreeNode root = buildTree(preorder, inorder);
        System.out.println("Root val -> " + root.val); // 3
    }
}
