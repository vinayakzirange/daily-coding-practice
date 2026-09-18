/**
 * Problem: Kth Smallest Element in a BST
 * Topic: Binary Search Tree / Inorder Traversal
 * Language: Java
 *
 * Approach:
 * Perform in-order traversal (which visits BST nodes in sorted order). Maintain a count and
 * stop traversal once the k-th node is visited.
 *
 * Time Complexity: O(H + k)
 * Space Complexity: O(H) recursion stack
 */

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    private static int count = 0;
    private static int result = 0;

    public static int kthSmallest(TreeNode root, int k) {
        count = 0;
        result = 0;
        inorder(root, k);
        return result;
    }

    private static void inorder(TreeNode node, int k) {
        if (node == null) return;
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

        System.out.println("1st Smallest -> " + kthSmallest(root, 1)); // 1
    }
}
