/**
 * Problem: Leaf-Similar Trees
 * Topic: Binary Tree / DFS Leaf Sequence
 * Language: Java
 *
 * Approach:
 * Collect leaf node values of root1 and root2 into two separate lists using DFS.
 * Compare the leaf lists for equality using list.equals().
 *
 * Time Complexity: O(N1 + N2)
 * Space Complexity: O(H1 + H2)
 */

import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public static boolean leafSimilar(TreeNode root1, TreeNode root2) {
        List<Integer> leaves1 = new ArrayList<>();
        List<Integer> leaves2 = new ArrayList<>();
        getLeaves(root1, leaves1);
        getLeaves(root2, leaves2);
        return leaves1.equals(leaves2);
    }

    private static void getLeaves(TreeNode node, List<Integer> leaves) {
        if (node == null) return;
        if (node.left == null && node.right == null) {
            leaves.add(node.val);
            return;
        }
        getLeaves(node.left, leaves);
        getLeaves(node.right, leaves);
    }

    public static void main(String[] args) {
        TreeNode root1 = new TreeNode(3);
        root1.left = new TreeNode(5);
        root1.right = new TreeNode(1);

        TreeNode root2 = new TreeNode(3);
        root2.left = new TreeNode(5);
        root2.right = new TreeNode(1);

        System.out.println("Leaf Similar -> " + leafSimilar(root1, root2)); // true
    }
}
