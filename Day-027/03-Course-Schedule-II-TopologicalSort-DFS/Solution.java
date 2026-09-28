// Problem: Course Schedule II (LeetCode 210)
// Language: Java
// Difficulty: Medium
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)

import java.util.*;

public class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                queue.add(i);
            }
        }

        int[] result = new int[numCourses];
        int index = 0;

        while (!queue.isEmpty()) {
            int curr = queue.poll();
            result[index++] = curr;

            for (int neighbor : adj.get(curr)) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0) {
                    queue.add(neighbor);
                }
            }
        }

        return index == numCourses ? result : new int[0];
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int[][] pre = {{1, 0}, {2, 0}, {3, 1}, {3, 2}};
        System.out.println("Course Order: " + Arrays.toString(sol.findOrder(4, pre)));
    }
}
