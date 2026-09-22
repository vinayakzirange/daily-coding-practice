/**
 * Problem: Course Schedule II
 * Topic: Graph / Topological Sort / BFS Kahn's Algorithm Order
 * Language: Java
 *
 * Approach:
 * Perform Topological Sort using Kahn's BFS algorithm while appending course IDs to an output array.
 * If output array size equals numCourses, return the valid order; else return empty array (cycle detected).
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 */

import java.util.*;

public class Solution {
    public static int[] findOrder(int numCourses, int[][] prerequisites) {
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

        int[] result = new int[numCourses];
        int index = 0;

        while (!queue.isEmpty()) {
            int course = queue.poll();
            result[index++] = course;
            for (int neighbor : adj.get(course)) {
                if (--indegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        return index == numCourses ? result : new int[0];
    }

    public static void main(String[] args) {
        int[][] pre = {{1, 0}, {2, 0}, {3, 1}, {3, 2}};
        System.out.println("Course Order -> " + Arrays.toString(findOrder(4, pre))); // [0, 1, 2, 3]
    }
}
