// Problem: Network Delay Time (LeetCode 743)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(E log V)
// Space Complexity: O(V + E)

import java.util.*;

public class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> graph = new HashMap<>();
        for (int[] time : times) {
            graph.computeIfAbsent(time[0], x -> new ArrayList<>()).add(new int[]{time[1], time[2]});
        }

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.add(new int[]{k, 0});

        Map<Integer, Integer> dist = new HashMap<>();

        while (!pq.isEmpty()) {
            int[] info = pq.poll();
            int node = info[0], d = info[1];

            if (dist.containsKey(node)) continue;
            dist.put(node, d);

            if (graph.containsKey(node)) {
                for (int[] edge : graph.get(node)) {
                    int nextNode = edge[0], weight = edge[1];
                    if (!dist.containsKey(nextNode)) {
                        pq.add(new int[]{nextNode, d + weight});
                    }
                }
            }
        }

        if (dist.size() != n) return -1;

        int maxDist = 0;
        for (int d : dist.values()) {
            maxDist = Math.max(maxDist, d);
        }

        return maxDist;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] times = {{2,1,1},{2,3,1},{3,4,1}};
        System.out.println("Output (n=4, k=2): " + sol.networkDelayTime(times, 4, 2)); // 2
    }
}
