// Problem: Path Sum II (LeetCode 113)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N^2) worst case copying paths
// Space Complexity: O(H)

import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

public class Solution {
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> currentPath = new ArrayList<>();
        dfs(root, targetSum, currentPath, result);
        return result;
    }

    private void dfs(TreeNode node, int sum, List<Integer> currentPath, List<List<Integer>> result) {
        if (node == null) return;

        currentPath.add(node.val);

        if (node.left == null && node.right == null && sum == node.val) {
            result.add(new ArrayList<>(currentPath));
        } else {
            dfs(node.left, sum - node.val, currentPath, result);
            dfs(node.right, sum - node.val, currentPath, result);
        }

        currentPath.remove(currentPath.size() - 1);
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        TreeNode root = new TreeNode(5,
            new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2)), null),
            new TreeNode(8, new TreeNode(13), new TreeNode(4, new TreeNode(5), new TreeNode(1)))
        );
        System.out.println("Paths matching sum 22: " + sol.pathSum(root, 22));
    }
}
