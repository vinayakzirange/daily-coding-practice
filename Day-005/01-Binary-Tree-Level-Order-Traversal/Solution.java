/*
 * Problem Name: Binary Tree Level Order Traversal
 * Problem Statement: Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).
 * 
 * Approach: Breadth-First Search (BFS) using a Queue. Process level by level using queue size.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(W) where W is max width of the tree
 */

import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);

                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }

            result.add(currentLevel);
        }

        return result;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);

        System.out.println("Level Order Traversal: " + levelOrder(root)); // Expected: [[3], [9, 20], [15, 7]]
    }
}
