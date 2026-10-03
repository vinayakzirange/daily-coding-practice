// Problem: Number of Provinces (LeetCode 547)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(N^2 * alpha(N))
// Space Complexity: O(N) Union-Find parent array

public class Solution {
    static class UnionFind {
        private int[] parent;
        private int[] rank;
        private int count;

        public UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            count = n;
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        public int find(int p) {
            if (p != parent[p]) {
                parent[p] = find(parent[p]); // Path compression
            }
            return parent[p];
        }

        public boolean union(int p, int q) {
            int rootP = find(p);
            int rootQ = find(q);
            if (rootP == rootQ) return false;

            // Union by rank
            if (rank[rootP] < rank[rootQ]) {
                parent[rootP] = rootQ;
            } else if (rank[rootP] > rank[rootQ]) {
                parent[rootQ] = rootP;
            } else {
                parent[rootQ] = rootP;
                rank[rootP]++;
            }
            count--;
            return true;
        }

        public int getCount() {
            return count;
        }
    }

    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        UnionFind uf = new UnionFind(n);

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    uf.union(i, j);
                }
            }
        }

        return uf.getCount();
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        int[][] grid1 = {
            {1, 1, 0},
            {1, 1, 0},
            {0, 0, 1}
        };
        System.out.println("Number of Provinces (Grid 1): " + sol.findCircleNum(grid1));
        // Expected: 2

        int[][] grid2 = {
            {1, 0, 0},
            {0, 1, 0},
            {0, 0, 1}
        };
        System.out.println("Number of Provinces (Grid 2): " + sol.findCircleNum(grid2));
        // Expected: 3
    }
}
