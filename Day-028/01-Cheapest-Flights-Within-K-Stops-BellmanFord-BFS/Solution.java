// Problem: Cheapest Flights Within K Stops (LeetCode 787)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(K * E)
// Space Complexity: O(V)

import java.util.Arrays;

public class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        for (int i = 0; i <= k; i++) {
            int[] temp = Arrays.copyOf(dist, n);
            for (int[] flight : flights) {
                int u = flight[0], v = flight[1], w = flight[2];
                if (dist[u] != Integer.MAX_VALUE) {
                    if (dist[u] + w < temp[v]) {
                        temp[v] = dist[u] + w;
                    }
                }
            }
            dist = temp;
        }

        return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] flights = {{0,1,100},{1,2,100},{0,2,500}};
        System.out.println("Cheapest Price (k=1): " + sol.findCheapestPrice(3, flights, 0, 2, 1)); // 200
        System.out.println("Cheapest Price (k=0): " + sol.findCheapestPrice(3, flights, 0, 2, 0)); // 500
    }
}
