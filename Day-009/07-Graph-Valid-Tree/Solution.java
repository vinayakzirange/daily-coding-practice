/*
 * Problem Name: Graph Valid Tree
 * Problem Statement: Given n nodes labeled from 0 to n - 1 and a list of undirected edges, write a function to check 
 * whether these edges make up a valid tree.
 * 
 * Approach: Disjoint Set Union (Union-Find).
 * A graph of n nodes is a valid tree if and only if it has exactly n - 1 edges and contains no cycles.
 * 
 * Time Complexity: O(N * alpha(N)) ~ O(N)
 * Space Complexity: O(N) for parent array
 */

public class Solution {
    public static boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false;

        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        for (int[] edge : edges) {
            int root1 = find(parent, edge[0]);
            int root2 = find(parent, edge[1]);

            if (root1 == root2) return false; // Cycle detected
            parent[root1] = root2;
        }

        return true;
    }

    private static int find(int[] parent, int node) {
        if (parent[node] == node) return node;
        return parent[node] = find(parent, parent[node]); // Path compression
    }

    public static void main(String[] args) {
        int[][] edges1 = {{0, 1}, {0, 2}, {0, 3}, {1, 4}};
        System.out.println("Is Valid Tree (5 nodes, 4 edges): " + validTree(5, edges1)); // Expected: true

        int[][] edges2 = {{0, 1}, {1, 2}, {2, 3}, {1, 3}, {1, 4}};
        System.out.println("Is Valid Tree (5 nodes with cycle): " + validTree(5, edges2)); // Expected: false
    }
}
