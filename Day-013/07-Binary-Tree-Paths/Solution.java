/**
 * Problem: Binary Tree Paths
 * Topic: Binary Tree / Backtracking / DFS
 * Language: Java
 *
 * Approach:
 * DFS traversal accumulating path string. When reaching leaf node (no left/right child),
 * add complete path string to result list.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(H) recursion stack
 */

import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static List<String> binaryTreePaths(TreeNode root) {
        List<String> paths = new ArrayList<>();
        if (root != null) dfs(root, "", paths);
        return paths;
    }

    private static void dfs(TreeNode node, String path, List<String> paths) {
        if (node.left == null && node.right == null) {
            paths.add(path + node.val);
            return;
        }
        if (node.left != null) dfs(node.left, path + node.val + "->", paths);
        if (node.right != null) dfs(node.right, path + node.val + "->", paths);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.right = new TreeNode(5);

        System.out.println("Tree Paths -> " + binaryTreePaths(root)); // ["1->2->5", "1->3"]
    }
}
