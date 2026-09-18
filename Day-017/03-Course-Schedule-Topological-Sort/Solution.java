/**
 * Problem: Course Schedule
 * Topic: Graph / Topological Sort / BFS (Kahn's Algorithm)
 * Language: Java
 *
 * Approach:
 * Build adjacency list and compute indegrees of all nodes. Enqueue nodes with indegree 0.
 * Perform BFS, decrementing indegrees of neighbors. If processed nodes count == numCourses,
 * return true (no cycle exists).
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 */

import java.util.*;

public class Solution {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] indegree = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());

        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            indegree[pre[0]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) queue.offer(i);
        }

        int count = 0;
        while (!queue.isEmpty()) {
            int course = queue.poll();
            count++;
            for (int neighbor : adj.get(course)) {
                if (--indegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        return count == numCourses;
    }

    public static void main(String[] args) {
        int[][] pre1 = {{1, 0}};
        System.out.println("2 courses, [[1,0]] -> " + canFinish(2, pre1)); // true

        int[][] pre2 = {{1, 0}, {0, 1}};
        System.out.println("2 courses, [[1,0],[0,1]] -> " + canFinish(2, pre2)); // false
    }
}
