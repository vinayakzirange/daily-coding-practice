/*
 * Problem Name: Course Schedule (Graph Cycle Detection / Topological Sort)
 * Problem Statement: There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. 
 * You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b first if you want to take course a.
 * Return true if you can finish all courses. Otherwise, return false.
 * 
 * Approach: Topological Sort using BFS (Kahn's Algorithm with In-Degrees).
 * If processed count equals numCourses, no cycle exists.
 * 
 * Time Complexity: O(V + E) where V is numCourses and E is prerequisites count
 * Space Complexity: O(V + E)
 */

import java.util.*;

public class Solution {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        
        int[] inDegree = new int[numCourses];
        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.add(i);
        }

        int count = 0;
        while (!queue.isEmpty()) {
            int course = queue.poll();
            count++;
            for (int neighbor : adj.get(course)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.add(neighbor);
                }
            }
        }

        return count == numCourses;
    }

    public static void main(String[] args) {
        int[][] pre1 = {{1, 0}};
        System.out.println("Can finish 2 courses with [[1,0]]: " + canFinish(2, pre1)); // Expected: true

        int[][] pre2 = {{1, 0}, {0, 1}};
        System.out.println("Can finish 2 courses with [[1,0],[0,1]]: " + canFinish(2, pre2)); // Expected: false
    }
}
