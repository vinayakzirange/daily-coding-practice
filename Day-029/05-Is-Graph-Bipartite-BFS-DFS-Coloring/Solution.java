// Problem: Is Graph Bipartite? (LeetCode 785)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(V + E)
// Space Complexity: O(V)

import java.util.LinkedList;
import java.util.Queue;

public class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] colors = new int[n]; // 0: uncolored, 1: blue, -1: red

        for (int i = 0; i < n; i++) {
            if (colors[i] != 0) continue;

            Queue<Integer> queue = new LinkedList<>();
            queue.add(i);
            colors[i] = 1;

            while (!queue.isEmpty()) {
                int curr = queue.poll();
                for (int neighbor : graph[curr]) {
                    if (colors[neighbor] == 0) {
                        colors[neighbor] = -colors[curr];
                        queue.add(neighbor);
                    } else if (colors[neighbor] == colors[curr]) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] g1 = {{1,2,3},{0,2},{0,1,3},{0,2}};
        System.out.println("Is Bipartite: " + sol.isBipartite(g1)); // false

        int[][] g2 = {{1,3},{0,2},{1,3},{0,2}};
        System.out.println("Is Bipartite: " + sol.isBipartite(g2)); // true
    }
}
