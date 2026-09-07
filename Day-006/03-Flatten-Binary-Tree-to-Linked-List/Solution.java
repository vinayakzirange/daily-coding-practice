/*
 * Problem Name: Flatten Binary Tree to Linked List
 * Problem Statement: Given the root of a binary tree, flatten the tree into a "linked list" in-place using right pointers.
 * The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and left pointer is always null.
 * 
 * Approach: Reverse Preorder Traversal (Right -> Left -> Root). Keep track of prev node.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(H) recursion stack
 */

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    private static TreeNode prev = null;

    public static void flatten(TreeNode root) {
        if (root == null) return;

        flatten(root.right);
        flatten(root.left);

        root.right = prev;
        root.left = null;
        prev = root;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(5);
        root.left.left = new TreeNode(3);
        root.left.right = new TreeNode(4);
        root.right.right = new TreeNode(6);

        prev = null;
        flatten(root);

        TreeNode curr = root;
        System.out.print("Flattened List: ");
        while (curr != null) {
            System.out.print(curr.val + " -> ");
            curr = curr.right;
        }
        System.out.println("null"); // Expected: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
    }
}
