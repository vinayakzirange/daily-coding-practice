/*
 * Problem Name: Serialize and Deserialize Binary Tree
 * Problem Statement: Design an algorithm to serialize a binary tree into a string and deserialize that string back to a binary tree.
 * 
 * Approach: Preorder Traversal (DFS) using delimiter "," and marker "X" for null nodes.
 * 
 * Time Complexity: O(N) for both serialize and deserialize
 * Space Complexity: O(N)
 */

import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    // Encodes a tree to a single string.
    public static String serialize(TreeNode root) {
        if (root == null) return "X,";
        return root.val + "," + serialize(root.left) + serialize(root.right);
    }

    // Decodes your encoded data to tree.
    public static TreeNode deserialize(String data) {
        Queue<String> nodes = new LinkedList<>(Arrays.asList(data.split(",")));
        return buildTree(nodes);
    }

    private static TreeNode buildTree(Queue<String> nodes) {
        String val = nodes.poll();
        if (val.equals("X")) return null;

        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = buildTree(nodes);
        node.right = buildTree(nodes);
        return node;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.right.left = new TreeNode(4);
        root.right.right = new TreeNode(5);

        String serialized = serialize(root);
        System.out.println("Serialized: " + serialized); // Expected: 1,2,X,X,3,4,X,X,5,X,X,

        TreeNode deserializedRoot = deserialize(serialized);
        System.out.println("Deserialized Root Value: " + deserializedRoot.val); // Expected: 1
    }
}
